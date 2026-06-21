import fs from 'node:fs/promises';

type PinterestPinDraft = {
  id: string;
  pinTitle: string;
  pinDescription: string;
  targetUrl: string;
  boardSuggestion: string;
  imagePrompt: string;
  imageUrl?: string;
};

type PinterestPinsFile = {
  pins: PinterestPinDraft[];
};

const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);
const enablePosting = process.env.ENABLE_PINTEREST_POSTING === 'true';
const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
const boardId = process.env.PINTEREST_BOARD_ID;
const defaultMediaUrl = process.env.PINTEREST_DEFAULT_MEDIA_URL;

async function loadPins() {
  const raw = await fs.readFile(pinsFile, 'utf8');
  return JSON.parse(raw) as PinterestPinsFile;
}

function printDraft(pin: PinterestPinDraft, index: number) {
  console.log(`\n${index + 1}. ${pin.pinTitle}`);
  console.log(`   Ziel: ${pin.targetUrl}`);
  console.log(`   Board-Vorschlag: ${pin.boardSuggestion}`);
  console.log(`   Bildprompt: ${pin.imagePrompt}`);
}

async function postPin(pin: PinterestPinDraft) {
  if (!accessToken || !boardId) {
    throw new Error('PINTEREST_ACCESS_TOKEN und PINTEREST_BOARD_ID müssen gesetzt sein.');
  }

  const mediaUrl = pin.imageUrl ?? defaultMediaUrl;
  if (!mediaUrl) {
    throw new Error(
      `Für ${pin.id} fehlt imageUrl. Setze im Draft eine Bild-URL oder PINTEREST_DEFAULT_MEDIA_URL.`
    );
  }

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
      media_source: {
        source_type: 'image_url',
        url: mediaUrl
      }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pinterest API Fehler ${response.status}: ${body}`);
  }

  return response.json();
}

async function main() {
  const data = await loadPins();
  const pins = data.pins.slice(0, Number(process.env.PINTEREST_DRAFT_LIMIT ?? data.pins.length));

  console.log(`Pinterest Draft Check: ${pins.length} Pin(s)`);
  console.log(`Posting aktiviert: ${enablePosting ? 'ja' : 'nein'}`);

  for (const [index, pin] of pins.entries()) {
    printDraft(pin, index);

    if (enablePosting) {
      const result = await postPin(pin);
      console.log(`   Gepostet: ${JSON.stringify(result)}`);
    }
  }

  if (!enablePosting) {
    console.log('\nNur Vorschau. Setze ENABLE_PINTEREST_POSTING=true, um echtes Posting zu erlauben.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
