import { describe, expect, it, vi } from 'vitest';
import { normalizeImageUrl, normalizeInternalLink, validatePublicImage, validatePublicLink } from './validation.js';
import type { Env } from './types.js';

const env = {
  PUBLIC_SITE_URL: 'https://babyreisehelfer.pages.dev',
  ALLOWED_IMAGE_HOSTS: 'babyreisehelfer.pages.dev',
  ENABLE_PINTEREST_POSTING: 'false',
  PINTEREST_MAX_PINS_PER_CRON: '1',
  PINTEREST_MAX_PINS_PER_DAY: '1',
  PINTEREST_GRANTED_SCOPES: 'boards:read,pins:read',
  PINTEREST_API_BASE_URL: 'https://api.pinterest.com'
} as Env;

describe('Pinterest URL validation', () => {
  it('accepts an internal BabyReiseHelfer target URL', () => {
    expect(normalizeInternalLink(env, '/ratgeber/10-tipps-reisen-mit-baby/')).toBe(
      'https://babyreisehelfer.pages.dev/ratgeber/10-tipps-reisen-mit-baby/'
    );
  });

  it('rejects direct Amazon affiliate links', () => {
    expect(() => normalizeInternalLink(env, 'https://www.amazon.de/dp/B08T7VKR2R?tag=epic05e-21')).toThrow(
      'BabyReiseHelfer'
    );
  });

  it('rejects images outside the public site host', () => {
    expect(() => normalizeImageUrl(env, 'https://example.com/pin.png')).toThrow('erlaubten BabyReiseHelfer-Bildhost');
  });

  it('requires an available HTML target and a real image resource', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response('<!doctype html>', { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }))
      .mockResolvedValueOnce(new Response(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 3, 232, 0, 0, 5, 220]), {
        status: 206,
        headers: { 'content-type': 'image/png' }
      }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(validatePublicLink(env, '/ratgeber/10-tipps-reisen-mit-baby/')).resolves.toContain('/ratgeber/10-tipps-reisen-mit-baby/');
    await expect(validatePublicImage(env, '/pinterest/manual-pins/pin.png')).resolves.toMatchObject({ width: 1000, height: 1500 });
  });
});
