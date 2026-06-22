import fs from 'node:fs/promises';

type PinterestPinStatus = 'draft' | 'ready' | 'scheduled' | 'published' | 'archived';

type PinterestPin = {
  id: string;
  status: PinterestPinStatus;
  targetUrl: string;
  boardSuggestion: string;
  pinTitle: string;
  pinDescription: string;
};

type PinterestPinsFile = {
  pins: PinterestPin[];
};

const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);
const postingEnabled = process.env.ENABLE_PINTEREST_POSTING === 'true';
const limit = Number(process.env.PINTEREST_DRY_RUN_LIMIT ?? Number.POSITIVE_INFINITY);

async function loadPins() {
  const raw = await fs.readFile(pinsFile, 'utf8');
  const parsed = JSON.parse(raw) as PinterestPinsFile | PinterestPin[];
  return Array.isArray(parsed) ? parsed : parsed.pins;
}

function assertInternalTarget(pin: PinterestPin) {
  if (!pin.targetUrl.startsWith('https://babyreisehelfer.pages.dev/')) {
    throw new Error(`Pin ${pin.id} hat keine BabyReiseHelfer-Ziel-URL: ${pin.targetUrl}`);
  }

  if (/amazon\./i.test(pin.targetUrl) || /tag=epic05e-21/i.test(pin.targetUrl)) {
    throw new Error(`Pin ${pin.id} verweist direkt auf Amazon. Pinterest-Pins sollen auf BabyReiseHelfer zeigen.`);
  }
}

async function main() {
  const pins = await loadPins();
  const readyPins = pins.filter((pin) => pin.status === 'ready').slice(0, limit);

  console.log(`Pinterest Dry-Run`);
  console.log(`Posting aktiviert laut ENV: ${postingEnabled ? 'ja' : 'nein'}`);
  console.log(`Bereit markierte Pins: ${readyPins.length}`);

  if (postingEnabled) {
    console.log(
      'Hinweis: Dieses Script ist absichtlich nur ein Dry-Run und veröffentlicht auch mit ENABLE_PINTEREST_POSTING=true nichts.'
    );
  }

  if (readyPins.length === 0) {
    console.log('Keine Pins mit status "ready" gefunden. Setze einzelne geprüfte Pins manuell auf "ready".');
    return;
  }

  for (const [index, pin] of readyPins.entries()) {
    assertInternalTarget(pin);
    console.log(`\n${index + 1}. ${pin.pinTitle}`);
    console.log(`   ID: ${pin.id}`);
    console.log(`   Ziel-URL: ${pin.targetUrl}`);
    console.log(`   Beschreibung: ${pin.pinDescription}`);
    console.log(`   Board: ${pin.boardSuggestion}`);
  }

  console.log('\nDry-Run beendet. Es wurde nichts veröffentlicht.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
