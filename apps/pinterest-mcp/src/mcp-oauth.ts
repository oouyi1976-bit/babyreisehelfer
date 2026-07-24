import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { nowIso, randomId } from './config.js';
import { exchangePinterestAuthorizationCode } from './pinterest.js';
import { AppError, type Env } from './types.js';

const APP_SCOPES = ['pinterest.read', 'pinterest.write'];

function randomToken() {
  return crypto.getRandomValues(new Uint8Array(32)).reduce((result, value) => result + value.toString(16).padStart(2, '0'), '');
}

async function sha256(value: string) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  return Array.from(digest, (item) => item.toString(16).padStart(2, '0')).join('');
}

async function pkceChallenge(verifier: string) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  let binary = '';
  for (const item of digest) binary += String.fromCharCode(item);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function appResource(origin: string) {
  return `${origin}/mcp`;
}

function parseScope(value: string | null) {
  const scopes = (value || 'pinterest.read pinterest.write').split(/\s+/).filter(Boolean);
  if (!scopes.length || scopes.some((scope) => !APP_SCOPES.includes(scope))) {
    throw new AppError('Unbekannter MCP-Berechtigungsumfang angefordert.', 'mcp_scope_invalid', 400);
  }
  return [...new Set(scopes)];
}

function callbackUrlAllowed(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['chatgpt.com', 'chat.openai.com'].includes(url.hostname) && url.pathname.startsWith('/connector/oauth/');
  } catch {
    return false;
  }
}

function addParams(url: string, values: Record<string, string>) {
  const target = new URL(url);
  for (const [key, value] of Object.entries(values)) target.searchParams.set(key, value);
  return target.toString();
}

export function protectedResourceMetadata(origin: string) {
  return {
    resource: appResource(origin),
    authorization_servers: [origin],
    scopes_supported: APP_SCOPES,
    resource_documentation: `${origin}/health`
  };
}

export function authorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/mcp/oauth/authorize`,
    token_endpoint: `${origin}/mcp/oauth/token`,
    registration_endpoint: `${origin}/mcp/oauth/register`,
    grant_types_supported: ['authorization_code'],
    response_types_supported: ['code'],
    token_endpoint_auth_methods_supported: ['none'],
    code_challenge_methods_supported: ['S256'],
    scopes_supported: APP_SCOPES
  };
}

export function authorizationChallenge(origin: string) {
  return `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource", scope="pinterest.read pinterest.write"`;
}

export async function registerMcpClient(request: Request, env: Env) {
  const input = await request.json<{ redirect_uris?: unknown }>();
  const redirectUris = Array.isArray(input.redirect_uris) ? input.redirect_uris.filter((value): value is string => typeof value === 'string') : [];
  if (!redirectUris.length || redirectUris.some((url) => !callbackUrlAllowed(url))) {
    throw new AppError('MCP-Clients duerfen nur die offizielle ChatGPT-Connector-Callback-URL registrieren.', 'mcp_redirect_uri_invalid', 400);
  }
  const clientId = randomId();
  await env.PINTEREST_DB.prepare(
    'INSERT INTO mcp_oauth_clients (client_id, redirect_uris_json, created_at) VALUES (?, ?, ?)'
  )
    .bind(clientId, JSON.stringify(redirectUris), nowIso())
    .run();
  return { client_id: clientId, redirect_uris: redirectUris, token_endpoint_auth_method: 'none' };
}

