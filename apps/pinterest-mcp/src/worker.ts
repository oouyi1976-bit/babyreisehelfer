import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createPinterestMcpServer } from './mcp.js';
import { hasScope, randomId, safeErrorMessage } from './config.js';
import {
  authorizationChallenge,
  authorizationServerMetadata,
  exchangeMcpAuthorizationCode,
  finishMcpAuthorization,
  protectedResourceMetadata,
  registerMcpClient,
  startMcpAuthorization,
  verifyMcpAccessToken
} from './mcp-oauth.js';
import { exchangePinterestAuthorizationCode } from './pinterest.js';
import { publishDuePins } from './scheduler.js';
import type { Env } from './types.js';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };
const HTML_HEADERS = {
  'content-type': 'text/html; charset=utf-8',
  'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function html(title: string, message: string, status = 200) {
  const escapedTitle = title.replace(/[<>&"]/g, '');
  const escapedMessage = message.replace(/[<>&"]/g, '');
  return new Response(
    `<!doctype html><html lang="de"><meta charset="utf-8"><title>${escapedTitle}</title><body><main><h1>${escapedTitle}</h1><p>${escapedMessage}</p><p>Du kannst dieses Fenster jetzt schließen.</p></main></body></html>`,
    { status, headers: HTML_HEADERS }
  );
}

function workerOrigin(request: Request) {
  return new URL(request.url).origin;
}

function oauthScopes(env: Env) {
  const requested = ['boards:read', 'pins:read', 'pins:write', 'user_accounts:read'];
  const configured = env.PINTEREST_GRANTED_SCOPES.split(/[\s,]+/).filter(Boolean);
  return requested.filter((scope) => configured.includes(scope)).join(',');
}

async function startPinterestOAuth(request: Request, env: Env) {
  if (!env.PINTEREST_APP_ID || !env.PINTEREST_REDIRECT_URI) {
    return html('Pinterest OAuth nicht konfiguriert', 'Bitte PINTEREST_APP_ID und PINTEREST_REDIRECT_URI als Worker-Secrets setzen.', 503);
  }

  const state = randomId();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
  await env.PINTEREST_DB.prepare(
    `INSERT INTO pinterest_oauth_states (state, code_verifier, created_at, expires_at)
     VALUES (?, ?, ?, ?)`
  )
    .bind(state, '', createdAt, expiresAt)
    .run();

  const authorizeUrl = new URL('https://www.pinterest.com/oauth/');
  authorizeUrl.searchParams.set('client_id', env.PINTEREST_APP_ID);
  authorizeUrl.searchParams.set('redirect_uri', env.PINTEREST_REDIRECT_URI);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('scope', oauthScopes(env));
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('continuous_refresh', 'true');
  return Response.redirect(authorizeUrl.toString(), 302);
}

async function finishPinterestOAuth(request: Request, env: Env) {
  const url = new URL(request.url);
  const mcpAuthorizationResponse = await finishMcpAuthorization(request, env);
  if (mcpAuthorizationResponse) return mcpAuthorizationResponse;
  const pinterestError = url.searchParams.get('error');
  if (pinterestError) {
    return html('Pinterest-Verbindung abgebrochen', 'Pinterest hat die Autorisierung nicht abgeschlossen. Es wurden keine Tokens gespeichert.', 400);
  }

  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!state || !code) return html('Pinterest-Verbindung fehlgeschlagen', 'Der OAuth-Rückruf enthält keinen gültigen Code oder State.', 400);

  const stateRow = await env.PINTEREST_DB.prepare(
    'SELECT state, expires_at FROM pinterest_oauth_states WHERE state = ?'
  )
    .bind(state)
    .first<{ state: string; expires_at: string }>();
  await env.PINTEREST_DB.prepare('DELETE FROM pinterest_oauth_states WHERE state = ?').bind(state).run();

  if (!stateRow || Date.parse(stateRow.expires_at) < Date.now()) {
    return html('Pinterest-Verbindung fehlgeschlagen', 'Der OAuth-State ist ungültig oder abgelaufen. Bitte starte die Verbindung erneut.', 400);
  }

  try {
    const connection = await exchangePinterestAuthorizationCode(env, code);
    return html(
      'Pinterest erfolgreich verbunden',
      `Die serverseitige Verbindung wurde gespeichert. Freigegebene Berechtigungen: ${connection.scopes.join(', ') || 'keine zurückgemeldet'}.`
    );
  } catch (error) {
    return html('Pinterest-Verbindung fehlgeschlagen', safeErrorMessage(error), 502);
  }
}

async function handleMcp(request: Request, env: Env) {
  const origin = workerOrigin(request);
  const authInfo = await verifyMcpAccessToken(request, env, origin);
  if (!authInfo) {
    return new Response(JSON.stringify({ error: 'OAuth authentication required' }), {
      status: 401,
      headers: {
        ...JSON_HEADERS,
        'www-authenticate': authorizationChallenge(origin)
      }
    });
  }
  const server = createPinterestMcpServer(env);
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });
  await server.connect(transport);
  try {
    return await transport.handleRequest(request, { authInfo });
  } catch (error) {
    return json({ error: 'MCP request failed', detail: safeErrorMessage(error) }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
    }

    if (url.pathname === '/health' && request.method === 'GET') {
      return json({
        status: 'ok',
        service: 'babyreisehelfer-pinterest-mcp',
        origin: workerOrigin(request),
        posting_enabled: env.ENABLE_PINTEREST_POSTING === 'true',
        pins_write_granted: hasScope(env, 'pins:write'),
        pinterest_oauth_configured: Boolean(env.PINTEREST_APP_ID && env.PINTEREST_APP_SECRET && env.PINTEREST_REDIRECT_URI),
        note: 'No Pinterest token or secret is exposed by this endpoint.'
      });
    }

    if (url.pathname === '/.well-known/oauth-protected-resource' && request.method === 'GET') {
      return json(protectedResourceMetadata(workerOrigin(request)));
    }

    if (url.pathname === '/.well-known/oauth-authorization-server' && request.method === 'GET') {
      return json(authorizationServerMetadata(workerOrigin(request)));
    }

    if (url.pathname === '/mcp/oauth/register' && request.method === 'POST') {
      try {
        return json(await registerMcpClient(request, env), 201);
      } catch (error) {
        return json({ error: safeErrorMessage(error) }, 400);
      }
    }

    if (url.pathname === '/mcp/oauth/authorize' && request.method === 'GET') {
      try {
        return await startMcpAuthorization(request, env, workerOrigin(request));
      } catch (error) {
        return html('ChatGPT-Verbindung fehlgeschlagen', safeErrorMessage(error), 400);
      }
    }

    if (url.pathname === '/mcp/oauth/token' && request.method === 'POST') {
      try {
        return json(await exchangeMcpAuthorizationCode(request, env, workerOrigin(request)));
      } catch (error) {
        return json({ error: 'invalid_grant', error_description: safeErrorMessage(error) }, 400);
      }
    }

    if (url.pathname === '/oauth/pinterest/start' && request.method === 'GET') {
      return startPinterestOAuth(request, env);
    }

    if (url.pathname === '/oauth/pinterest/callback' && request.method === 'GET') {
      try {
        return await finishPinterestOAuth(request, env);
      } catch (error) {
        return html('Pinterest-Verbindung fehlgeschlagen', safeErrorMessage(error), 502);
      }
    }

    if (url.pathname === '/mcp') {
      return handleMcp(request, env);
    }

    return json({ error: 'Not found' }, 404);
  },

  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(
      publishDuePins(env).catch((error) => {
        console.error(`Pinterest Cron failed: ${safeErrorMessage(error)}`);
      })
    );
  }
} satisfies ExportedHandler<Env>;
