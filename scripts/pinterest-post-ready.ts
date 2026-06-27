import fs from 'node:fs/promises';

type PinterestPinStatus = 'draft' | 'ready' | 'posted' | 'needs-fix' | 'error';

type PinterestPin = {
  id: string;
  status: PinterestPinStatus;
  targetUrl: string;
  boardSuggestion: string;
  boardId: string;
  pinTitle: string;
  pinDescription: string;
  publicImageUrl: string;
  postedAt: string;
  pinterestPinId: string;
  lastError: string;
};

type PinterestPinsFile = {
  generatedAt?: string;
  siteUrl?: string;
  pins: PinterestPin[];
};

type LocalBoard = {
  name: string;
  boardId: string;
};

type PostedLogEntry = {
  pinId: string;
  pinterestPinId: string;
  postedAt: string;
  targetUrl: string;
  publicImageUrl: string;
  boardId: string;
  title: string;
};

type PostedLog = {
  updatedAt: string;
  posts: PostedLogEntry[];
};

const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);
const postedLogFile = new URL('../marketing/pinterest/posted-log.json', import.meta.url);
const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
const postingEnabled = process.env.ENABLE_PINTEREST_POSTING === 'true';
const maxPinsPerRun = Math.max(1, Number(process.env.PINTEREST_MAX_PINS_PER_RUN ?? 1));
const defaultBoardId = process.env.PINTEREST_DEFAULT_BOARD_ID ?? '';
const tokenScopes = process.env.PINTEREST_TOKEN_SCOPES ?? '';
const boardsFile = new URL('../marketing/pinterest/boards.json', import.meta.url);

async function readJson<T>(file: URL, fallback: T) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: URL, value: unknown) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function hasPinsWriteScope() {
  return tokenScopes
    .split(/[,\s]+/)
    .map((scope) => scope.trim())
    .filter(Boolean)
    .includes('pins:write');
}

function validationErrors(pin: PinterestPin, postedIds: Set<string>, boardIdByName: Map<string, string>) {
  const errors: string[] = [];
  const boardId = pin.boardId || boardIdByName.get(pin.boardSuggestion) || defaultBoardId;

  if (pin.status !== 'ready') errors.push(`Status ist "${pin.status}", nicht "ready"`);
  if (!boardId) errors.push('boardId fehlt');
  if (!pin.publicImageUrl) errors.push('publicImageUrl fehlt');
  if (!pin.targetUrl) errors.push('targetUrl fehlt');
  if (!pin.targetUrl.startsWith('https://babyreisehelfer.pages.dev/')) errors.push('targetUrl ist keine BabyReiseHelfer-URL');
  if (/amazon\.|tag=epic05e-21/i.test(pin.targetUrl)) errors.push('targetUrl verweist direkt auf Amazon');
  if (postedIds.has(pin.id)) errors.push('Pin steht bereits in posted-log.json');

  return errors;
}

async function createPinterestPin(pin: PinterestPin, boardId: string) {
  const response = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      board_id: boardId,
      title: pin.pinTitle,
      description: pin.pinDescription,
      link: pin.targetUrl,
      alt_text: pin.pinTitle,
      media_source: {
        source_type: 'image_url',
        url: pin.publicImageUrl
      }
    })
  });

  const bodyText = await response.text();
  const body = bodyText
    ? (() => {
        try {
          return JSON.parse(bodyText) as { id?: string };
        } catch {
          return {};
        }
      })()
    : {};

  if (!response.ok) {
    throw new Error(`Pinterest API ${response.status}: ${bodyText}`);
  }

  return body as { id?: string };
}

async function main() {
  const data = await readJson<PinterestPinsFile>(pinsFile, { pins: [] });
  const postedLog = await readJson<PostedLog>(postedLogFile, { updatedAt: new Date().toISOString(), posts: [] });
  const boards = await readJson<LocalBoard[]>(boardsFile, []);
  const boardIdByName = new Map(boards.map((board) => [board.name, board.boardId]).filter(([, boardId]) => Boolean(boardId)));
  const postedIds = new Set(postedLog.posts.map((entry) => entry.pinId));
  const readyPins = data.pins.filter((pin) => pin.status === 'ready').slice(0, maxPinsPerRun);

  console.log('Pinterest Ready-Posting');
  console.log(`Posting aktiviert: ${postingEnabled ? 'ja' : 'nein'}`);
  console.log(`Max Pins pro Run: ${maxPinsPerRun}`);
  console.log(`Ready-Pins für diesen Run: ${readyPins.length}`);

  if (!postingEnabled) {
    console.log('ENABLE_PINTEREST_POSTING ist nicht true. Es wird nichts veröffentlicht.');
    for (const pin of readyPins) {
      const errors = validationErrors(pin, postedIds, boardIdByName);
      console.log(`- ${pin.id}: ${errors.length ? errors.join('; ') : 'würde gepostet werden'}`);
    }
    return;
  }

  if (!accessToken) {
    throw new Error('PINTEREST_ACCESS_TOKEN fehlt. Posting ist aktiviert, aber kein Token ist gesetzt.');
  }

  if (!hasPinsWriteScope()) {
    throw new Error(
      'Pinterest Schreibrecht fehlt: PINTEREST_TOKEN_SCOPES enthält kein pins:write. Aktuell bitte nur Boards synchronisieren; echtes Posting erst nach Trial-Freigabe und Token mit pins:write aktivieren.'
    );
  }

  let postedCount = 0;

  for (const pin of readyPins) {
    const boardId = pin.boardId || boardIdByName.get(pin.boardSuggestion) || defaultBoardId;
    const errors = validationErrors(pin, postedIds, boardIdByName);

    if (errors.length) {
      pin.status = 'needs-fix';
      pin.lastError = errors.join('; ');
      console.log(`Nicht gepostet ${pin.id}: ${pin.lastError}`);
      continue;
    }

    try {
      const result = await createPinterestPin(pin, boardId);
      const postedAt = new Date().toISOString();
      const pinterestPinId = result.id ?? '';

      pin.status = 'posted';
      pin.postedAt = postedAt;
      pin.pinterestPinId = pinterestPinId;
      pin.lastError = '';
      postedIds.add(pin.id);
      postedLog.posts.push({
        pinId: pin.id,
        pinterestPinId,
        postedAt,
        targetUrl: pin.targetUrl,
        publicImageUrl: pin.publicImageUrl,
        boardId,
        title: pin.pinTitle
      });
      postedCount += 1;
      console.log(`Gepostet ${pin.id}: ${pinterestPinId || 'Pinterest-ID nicht in Antwort gefunden'}`);
    } catch (error) {
      pin.status = 'error';
      pin.lastError = error instanceof Error ? error.message : String(error);
      console.error(`Fehler bei ${pin.id}: ${pin.lastError}`);
    }
  }

  postedLog.updatedAt = new Date().toISOString();
  await writeJson(pinsFile, data);
  await writeJson(postedLogFile, postedLog);
  console.log(`Posting abgeschlossen. Gepostete Pins: ${postedCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