export async function startMcpAuthorization(request: Request, env: Env, origin: string) {
  if (!env.PINTEREST_APP_ID || !env.PINTEREST_REDIRECT_URI) {
    throw new AppError('Pinterest OAuth ist noch nicht als Worker-Secret konfiguriert.', 'pinterest_oauth_not_configured', 503);
  }
  const url = new URL(request.url);
  const clientId = url.searchParams.get('client_id');
  const redirectUri = url.searchParams.get('redirect_uri');
  const codeChallenge = url.searchParams.get('code_challenge');
  const codeChallengeMethod = url.searchParams.get('code_challenge_method');
  const resource = url.searchParams.get('resource');
  if (!clientId || !redirectUri || !codeChallenge || codeChallengeMethod !== 'S256' || resource !== appResource(origin)) {
    throw new AppError('Die MCP-OAuth-Anfrage ist unvollstaendig oder nutzt kein S256-PKCE.', 'mcp_authorization_invalid', 400);
  }

  const client = await env.PINTEREST_DB.prepare('SELECT redirect_uris_json FROM mcp_oauth_clients WHERE client_id = ?').bind(clientId).first<{ redirect_uris_json: string }>();
  const allowed = client ? (JSON.parse(client.redirect_uris_json) as string[]) : [];
  if (!allowed.includes(redirectUri)) {
    throw new AppError('Die MCP-Redirect-URL ist nicht fuer diesen Client registriert.', 'mcp_redirect_uri_invalid', 400);
  }

  const scopes = parseScope(url.searchParams.get('scope'));
  const pinterestState = randomId();
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
  await env.PINTEREST_DB.prepare(
    `INSERT INTO mcp_oauth_authorization_requests
     (pinterest_state, client_id, redirect_uri, client_state, code_challenge, resource, scope, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(pinterestState, clientId, redirectUri, url.searchParams.get('state'), codeChallenge, resource, scopes.join(' '), createdAt, expiresAt)
    .run();

  const pinterest = new URL('https://www.pinterest.com/oauth/');
  pinterest.searchParams.set('client_id', env.PINTEREST_APP_ID);
  pinterest.searchParams.set('redirect_uri', env.PINTEREST_REDIRECT_URI);
  pinterest.searchParams.set('response_type', 'code');
  pinterest.searchParams.set('scope', env.PINTEREST_GRANTED_SCOPES.split(/[\s,]+/).filter(Boolean).join(','));
  pinterest.searchParams.set('state', pinterestState);
  pinterest.searchParams.set('continuous_refresh', 'true');
  return Response.redirect(pinterest.toString(), 302);
}

export async function finishMcpAuthorization(request: Request, env: Env) {
  const url = new URL(request.url);
  const pinterestState = url.searchParams.get('state');
  if (!pinterestState) return null;
  const authRequest = await env.PINTEREST_DB.prepare(
    'SELECT * FROM mcp_oauth_authorization_requests WHERE pinterest_state = ?'
  ).bind(pinterestState).first<{
    pinterest_state: string; client_id: string; redirect_uri: string; client_state: string | null; code_challenge: string; resource: string; scope: string; expires_at: string;
  }>();
  if (!authRequest) return null;
  await env.PINTEREST_DB.prepare('DELETE FROM mcp_oauth_authorization_requests WHERE pinterest_state = ?').bind(pinterestState).run();

  const error = url.searchParams.get('error');
  if (error || Date.parse(authRequest.expires_at) < Date.now()) {
    const destination = addParams(authRequest.redirect_uri, { error: error || 'access_denied', state: authRequest.client_state || '' });
    return Response.redirect(destination, 302);
  }
  const code = url.searchParams.get('code');
  if (!code) return Response.redirect(addParams(authRequest.redirect_uri, { error: 'invalid_request', state: authRequest.client_state || '' }), 302);

  await exchangePinterestAuthorizationCode(env, code);
  const mcpCode = randomToken();
  await env.PINTEREST_DB.prepare(
    `INSERT INTO mcp_oauth_codes
     (code_hash, client_id, redirect_uri, code_challenge, resource, scope, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(await sha256(mcpCode), authRequest.client_id, authRequest.redirect_uri, authRequest.code_challenge, authRequest.resource, authRequest.scope, nowIso(), new Date(Date.now() + 5 * 60_000).toISOString())
    .run();
  return Response.redirect(addParams(authRequest.redirect_uri, { code: mcpCode, state: authRequest.client_state || '' }), 302);
}

export async function exchangeMcpAuthorizationCode(request: Request, env: Env, origin: string) {
  const form = await request.formData();
  const grantType = form.get('grant_type');
  const code = form.get('code');
  const clientId = form.get('client_id');
  const redirectUri = form.get('redirect_uri');
  const codeVerifier = form.get('code_verifier');
  const resource = form.get('resource');
  if (grantType !== 'authorization_code' || typeof code !== 'string' || typeof clientId !== 'string' || typeof redirectUri !== 'string' || typeof codeVerifier !== 'string' || resource !== appResource(origin)) {
    throw new AppError('Der MCP-Token-Austausch ist unvollstaendig.', 'mcp_token_invalid', 400);
  }
  const row = await env.PINTEREST_DB.prepare('SELECT * FROM mcp_oauth_codes WHERE code_hash = ?').bind(await sha256(code)).first<{
    client_id: string; redirect_uri: string; code_challenge: string; resource: string; scope: string; expires_at: string; consumed_at: string | null;
  }>();
  if (!row || row.consumed_at || Date.parse(row.expires_at) < Date.now() || row.client_id !== clientId || row.redirect_uri !== redirectUri || row.resource !== resource || await pkceChallenge(codeVerifier) !== row.code_challenge) {
    throw new AppError('Der MCP-Autorisierungscode ist ungueltig oder abgelaufen.', 'mcp_code_invalid', 400);
  }
  await env.PINTEREST_DB.prepare('UPDATE mcp_oauth_codes SET consumed_at = ? WHERE code_hash = ? AND consumed_at IS NULL').bind(nowIso(), await sha256(code)).run();
  const accessToken = randomToken();
  const expiresAt = new Date(Date.now() + 60 * 60_000).toISOString();
  await env.PINTEREST_DB.prepare(
    `INSERT INTO mcp_oauth_access_tokens (token_hash, client_id, resource, scope, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(await sha256(accessToken), clientId, resource, row.scope, nowIso(), expiresAt).run();
  return { access_token: accessToken, token_type: 'Bearer', expires_in: 3600, scope: row.scope };
}

export async function verifyMcpAccessToken(request: Request, env: Env, origin: string): Promise<AuthInfo | null> {
  const header = request.headers.get('authorization') || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return null;
  const row = await env.PINTEREST_DB.prepare('SELECT * FROM mcp_oauth_access_tokens WHERE token_hash = ?').bind(await sha256(match[1])).first<{
    client_id: string; resource: string; scope: string; expires_at: string; revoked_at: string | null;
  }>();
  if (!row || row.revoked_at || Date.parse(row.expires_at) < Date.now() || row.resource !== appResource(origin)) return null;
  return {
    token: match[1],
    clientId: row.client_id,
    scopes: row.scope.split(/\s+/).filter(Boolean),
    expiresAt: Math.floor(Date.parse(row.expires_at) / 1000),
    resource: new URL(row.resource)
  };
}
