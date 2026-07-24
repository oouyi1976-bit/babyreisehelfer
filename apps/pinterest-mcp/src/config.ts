import type { Env } from './types.js';

export function nowIso() {
  return new Date().toISOString();
}

export function randomId() {
  return crypto.randomUUID();
}

export function enabled(env: Env) {
  return env.ENABLE_PINTEREST_POSTING === 'true';
}

export function numberSetting(value: string | undefined, fallback: number, minimum = 1) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(minimum, Math.floor(parsed)) : fallback;
}

export function grantedScopes(env: Env) {
  return env.PINTEREST_GRANTED_SCOPES.split(/[\s,]+/).map((scope) => scope.trim()).filter(Boolean);
}

export function hasScope(env: Env, scope: string) {
  return grantedScopes(env).includes(scope);
}

export function siteUrl(env: Env) {
  return new URL(env.PUBLIC_SITE_URL).toString();
}

export function allowedImageHosts(env: Env) {
  const siteHost = new URL(env.PUBLIC_SITE_URL).hostname;
  return new Set(
    [siteHost, ...env.ALLOWED_IMAGE_HOSTS.split(',')]
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 500);
  return String(error).slice(0, 500);
}
