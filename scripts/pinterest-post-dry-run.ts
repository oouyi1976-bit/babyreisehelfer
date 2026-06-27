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
};

type PostedLog = {
  posts?: Array<{ pinId: string; pinterestPinId?: string; postedAt?: string }>;
};

type LocalBoard = {
  name: string;
  boardId: string;
};

const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);
const postedLogFile = new URL('../marketing/pinterest/posted-log.json', import.meta.url);
const boardsFile = new URL('../marketing/pinterest/boards.json', import.meta.url);
const defaultBoardId = process.env.PINTEREST_DEFAULT_BOARD_ID ?? '';
const limit = Number(process.env.PINTEREST_DRY_RUN_LIMIT ?? Number.POSITIVE_INFINITY);

async function readJson<T>(file: URL, fallback: T) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function validationErrors(pin: PinterestPin, postedIds: Set<string>, boardIdByName: Map<string, string>) {
  const errors: string[] = [];
  const boardId = pin.boardId || boardIdByName.get(pin.boardSuggestion) || defaultBoardId;

  if (!boardId) errors.push('boardId fehlt');
  if (!pin.publicImageUrl) errors.push('publicImageUrl fehlt');
  if (!pin.targetUrl) errors.push('targetUrl fehlt');
  if (!pin.targetUrl.startsWith('https://babyreisehelfer.pages.dev/')) errors.push('targetUrl ist keine BabyReiseHelfer-URL');
  if (/amazon\.|tag=epic05e-21/i.test(pin.targetUrl)) errors.push('targetUrl verweist direkt auf Amazon');
  if (postedIds.has(pin.id)) errors.push('Pin steht bereits in posted-log.json');

  return errors;
}

async function main() {
  const data = await readJson<{ pins: PinterestPin[] }>(pinsFile, { pins: [] });
  const postedLog = await readJson<PostedLog>(postedLogFile, { posts: [] });
  const boards = await readJson<LocalBoard[]>(boardsFile, []);
  const boardIdByName = new Map(boards.map((board) => [board.name, board.boardId]).filter(([, boardId]) => Boolean(boardId)));
  const postedIds = new Set((postedLog.posts ?? []).map((entry) => entry.pinId));
  const readyPins = data.pins.filter((pin) => pin.status === 'ready').slice(0, limit);

  console.log('Pinterest Auto-Posting Dry-Run');
  console.log(`Ready-Pins: ${readyPins.length}`);

  if (readyPins.length === 0) {
    console.log('Keine Pins mit status "ready" gefunden. Drafts werden nicht gepostet.');
    return;
  }

  for (const [index, pin] of readyPins.entries()) {
    const boardId = pin.boardId || boardIdByName.get(pin.boardSuggestion) || defaultBoardId;
    const errors = validationErrors(pin, postedIds, boardIdByName);
    console.log(`\n${index + 1}. ${pin.id}`);
    console.log(`   Titel: ${pin.pinTitle}`);
    console.log(`   Board: ${pin.boardSuggestion}`);
    console.log(`   Board-ID: ${boardId || 'FEHLT'}`);
    console.log(`   Ziel-URL: ${pin.targetUrl || 'FEHLT'}`);
    console.log(`   Bild-URL: ${pin.publicImageUrl || 'FEHLT'}`);
    console.log(`   Status: ${pin.status}`);
    console.log(`   Mögliche Fehler: ${errors.length ? errors.join('; ') : 'keine'}`);
  }

  console.log('\nDry-Run beendet. Es wurde nichts veröffentlicht.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
