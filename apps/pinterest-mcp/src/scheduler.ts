import { numberSetting, safeErrorMessage } from './config.js';
import {
  claimDueScheduledPin,
  hasRecordedPublication,
  markScheduledPinFailed,
  markScheduledPinPublished,
  publishedCountForUtcDay,
  recordPublicationFingerprint,
  recordPublishAttempt
} from './repository.js';
import { createPinterestPin, postingReadiness } from './pinterest.js';
import { validatePinPayload } from './validation.js';
import type { Env } from './types.js';

export async function publishDuePins(env: Env) {
  const readiness = postingReadiness(env);
  if (!readiness.ready) {
    console.log(`Pinterest Cron übersprungen: ${readiness.reason}`);
    return { published: 0, failed: 0, skipped: readiness.reason };
  }

  const dailyLimit = numberSetting(env.PINTEREST_MAX_PINS_PER_DAY, 1);
  const runLimit = numberSetting(env.PINTEREST_MAX_PINS_PER_CRON, 1);
  const currentPublished = await publishedCountForUtcDay(env.PINTEREST_DB, new Date().toISOString());
  const available = Math.min(runLimit, Math.max(0, dailyLimit - currentPublished));
  let published = 0;
  let failed = 0;

  for (let index = 0; index < available; index += 1) {
    const pin = await claimDueScheduledPin(env.PINTEREST_DB, new Date().toISOString());
    if (!pin) break;

    try {
      await validatePinPayload(env, pin);
      if (await hasRecordedPublication(env.PINTEREST_DB, pin)) {
        throw new Error('Dieser Pin wurde bereits veröffentlicht und wird nicht doppelt gesendet.');
      }
      const created = await createPinterestPin(env, pin);
      await markScheduledPinPublished(env.PINTEREST_DB, pin.id, created.id);
      await recordPublicationFingerprint(env.PINTEREST_DB, pin, created.id, 'scheduled_publish');
      await recordPublishAttempt(env.PINTEREST_DB, {
        scheduledPinId: pin.id,
        pinterestPinId: created.id,
        action: 'scheduled_publish',
        status: 'published'
      });
      published += 1;
    } catch (error) {
      const message = safeErrorMessage(error);
      await markScheduledPinFailed(env.PINTEREST_DB, pin.id, message);
      await recordPublishAttempt(env.PINTEREST_DB, {
        scheduledPinId: pin.id,
        action: 'scheduled_publish',
        status: 'failed',
        errorMessage: message
      });
      console.warn(`Pinterest-Pin ${pin.id} fehlgeschlagen: ${message}`);
      failed += 1;
    }
  }

  return { published, failed, skipped: '' };
}
