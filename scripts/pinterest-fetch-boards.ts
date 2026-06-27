import fs from 'node:fs/promises';

type LocalBoard = {
  name: string;
  description: string;
  keywords: string[];
  boardId: string;
  pinMatches?: string[];
  pinterestName?: string;
  lastSyncedAt?: string;
};

type PinterestBoard = {
  id: string;
  name: string;
  description?: string;
};

type PinterestBoardsResponse = {
  items?: PinterestBoard[];
  bookmark?: string | null;
};

type PinterestPin = {
  id: string;
  boardSuggestion: string;
  boardId: string;
};

type PinterestPinsFile = {
  pins: PinterestPin[];
};

const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
const boardsFile = new URL('../marketing/pinterest/boards.json', import.meta.url);
const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);

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

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

async function fetchPinterestBoards() {
  if (!accessToken) {
    throw new Error('PINTEREST_ACCESS_TOKEN fehlt. Board-Sync braucht einen Token mit boards:read.');
  }

  const boards: PinterestBoard[] = [];
  let bookmark: string | undefined;

  do {
    const url = new URL('https://api.pinterest.com/v5/boards');
    url.searchParams.set('page_size', '100');
    if (bookmark) url.searchParams.set('bookmark', bookmark);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const bodyText = await response.text();

    if (!response.ok) {
      const detail = response.status === 401 || response.status === 403
        ? 'Token ist ungültig oder hat kein boards:read-Recht.'
        : 'Pinterest API konnte Boards nicht laden.';
      throw new Error(`${detail} Pinterest API ${response.status}: ${bodyText}`);
    }

    const body = bodyText ? (JSON.parse(bodyText) as PinterestBoardsResponse) : {};
    boards.push(...(body.items ?? []));
    bookmark = body.bookmark ?? undefined;
  } while (bookmark);

  return boards;
}

async function main() {
  const localBoards = await readJson<LocalBoard[]>(boardsFile, []);
  const pinsData = await readJson<PinterestPinsFile>(pinsFile, { pins: [] });
  const pinterestBoards = await fetchPinterestBoards();
  const pinterestByName = new Map(pinterestBoards.map((board) => [normalizeName(board.name), board]));
  const syncedAt = new Date().toISOString();
  let matchedBoards = 0;

  for (const board of localBoards) {
    const match = pinterestByName.get(normalizeName(board.name));
    if (!match) continue;

    board.boardId = match.id;
    board.pinterestName = match.name;
    board.lastSyncedAt = syncedAt;
    matchedBoards += 1;
  }

  const localBoardIdByName = new Map(localBoards.map((board) => [board.name, board.boardId]));
  let updatedPins = 0;

  for (const pin of pinsData.pins) {
    const boardId = localBoardIdByName.get(pin.boardSuggestion);
    if (!boardId || pin.boardId === boardId) continue;

    pin.boardId = boardId;
    updatedPins += 1;
  }

  await writeJson(boardsFile, localBoards);
  await writeJson(pinsFile, pinsData);

  console.log(`Pinterest Boards gefunden: ${pinterestBoards.length}`);
  console.log(`Boards in boards.json zugeordnet: ${matchedBoards}`);
  console.log(`Pins mit Board-ID aktualisiert: ${updatedPins}`);

  if (matchedBoards === 0) {
    console.log('Hinweis: Keine Board-Namen passten exakt. Benenne Pinterest-Boards wie in boards.json oder trage boardId manuell ein.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
