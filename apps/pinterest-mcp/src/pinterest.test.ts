import { describe, expect, it } from 'vitest';
import { postingReadiness } from './pinterest.js';
import type { Env } from './types.js';

function env(overrides: Partial<Env> = {}) {
  return {
    PUBLIC_SITE_URL: 'https://babyreisehelfer.pages.dev',
    ALLOWED_IMAGE_HOSTS: 'babyreisehelfer.pages.dev',
    PINTEREST_API_BASE_URL: 'https://api.pinterest.com',
    ENABLE_PINTEREST_POSTING: 'false',
    PINTEREST_MAX_PINS_PER_CRON: '1',
    PINTEREST_MAX_PINS_PER_DAY: '1',
    PINTEREST_GRANTED_SCOPES: 'boards:read,pins:read',
    ...overrides
  } as Env;
}

describe('Pinterest posting gate', () => {
  it('blocks publishing while ENABLE_PINTEREST_POSTING is false', () => {
    expect(postingReadiness(env({ PINTEREST_GRANTED_SCOPES: 'pins:write' }))).toMatchObject({ ready: false });
  });

  it('blocks publishing without pins:write', () => {
    expect(postingReadiness(env({ ENABLE_PINTEREST_POSTING: 'true' }))).toMatchObject({ ready: false });
  });

  it('permits publishing only with the explicit flag and scope', () => {
    expect(postingReadiness(env({ ENABLE_PINTEREST_POSTING: 'true', PINTEREST_GRANTED_SCOPES: 'boards:read,pins:read,pins:write' }))).toEqual({ ready: true, reason: '' });
  });
});
