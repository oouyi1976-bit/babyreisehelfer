import { allowedImageHosts, siteUrl } from './config.js';
import { AppError, type Env, type PinPayload } from './types.js';

type ImageDetails = {
  url: string;
  contentType: string;
  width: number | null;
  height: number | null;
};

function urlFromInput(value: string, base: string) {
  try {
    return new URL(value, base);
  } catch {
    throw new AppError('Die URL ist ungültig.', 'invalid_url');
  }
}

function imageDimensions(bytes: Uint8Array, contentType: string) {
  if (contentType.includes('png') && bytes.length >= 24) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }

  if (contentType.includes('jpeg') || contentType.includes('jpg')) {
    let index = 2;
    while (index + 9 < bytes.length) {
      if (bytes[index] !== 0xff) {
        index += 1;
        continue;
      }
      const marker = bytes[index + 1];
      const size = (bytes[index + 2] << 8) + bytes[index + 3];
      if (marker >= 0xc0 && marker <= 0xc3 && index + 8 < bytes.length) {
        return { width: (bytes[index + 7] << 8) + bytes[index + 8], height: (bytes[index + 5] << 8) + bytes[index + 6] };
      }
      index += Math.max(size + 2, 2);
    }
  }

  if (contentType.includes('webp') && bytes.length >= 30) {
    const fourCc = new TextDecoder().decode(bytes.slice(12, 16));
    if (fourCc === 'VP8X') {
      const width = 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16);
      const height = 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16);
      return { width, height };
    }
  }

  return null;
}

export function normalizeInternalLink(env: Env, value: string) {
  const url = urlFromInput(value, siteUrl(env));
  const expected = new URL(siteUrl(env));

  if (url.protocol !== 'https:' || url.origin !== expected.origin) {
    throw new AppError('Pins dürfen nur auf eine HTTPS-Seite von BabyReiseHelfer verlinken.', 'link_not_internal');
  }

  if (/amazon\.|tag=epic05e-21/i.test(url.href)) {
    throw new AppError('Direkte Amazon-Affiliate-Links sind als Pinterest-Ziel nicht erlaubt.', 'direct_amazon_link');
  }

  return url.toString();
}

export function normalizeImageUrl(env: Env, value: string) {
  const url = urlFromInput(value, siteUrl(env));
  if (url.protocol !== 'https:' || !allowedImageHosts(env).has(url.hostname.toLowerCase())) {
    throw new AppError('Das Pin-Bild muss als öffentliche HTTPS-Datei vom erlaubten BabyReiseHelfer-Bildhost vorliegen.', 'image_host_not_allowed');
  }
  return url.toString();
}

export async function validatePublicLink(env: Env, value: string) {
  const url = normalizeInternalLink(env, value);
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    headers: { Accept: 'text/html,application/xhtml+xml' }
  });
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok || !contentType.includes('text/html')) {
    throw new AppError('Die Ziel-URL muss öffentlich Status 200 und eine HTML-Seite liefern.', 'target_url_unavailable');
  }
  return url;
}

export async function validatePublicImage(env: Env, value: string): Promise<ImageDetails> {
  const url = normalizeImageUrl(env, value);
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    headers: { Accept: 'image/avif,image/webp,image/png,image/jpeg', Range: 'bytes=0-65535' }
  });
  const contentType = (response.headers.get('content-type') || '').toLowerCase();

  if (!response.ok || !contentType.startsWith('image/')) {
    throw new AppError('Die Bild-URL muss öffentlich Status 200 und einen Bild-Content-Type liefern.', 'image_unavailable');
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const dimensions = imageDimensions(bytes, contentType);
  if (dimensions && (dimensions.width < 600 || dimensions.height < 900)) {
    throw new AppError('Pinterest-Bilder sollten mindestens 600 × 900 Pixel groß sein.', 'image_too_small');
  }

  return { url, contentType, width: dimensions?.width ?? null, height: dimensions?.height ?? null };
}

export async function validatePinPayload(env: Env, input: PinPayload) {
  const [link, image] = await Promise.all([
    validatePublicLink(env, input.link),
    validatePublicImage(env, input.imageUrl)
  ]);

  return {
    ...input,
    link,
    imageUrl: image.url,
    image
  };
}
