import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

type PinterestPinStatus = 'draft' | 'ready' | 'posted' | 'needs-fix' | 'error';

type PinterestPin = {
  id: string;
  status: PinterestPinStatus;
  targetUrl: string;
  boardSuggestion: string;
  boardId: string;
  pinTitle: string;
  pinDescription: string;
  overlayText: string;
  imagePrompt: string;
  imagePath: string;
  publicImageUrl: string;
  keywords: string[];
  hashtags: string[];
  articleSlug: string;
  category: string;
  createdAt: string;
  scheduledWindow: string;
  postedAt: string;
  pinterestPinId: string;
  lastError: string;
};

type PinterestPinsFile = {
  generatedAt?: string;
  siteUrl?: string;
  pins: PinterestPin[];
};

const pinsFile = new URL('../marketing/pinterest/pins.json', import.meta.url);
const publicImagesDir = new URL('../public/pinterest/generated-images/', import.meta.url);
const publicSiteUrl = process.env.PUBLIC_SITE_URL ?? 'https://babyreisehelfer.pages.dev';
const overwriteImages = process.env.PINTEREST_IMAGE_OVERWRITE === 'true';
const imageLimit = Number(process.env.PINTEREST_IMAGE_LIMIT ?? Number.POSITIVE_INFINITY);

const palettes = [
  { bg: '#fff8ee', soft: '#dceef7', accent: '#ef654f', deep: '#16324f', sage: '#8fae8a' },
  { bg: '#fffdf8', soft: '#e9f1e6', accent: '#ef654f', deep: '#16324f', sage: '#6e9369' },
  { bg: '#f6efe2', soft: '#dceef7', accent: '#f6b75d', deep: '#16324f', sage: '#8fae8a' }
];

async function loadPins() {
  const raw = await fs.readFile(pinsFile, 'utf8');
  return JSON.parse(raw) as PinterestPinsFile;
}

function normalizeSiteUrl(value: string) {
  return value.endsWith('/') ? value : `${value}/`;
}

function publicUrlFor(fileName: string) {
  return new URL(`pinterest/generated-images/${fileName}`, normalizeSiteUrl(publicSiteUrl)).href;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapText(value: string, maxChars: number, maxLines: number) {
  const words = value.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) lines.push(current);
    current = word;

    if (lines.length === maxLines - 1) break;
  }

  if (current && lines.length < maxLines) lines.push(current);

  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[,.!?;:]?$/, '')}...`;
  }

  return lines;
}

function textBlock(lines: string[], x: number, y: number, fontSize: number, lineHeight: number, color: string, weight = 800) {
  return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${color}">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')}</text>`;
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    packlisten: 'Packliste',
    'fliegen-mit-baby': 'Fliegen mit Baby',
    'hotel-mit-baby': 'Hotel mit Baby',
    'kinderwagen-zubehoer': 'Kinderwagen',
    'strand-sonne': 'Strand & Sonne',
    produkte: 'Produktideen'
  };

  return labels[category] ?? 'BabyReiseHelfer';
}

function visualMotif(pin: PinterestPin, palette: (typeof palettes)[number]) {
  const lower = `${pin.category} ${pin.articleSlug} ${pin.pinTitle}`.toLowerCase();

  if (lower.includes('fliegen')) {
    return `
      <path d="M650 430 C720 360 800 330 880 350" fill="none" stroke="${palette.accent}" stroke-width="8" stroke-dasharray="16 18" opacity="0.5"/>
      <path d="M755 324 l112 44 -88 34 -25 88 -42 -106 -104 -40z" fill="${palette.accent}" opacity="0.88"/>
      <rect x="600" y="810" width="260" height="180" rx="34" fill="#ffffff" opacity="0.84"/>
      <circle cx="662" cy="885" r="34" fill="${palette.soft}"/>
      <rect x="712" y="852" width="98" height="14" rx="7" fill="${palette.deep}" opacity="0.82"/>
      <rect x="712" y="884" width="128" height="14" rx="7" fill="${palette.sage}" opacity="0.76"/>
    `;
  }

  if (lower.includes('hotel')) {
    return `
      <rect x="620" y="700" width="255" height="210" rx="38" fill="#ffffff" opacity="0.84"/>
      <rect x="660" y="760" width="178" height="74" rx="18" fill="${palette.soft}"/>
      <rect x="690" y="720" width="116" height="50" rx="16" fill="#ffffff"/>
      <circle cx="785" cy="645" r="52" fill="${palette.accent}" opacity="0.78"/>
      <circle cx="785" cy="645" r="86" fill="${palette.accent}" opacity="0.14"/>
    `;
  }

  if (lower.includes('strand') || lower.includes('sonne') || lower.includes('mallorca')) {
    return `
      <circle cx="760" cy="394" r="70" fill="${palette.accent}" opacity="0.78"/>
      <circle cx="760" cy="394" r="116" fill="${palette.accent}" opacity="0.12"/>
      <path d="M560 905 Q700 710 875 905z" fill="${palette.soft}" opacity="0.9"/>
      <path d="M598 905 Q700 774 837 905z" fill="#ffffff" opacity="0.82"/>
      <rect x="520" y="940" width="390" height="28" rx="14" fill="${palette.sage}" opacity="0.45"/>
    `;
  }

  if (lower.includes('kinderwagen') || lower.includes('buggy')) {
    return `
      <rect x="600" y="725" width="250" height="150" rx="54" fill="${palette.soft}" opacity="0.95"/>
      <path d="M632 730 Q722 600 826 720" fill="none" stroke="${palette.sage}" stroke-width="20" stroke-linecap="round"/>
      <circle cx="646" cy="900" r="34" fill="${palette.deep}" opacity="0.85"/>
      <circle cx="812" cy="900" r="34" fill="${palette.deep}" opacity="0.85"/>
      <path d="M610 720 h250" stroke="${palette.deep}" stroke-width="16" stroke-linecap="round" opacity="0.9"/>
    `;
  }

  return `
    <rect x="610" y="670" width="250" height="290" rx="44" fill="${palette.soft}" opacity="0.96"/>
    <path d="M680 670 v-56 h110 v56" fill="none" stroke="${palette.sage}" stroke-width="18" stroke-linecap="round"/>
    <rect x="650" y="760" width="168" height="40" rx="20" fill="#ffffff" opacity="0.82"/>
    <rect x="650" y="830" width="128" height="28" rx="14" fill="${palette.accent}" opacity="0.74"/>
  `;
}

