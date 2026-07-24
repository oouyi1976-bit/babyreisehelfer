import { hasScope, nowIso, safeErrorMessage } from './config.js';
import { loadPinterestTokenRecord, savePinterestTokenRecord } from './crypto.js';
import { AppError, type Env, type PinterestBoard, type PinterestTokenRecord, type PinPayload } from './types.js';

type PinterestApiErrorBody = {
  code?: number;
  message?: string;
  type?: string;
};

type PinterestTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
};

type PinterestPinResponse = {
  id?: string;
};

function apiBase(env: Env) {
  return (env.PINTEREST_API_BASE_URL || 'https://api.pinterest.com').replace(/\/$/, '');
}

function formatPinterestApiError(status: number, body: string) {
  let detail = '';
  try {
    const parsed = JSON.parse(body) as PinterestApiErrorBody;
    detail = parsed.message || parsed.type || '';
  } catch {
    detail = body.slice(0, 240);
  }
  return `Pinterest API ${status}${detail ? `: ${detail}` : ''}`;
}

export function postingReadiness(env: Env) {
  if (env.ENABLE_PINTEREST_POSTING !== 'true') {
    return { ready: false, reason: 'ENABLE_PINTEREST_POSTING=false. Es wird nichts veröffentlicht.' };
  }
  if (!hasScope(env, 'pins:write')) {
    return { ready: false, reason: 'Pinterest pins:write fehlt. Solange der Trial-Zugriff aussteht, ist echtes Posting blockiert.' };
  }
  return { ready: true, reason: '' };
}

async function refreshPinterestToken(env: Env, current: PinterestTokenRecord) {
  if (!current.refreshToken || !env.PINTEREST_APP_ID || !env.PINTEREST_APP_SECRET) {
    throw new AppError(
      'Pinterest-Token ist abgelaufen. Für die Erneuerung werden PINTEREST_REFRESH_TOKEN, PINTEREST_APP_ID und PINTEREST_APP_SECRET benötigt.',
      'pinterest_refresh_unavailable',
      401
    );
  }

  const basic = btoa(`${env.PINTEREST_APP_ID}:${env.PINTEREST_APP_SECRET}`);
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: current.refreshToken,
    scope: current.scopes.join(',')
  });
  const response = await fetch(`${apiBase(env)}/v5/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });
  const text = await response.text();
  if (!response.ok) {
    throw new AppError(formatPinterestApiError(response.status, text), 'pinterest_refresh_failed', response.status);
  }

  const token = JSON.parse(text) as PinterestTokenResponse;
  const next: PinterestTokenRecord = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token || current.refreshToken,
    expiresAt: token.expires_in ? new Date(Date.now() + token.expires_in * 1000).toISOString() : undefined,
    scopes: (token.scope || current.scopes.join(',')).split(/[\s,]+/).filter(Boolean),
    updatedAt: nowIso()
  };
  await savePinterestTokenRecord(env, next);
  return next;
}

async function activePinterestToken(env: Env) {
  const current = await loadPinterestTokenRecord(env);
  if (!current) {
    throw new AppError(
      'Pinterest ist noch nicht verbunden. Starte den serverseitigen OAuth-Flow unter /oauth/pinterest/start.',
      'pinterest_not_connected',
      401
    );
  }

  if (current.expiresAt && Date.parse(current.expiresAt) - Date.now() < 5 * 60_000) {
    return refreshPinterestToken(env, current);
  }
  return current;
}

async function pinterestFetch(env: Env, path: string, init: RequestInit = {}, retryAfterRefresh = true) {
  const token = await activePinterestToken(env);
  const response = await fetch(`${apiBase(env)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...init.headers
    }
  });

  if (response.status === 401 && retryAfterRefresh && token.refreshToken) {
    await refreshPinterestToken(env, token);
    return pinterestFetch(env, path, init, false);
  }

  return response;
}

export async function listPinterestBoards(env: Env) {
  const boards: PinterestBoard[] = [];
  let bookmark = '';

  do {
    const query = new URLSearchParams({ page_size: '100' });
    if (bookmark) query.set('bookmark', bookmark);
    const response = await pinterestFetch(env, `/v5/boards?${query.toString()}`);
    const text = await response.text();
    if (!response.ok) {
      throw new AppError(formatPinterestApiError(response.status, text), 'pinterest_boards_failed', response.status);
    }
    const body = JSON.parse(text) as { items?: Array<PinterestBoard & { privacy?: string }>; bookmark?: string | null };
    boards.push(
      ...(body.items ?? [])
        .filter((board) => !board.privacy || board.privacy === 'PUBLIC')
        .map((board) => ({ id: board.id, name: board.name, description: board.description || '', privacy: board.privacy }))
    );
    bookmark = body.bookmark || '';
  } while (bookmark);

  return boards;
}

export async function createPinterestPin(env: Env, pin: PinPayload) {
  const response = await pinterestFetch(env, '/v5/pins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      board_id: pin.boardId,
      title: pin.title,
      description: pin.description,
      link: pin.link,
      alt_text: pin.altText || pin.title,
      media_source: {
        source_type: 'image_url',
        url: pin.imageUrl
      }
    })
  });
  const text = await response.text();
  if (!response.ok) {
    throw new AppError(formatPinterestApiError(response.status, text), 'pinterest_pin_create_failed', response.status);
  }
  const body = text ? (JSON.parse(text) as PinterestPinResponse) : {};
  if (!body.id) {
    throw new AppError('Pinterest hat keine Pin-ID zurückgegeben.', 'pinterest_pin_missing_id', 502);
  }
  return { id: body.id, url: `https://www.pinterest.com/pin/${body.id}/` };
}

export async function exchangePinterestAuthorizationCode(env: Env, code: string) {
  if (!env.PINTEREST_APP_ID || !env.PINTEREST_APP_SECRET || !env.PINTEREST_REDIRECT_URI) {
    throw new AppError('Pinterest OAuth ist noch nicht vollständig konfiguriert.', 'pinterest_oauth_not_configured', 503);
  }
  const basic = btoa(`${env.PINTEREST_APP_ID}:${env.PINTEREST_APP_SECRET}`);
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: env.PINTEREST_REDIRECT_URI,
    continuous_refresh: 'true'
  });
  const response = await fetch(`${apiBase(env)}/v5/oauth/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  const text = await response.text();
  if (!response.ok) {
    throw new AppError(formatPinterestApiError(response.status, text), 'pinterest_oauth_exchange_failed', response.status);
  }
  const token = JSON.parse(text) as PinterestTokenResponse;
  const record: PinterestTokenRecord = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: token.expires_in ? new Date(Date.now() + token.expires_in * 1000).toISOString() : undefined,
    scopes: (token.scope || '').split(/[\s,]+/).filter(Boolean),
    updatedAt: nowIso()
  };
  await savePinterestTokenRecord(env, record);
  return { scopes: record.scopes, expiresAt: record.expiresAt };
}

export function publicPinterestError(error: unknown) {
  if (error instanceof AppError) return error;
  return new AppError(safeErrorMessage(error), 'unexpected_pinterest_error', 500);
}
