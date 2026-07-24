import { nowIso, randomId } from './config.js';
import { AppError, type ConfirmationAction, type PinPayload, type ScheduledPin, type ScheduledPinStatus } from './types.js';

type ScheduledPinRow = {
  id: string;
  board_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string;
  alt_text: string | null;
  scheduled_at: string;
  timezone: string;
  status: ScheduledPinStatus;
  pinterest_pin_id: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type SchedulePayload = PinPayload & {
  scheduledAt: string;
  timezone: string;
};

async function fingerprint(payload: PinPayload) {
  const input = new TextEncoder().encode([payload.boardId, payload.title, payload.link, payload.imageUrl].join('\n'));
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', input));
  return Array.from(digest, (value) => value.toString(16).padStart(2, '0')).join('');
}

export async function hasRecordedPublication(db: D1Database, payload: PinPayload) {
  const key = await fingerprint(payload);
  const existing = await db.prepare('SELECT fingerprint FROM pinterest_publication_fingerprints WHERE fingerprint = ?').bind(key).first();
  return Boolean(existing);
}

export async function recordPublicationFingerprint(
  db: D1Database,
  payload: PinPayload,
  pinterestPinId: string,
  source: 'immediate_publish' | 'scheduled_publish'
) {
  const key = await fingerprint(payload);
  await db.prepare(
    `INSERT OR IGNORE INTO pinterest_publication_fingerprints (fingerprint, pinterest_pin_id, source, created_at)
     VALUES (?, ?, ?, ?)`
  )
    .bind(key, pinterestPinId, source, nowIso())
    .run();
}

async function hasScheduledDuplicate(db: D1Database, payload: PinPayload) {
  const existing = await db.prepare(
    `SELECT id FROM pinterest_scheduled_pins
     WHERE board_id = ? AND title = ? AND link = ? AND image_url = ?
       AND status IN ('scheduled', 'publishing', 'published')
     LIMIT 1`
  )
    .bind(payload.boardId, payload.title, payload.link, payload.imageUrl)
    .first<{ id: string }>();
  return existing?.id ?? null;
}

function toScheduledPin(row: ScheduledPinRow): ScheduledPin {
  return {
    id: row.id,
    boardId: row.board_id,
    title: row.title,
    description: row.description,
    link: row.link,
    imageUrl: row.image_url,
    altText: row.alt_text ?? undefined,
    scheduledAt: row.scheduled_at,
    timezone: row.timezone,
    status: row.status,
    pinterestPinId: row.pinterest_pin_id,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at
  };
}

export async function createConfirmationIntent(
  db: D1Database,
  action: ConfirmationAction,
  payload: unknown
) {
  const id = randomId();
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + 15 * 60_000).toISOString();

  await db.prepare(
    `INSERT INTO pinterest_confirmation_intents (id, action, payload_json, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(id, action, JSON.stringify(payload), createdAt, expiresAt)
    .run();

  return { id, expiresAt };
}

export async function consumeConfirmationIntent<T>(db: D1Database, id: string, action: ConfirmationAction): Promise<T> {
  const row = await db.prepare(
    `SELECT id, action, payload_json, expires_at, consumed_at
     FROM pinterest_confirmation_intents WHERE id = ?`
  )
    .bind(id)
    .first<{ id: string; action: ConfirmationAction; payload_json: string; expires_at: string; consumed_at: string | null }>();

  if (!row || row.action !== action || row.consumed_at || Date.parse(row.expires_at) < Date.now()) {
    throw new AppError('Die Bestätigung ist ungültig oder abgelaufen. Bitte die Aktion erneut prüfen und bestätigen.', 'confirmation_invalid');
  }

  const result = await db.prepare(
    `UPDATE pinterest_confirmation_intents SET consumed_at = ?
     WHERE id = ? AND consumed_at IS NULL`
  )
    .bind(nowIso(), id)
    .run();

  if (result.meta.changes !== 1) {
    throw new AppError('Die Bestätigung wurde bereits verwendet.', 'confirmation_used');
  }

  return JSON.parse(row.payload_json) as T;
}

export async function getScheduledPin(db: D1Database, id: string) {
  const row = await db.prepare('SELECT * FROM pinterest_scheduled_pins WHERE id = ?').bind(id).first<ScheduledPinRow>();
  return row ? toScheduledPin(row) : null;
}

export async function listScheduledPins(db: D1Database, status?: ScheduledPinStatus, limit = 50) {
  const query = status
    ? db.prepare('SELECT * FROM pinterest_scheduled_pins WHERE status = ? ORDER BY scheduled_at ASC LIMIT ?').bind(status, limit)
    : db.prepare('SELECT * FROM pinterest_scheduled_pins ORDER BY scheduled_at ASC LIMIT ?').bind(limit);
  const result = await query.all<ScheduledPinRow>();
  return result.results.map(toScheduledPin);
}

export async function insertScheduledPin(db: D1Database, payload: SchedulePayload) {
  const duplicate = await hasScheduledDuplicate(db, payload);
  if (duplicate) {
    throw new AppError('Ein inhaltlich identischer Pin ist bereits geplant oder veröffentlicht.', 'duplicate_pin');
  }
  const id = randomId();
  const timestamp = nowIso();
  await db.prepare(
    `INSERT INTO pinterest_scheduled_pins (
      id, board_id, title, description, link, image_url, alt_text, scheduled_at, timezone,
      status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled', ?, ?)`
  )
    .bind(
      id,
      payload.boardId,
      payload.title,
      payload.description,
      payload.link,
      payload.imageUrl,
      payload.altText ?? null,
      payload.scheduledAt,
      payload.timezone,
      timestamp,
      timestamp
    )
    .run();
  return getScheduledPin(db, id);
}

export async function updateScheduledPin(db: D1Database, id: string, payload: SchedulePayload) {
  const existing = await getScheduledPin(db, id);
  if (!existing || existing.status !== 'scheduled') {
    throw new AppError('Nur noch nicht veröffentlichte Pins können geändert werden.', 'scheduled_pin_not_editable');
  }

  await db.prepare(
    `UPDATE pinterest_scheduled_pins SET
      board_id = ?, title = ?, description = ?, link = ?, image_url = ?, alt_text = ?,
      scheduled_at = ?, timezone = ?, updated_at = ?
     WHERE id = ? AND status = 'scheduled'`
  )
    .bind(
      payload.boardId,
      payload.title,
      payload.description,
      payload.link,
      payload.imageUrl,
      payload.altText ?? null,
      payload.scheduledAt,
      payload.timezone,
      nowIso(),
      id
    )
    .run();
  return getScheduledPin(db, id);
}

export async function cancelScheduledPin(db: D1Database, id: string) {
  const result = await db.prepare(
    `UPDATE pinterest_scheduled_pins SET status = 'cancelled', updated_at = ?
     WHERE id = ? AND status = 'scheduled'`
  )
    .bind(nowIso(), id)
    .run();
  if (result.meta.changes !== 1) {
    throw new AppError('Der Pin wurde bereits veröffentlicht, verarbeitet oder gelöscht.', 'scheduled_pin_not_cancellable');
  }
  return getScheduledPin(db, id);
}

export async function claimDueScheduledPin(db: D1Database, before: string) {
  const next = await db.prepare(
    `SELECT * FROM pinterest_scheduled_pins
     WHERE status = 'scheduled' AND scheduled_at <= ?
     ORDER BY scheduled_at ASC LIMIT 1`
  )
    .bind(before)
    .first<ScheduledPinRow>();

  if (!next) return null;
  const claim = await db.prepare(
    `UPDATE pinterest_scheduled_pins SET status = 'publishing', updated_at = ?
     WHERE id = ? AND status = 'scheduled'`
  )
    .bind(nowIso(), next.id)
    .run();
  return claim.meta.changes === 1 ? toScheduledPin({ ...next, status: 'publishing', updated_at: nowIso() }) : null;
}

export async function markScheduledPinPublished(db: D1Database, id: string, pinterestPinId: string) {
  const timestamp = nowIso();
  await db.prepare(
    `UPDATE pinterest_scheduled_pins SET
      status = 'published', pinterest_pin_id = ?, published_at = ?, updated_at = ?, last_error = NULL
     WHERE id = ?`
  )
    .bind(pinterestPinId, timestamp, timestamp, id)
    .run();
}

export async function markScheduledPinFailed(db: D1Database, id: string, message: string) {
  await db.prepare(
    `UPDATE pinterest_scheduled_pins SET status = 'failed', last_error = ?, updated_at = ? WHERE id = ?`
  )
    .bind(message.slice(0, 500), nowIso(), id)
    .run();
}

export async function recordPublishAttempt(
  db: D1Database,
  input: { scheduledPinId?: string; pinterestPinId?: string; action: string; status: 'published' | 'failed'; errorMessage?: string }
) {
  await db.prepare(
    `INSERT INTO pinterest_publish_attempts (id, scheduled_pin_id, pinterest_pin_id, action, status, error_message, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      randomId(),
      input.scheduledPinId ?? null,
      input.pinterestPinId ?? null,
      input.action,
      input.status,
      input.errorMessage?.slice(0, 500) ?? null,
      nowIso()
    )
    .run();
}

export async function publishedCountForUtcDay(db: D1Database, isoTimestamp: string) {
  const result = await db.prepare(
    `SELECT COUNT(*) AS count FROM pinterest_scheduled_pins
     WHERE status = 'published' AND substr(published_at, 1, 10) = substr(?, 1, 10)`
  )
    .bind(isoTimestamp)
    .first<{ count: number }>();
  return result?.count ?? 0;
}