function buildSvg(pin: PinterestPin, index: number) {
  const palette = palettes[index % palettes.length];
  const titleLines = wrapText(pin.overlayText, 16, 3);
  const subtitleLines = wrapText(pin.pinTitle, 29, 4);
  const descriptionLines = wrapText(pin.pinDescription.split('Passend zum')[0].trim(), 34, 3);
  const keyword = pin.keywords[0] ?? 'Reisen mit Baby';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${palette.bg}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#16324f" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect width="1000" height="1500" fill="url(#bg)"/>
    <circle cx="118" cy="148" r="220" fill="${palette.soft}" opacity="0.65"/>
    <circle cx="880" cy="1180" r="300" fill="${palette.sage}" opacity="0.18"/>
    <circle cx="870" cy="250" r="180" fill="${palette.accent}" opacity="0.08"/>
    <rect x="70" y="88" width="860" height="1324" rx="58" fill="#fffdf8" opacity="0.88" filter="url(#shadow)"/>
    <rect x="112" y="136" width="230" height="50" rx="25" fill="${palette.soft}"/>
    <text x="136" y="168" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${palette.deep}">${escapeXml(categoryLabel(pin.category))}</text>
    ${visualMotif(pin, palette)}
    <rect x="112" y="1010" width="250" height="16" rx="8" fill="${palette.accent}" opacity="0.72"/>
    ${textBlock(titleLines, 112, 420, 82, 92, palette.deep, 900)}
    ${textBlock(subtitleLines, 112, 710, 42, 52, palette.deep, 800)}
    ${textBlock(descriptionLines, 112, 1110, 30, 42, '#4f657b', 650)}
    <rect x="112" y="1258" width="360" height="64" rx="32" fill="${palette.accent}"/>
    <text x="148" y="1299" font-family="Arial, sans-serif" font-size="26" font-weight="850" fill="#ffffff">Ratgeber lesen</text>
    <text x="112" y="1380" font-family="Arial, sans-serif" font-size="25" font-weight="850" fill="${palette.sage}">BabyReiseHelfer</text>
    <text x="112" y="1424" font-family="Arial, sans-serif" font-size="22" font-weight="650" fill="#667789">${escapeXml(keyword)}</text>
  </svg>`;
}

async function ensurePostedLog() {
  const logFile = new URL('../marketing/pinterest/posted-log.json', import.meta.url);
  try {
    await fs.access(logFile);
  } catch {
    await fs.writeFile(logFile, `${JSON.stringify({ updatedAt: new Date().toISOString(), posts: [] }, null, 2)}\n`);
  }
}

async function main() {
  const data = await loadPins();
  await fs.mkdir(publicImagesDir, { recursive: true });
  await fs.mkdir(new URL('../marketing/pinterest/generated-images/', import.meta.url), { recursive: true });
  await ensurePostedLog();

  let generated = 0;
  let skipped = 0;

  for (const [index, pin] of data.pins.entries()) {
    if (generated >= imageLimit) break;

    const fileName = `${pin.id}.png`;
    const imagePath = `public/pinterest/generated-images/${fileName}`;
    const outputUrl = new URL(fileName, publicImagesDir);
    const outputPath = fileURLToPath(outputUrl);
    pin.imagePath = imagePath;
    pin.publicImageUrl = publicUrlFor(fileName);

    try {
      await fs.access(outputPath);
      if (!overwriteImages) {
        skipped += 1;
        continue;
      }
    } catch {
      // File does not exist yet.
    }

    const svg = buildSvg(pin, index);
    await sharp(Buffer.from(svg))
      .resize(1000, 1500, { fit: 'cover' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);

    generated += 1;
  }

  data.generatedAt = new Date().toISOString();
  data.siteUrl = publicSiteUrl;
  await fs.writeFile(pinsFile, `${JSON.stringify(data, null, 2)}\n`);

  console.log(`Pinterest-Bilder erzeugt: ${generated}`);
  console.log(`Pinterest-Bilder übersprungen: ${skipped}`);
  console.log(`Öffentlicher Ordner: ${publicImagesDir.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
