import { describe, expect, it } from 'vitest';
import { authorizationChallenge, authorizationServerMetadata, protectedResourceMetadata } from './mcp-oauth.js';

describe('MCP OAuth discovery', () => {
  const origin = 'https://babyreisehelfer-pinterest.example.workers.dev';

  it('publishes the MCP resource and the supported private app scopes', () => {
    expect(protectedResourceMetadata(origin)).toMatchObject({
      resource: `${origin}/mcp`,
      authorization_servers: [origin],
      scopes_supported: ['pinterest.read', 'pinterest.write']
    });
  });

  it('advertises authorization code plus PKCE support', () => {
    expect(authorizationServerMetadata(origin)).toMatchObject({
      authorization_endpoint: `${origin}/mcp/oauth/authorize`,
      token_endpoint: `${origin}/mcp/oauth/token`,
      registration_endpoint: `${origin}/mcp/oauth/register`,
      code_challenge_methods_supported: ['S256']
    });
  });

  it('challenges unauthenticated MCP requests with resource metadata', () => {
    expect(authorizationChallenge(origin)).toContain(`${origin}/.well-known/oauth-protected-resource`);
  });
});
