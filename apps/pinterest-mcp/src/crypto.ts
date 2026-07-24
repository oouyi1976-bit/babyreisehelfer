import { nowIso } from './config.js';
import { AppError, type Env, type PinterestTokenRecord } from './types.js';

const TOKEN_KEY = 'default';

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function encryptionKey(secret: string | undefined) {
  if (!secret) {
    throw new AppError(
      'PINTEREST_TOKEN_ENCRYPTION_KEY fehlt. Pinterest-Tokens werden deshalb nicht in D1 gespeichert.',
      'token_encryption_key_missing',
      503
    );
  }

  const keyBytes = base64ToBytes(secret);
  if (keyBytes.byteLength !== 32) {
    throw new AppError(
      'PINTEREST_TOKEN_ENCRYPTION_KEY muss ein Base64-kodierter 32-Byte-Schlüssel sein.',
      'token_encryption_key_invalid',
      503
    );
  }

  return crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

async function encryptJson(value: unknown, secret: string | undefined) {
  const key = await encryptionKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return JSON.stringify({ iv: bytesToBase64(iv), ciphertext: bytesToBase64(new Uint8Array(ciphertext)) });
}

async function decryptJson<T>(value: string, secret: string | undefined) {
  const key = await encryptionKey(secret);
  const payload = JSON.parse(value) as { iv: string; ciphertext: string };
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBytes(payload.iv) },
    key,
    base64ToBytes(payload.ciphertext)
  );
  return JSON.parse(new TextDecoder().decode(plaintext)) as T;
}

export async function savePinterestTokenRecord(env: Env, record: PinterestTokenRecord) {
  const encryptedValue = await encryptJson(record, env.PINTEREST_TOKEN_ENCRYPTION_KEY);
  await env.PINTEREST_DB.prepare(
    `INSERT INTO pinterest_tokens (token_key, encrypted_value, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(token_key) DO UPDATE SET encrypted_value = excluded.encrypted_value, updated_at = excluded.updated_at`
  )
    .bind(TOKEN_KEY, encryptedValue, nowIso())
    .run();
}

export async function loadPinterestTokenRecord(env: Env): Promise<PinterestTokenRecord | null> {
  const stored = await env.PINTEREST_DB.prepare(
    'SELECT encrypted_value FROM pinterest_tokens WHERE token_key = ?'
  )
    .bind(TOKEN_KEY)
    .first<{ encrypted_value: string }>();

  if (stored?.encrypted_value) {
    return decryptJson<PinterestTokenRecord>(stored.encrypted_value, env.PINTEREST_TOKEN_ENCRYPTION_KEY);
  }

  if (!env.PINTEREST_ACCESS_TOKEN) return null;

  const record: PinterestTokenRecord = {
    accessToken: env.PINTEREST_ACCESS_TOKEN,
    refreshToken: env.PINTEREST_REFRESH_TOKEN || undefined,
    scopes: env.PINTEREST_GRANTED_SCOPES.split(/[\s,]+/).filter(Boolean),
    updatedAt: nowIso()
  };

  await savePinterestTokenRecord(env, record);
  return record;
}
