import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outDir = path.join(root, 'public/pinterest/affiliate-july-2026');
const planFile = path.join(root, 'marketing/pinterest/affiliate-july-2026.json');

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function wrap(value, max = 24) {
  const words = value.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function extractTravelProducts(source) {
  const products = [];
  const objectPattern = /\{\s*id: '([^']+)',[\s\S]*?name: '([^']+)',[\s\S]*?shortDescription: '([^']+)',[\s\S]*?affiliateUrl: '(https:\/\/www\.amazon\.de\/[^']+)',[\s\S]*?affiliateStatus: 'ready',[\s\S]*?image: '([^']+)'/g;
  for (const match of source.matchAll(objectPattern)) {
    products.push({
      id: match[1],
      title: match[2],
      description: match[3],
      link: match[4],
      image: `public${match[5]}`,
      network: 'Amazon'
    });
  }
  const unique = [];
  const seen = new Set();
  for (const product of products) {
    const asin = product.link.match(/\/dp\/([^?]+)/)?.[1] ?? product.link;
    if (seen.has(asin)) continue;
    seen.add(asin);
    unique.push(product);
  }
  return unique.slice(0, 27);
}

function textSvg(pin, accent) {
  const titleLines = wrap(pin.title, 23);
  const title = titleLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`)
    .join('');
  const descLines = wrap(pin.description, 42).slice(0, 3);
  const description = descLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 43}">${escapeXml(line)}</tspan>`)
    .join('');
  return Buffer.from(`
    <svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
      <rect y="700" width="1000" height="800" rx="0" fill="#fffaf2"/>
      <rect x="72" y="752" width="250" height="48" rx="24" fill="${accent}"/>
      <text x="197" y="785" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff">WERBUNG · AFFILIATE</text>
      <text x="72" y="880" font-family="Arial, sans-serif" font-size="66" font-weight="800" fill="#243d43">${title}</text>
      <text x="72" y="${920 + titleLines.length * 82}" font-family="Arial, sans-serif" font-size="31" font-weight="400" fill="#627577">${description}</text>
      <rect x="72" y="1355" width="856" height="88" rx="44" fill="${accent}"/>
      <text x="500" y="1412" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">ANGEBOT ANSEHEN →</text>
      <text x="72" y="1480" font-family="Arial, sans-serif" font-size="18" fill="#627577">BabyReiseHelfer · Bei Kauf kann eine Provision entstehen.</text>
    </svg>`);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const source = await fs.readFile(path.join(root, 'src/data/travelProducts.ts'), 'utf8');
  const amazon = extractTravelProducts(source);
  if (amazon.length < 27) throw new Error(`Nur ${amazon.length} eindeutige Amazon-Produkte gefunden.`);

  const digistore = [
    {
      id: 'madeira-bus-pdf',
      title: 'Madeira ohne Mietwagen entdecken',
      description: 'PDF-Reiseführer für Ausflüge und Busverbindungen auf Madeira.',
      link: 'https://www.madeira-bus.com/pdf#aff=Benman8810',
      image: 'public/article-images/fallback-babyreise.webp',
      network: 'Digistore24'
    },
    {
      id: 'mallorca-mehr-als-urlaub',
      title: 'Mallorca: mehr als Urlaub',
      description: 'Digitaler Ratgeber mit zusätzlichen Ideen rund um Mallorca.',
      link: 'https://www.digistore24.com/redir/702242/Benman8810/',
      image: 'public/article-images/packliste-mallorca-mit-baby.webp',
      network: 'Digistore24'
    },
    {
      id: 'urlaub-zum-nulltarif',
      title: 'Mehr Sparideen für den Urlaub',
      description: 'Ein digitaler Ratgeber für preisbewusste Reiseplanung.',
      link: 'https://www.digistore24.com/redir/40363/Benman8810/',
      image: 'public/category-images/packlisten.webp',
      network: 'Digistore24'
    }
  ];

  const pins = [...amazon, ...digistore];
  const accents = ['#ef805f', '#5d9dbd', '#7e9e72'];
  const plan = [];
  for (const [index, pin] of pins.entries()) {
    const number = String(index + 1).padStart(2, '0');
    const file = `${number}-${pin.id}.jpg`;
    const image = await sharp(path.join(root, pin.image))
      .resize(1000, 700, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 88 })
      .toBuffer();
    await sharp({
      create: { width: 1000, height: 1500, channels: 3, background: '#fbf4e8' }
    })
      .composite([
        { input: image, top: 0, left: 0 },
        { input: textSvg(pin, accents[index % accents.length]), top: 0, left: 0 }
      ])
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outDir, file));

    plan.push({
      number: index + 1,
      file,
      title: pin.title,
      description: `Werbung | Affiliate-Link: ${pin.description} Wenn du über den Link kaufst, kann ich eine Provision erhalten. #UrlaubMitBaby #Familienurlaub #Reisehelfer`,
      link: pin.link,
      network: pin.network,
      board: 'Urlaub mit Baby',
      boardId: '1130614750143934790'
    });
  }
  await fs.mkdir(path.dirname(planFile), { recursive: true });
  await fs.writeFile(planFile, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`Pinterest-Pins erstellt: ${plan.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
