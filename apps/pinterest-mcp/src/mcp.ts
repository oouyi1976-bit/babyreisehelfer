import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { hasScope, safeErrorMessage } from './config.js';
import { listPinterestBoards, createPinterestPin, postingReadiness } from './pinterest.js';
import {
  cancelScheduledPin,
  consumeConfirmationIntent,
  createConfirmationIntent,
  getScheduledPin,
  hasRecordedPublication,
  insertScheduledPin,
  listScheduledPins,
  recordPublicationFingerprint,
  recordPublishAttempt,
  updateScheduledPin,
  type SchedulePayload
} from './repository.js';
import { AppError, type ConfirmationAction, type Env, type PinPayload, type ScheduledPinStatus } from './types.js';
import { validatePinPayload } from './validation.js';

const pinInput = {
  board_id: z.string().trim().min(1).max(128),
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(800),
  link: z.string().url(),
  image_url: z.string().url(),
  alt_text: z.string().trim().min(1).max(500).optional()
};

const confirmationInput = {
  confirmation_token: z.string().uuid().optional()
};

function textResult(text: string, structuredContent: Record<string, unknown>, isError = false) {
  return {
    isError,
    structuredContent,
    content: [{ type: 'text' as const, text }]
  };
}

function publicError(error: unknown) {
  if (error instanceof AppError) return error;
  return new AppError(safeErrorMessage(error), 'unexpected_error', 500);
}

function toPinPayload(input: z.infer<z.ZodObject<typeof pinInput>>): PinPayload {
  return {
    boardId: input.board_id,
    title: input.title,
    description: input.description,
    link: input.link,
    imageUrl: input.image_url,
    altText: input.alt_text
  };
}

function scheduleAt(value: string, timezone: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp) || timestamp <= Date.now() + 60_000) {
    throw new AppError('scheduled_at muss mindestens eine Minute in der Zukunft liegen.', 'scheduled_at_invalid');
  }
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date(timestamp));
  } catch {
    throw new AppError('timezone muss eine gültige IANA-Zeitzone sein, zum Beispiel Europe/Berlin.', 'timezone_invalid');
  }
  return new Date(timestamp).toISOString();
}

async function preparedPin(env: Env, payload: PinPayload) {
  const validated = await validatePinPayload(env, payload);
  return {
    boardId: validated.boardId,
    title: validated.title,
    description: validated.description,
    link: validated.link,
    imageUrl: validated.imageUrl,
    altText: validated.altText,
    image: validated.image
  };
}

async function previewOrConfirm<T extends object>(
  env: Env,
  action: ConfirmationAction,
  confirmationToken: string | undefined,
  payload: T,
  summary: string
) {
  if (!confirmationToken) {
    const confirmation = await createConfirmationIntent(env.PINTEREST_DB, action, payload);
    return textResult(
      `${summary}\n\nNoch nicht ausgeführt. Bitte fasse Board, Titel, Ziel-Link und Bild zusammen und bitte um eine ausdrückliche Bestätigung. Danach den gleichen Tool-Aufruf mit confirmation_token wiederholen.`,
      {
        status: 'confirmation_required',
        action,
        confirmation_token: confirmation.id,
        confirmation_expires_at: confirmation.expiresAt,
        preview: payload
      }
    );
  }

  const confirmed = await consumeConfirmationIntent<T>(env.PINTEREST_DB, confirmationToken, action);
  return confirmed;
}

export function createPinterestMcpServer(env: Env) {
  const server = new McpServer(
    { name: 'babyreisehelfer-pinterest', version: '0.1.0' },
    {
      instructions:
        'Nutze Pinterest ausschließlich für BabyReiseHelfer-Ratgeberseiten. Keine Amazon-Links. pinterest_create_pin und alle Terminänderungen benötigen immer eine ausdrückliche Nutzerbestätigung über confirmation_token. Bei ENABLE_PINTEREST_POSTING=false niemals Erfolg für eine Veröffentlichung behaupten.'
    }
  );

  server.registerTool(
    'pinterest_list_boards',
    {
      title: 'Pinterest-Boards auflisten',
      description: 'Use this when the user wants to see the connected öffentlichen Pinterest-Boards and their Board-IDs before planning or publishing a Pin.',
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
    },
    async () => {
      try {
        if (!hasScope(env, 'boards:read')) {
          throw new AppError('boards:read fehlt. Bitte OAuth mit dieser Berechtigung erneut verbinden.', 'boards_read_scope_missing', 403);
        }
        const boards = await listPinterestBoards(env);
        return textResult(`Pinterest-Boards gefunden: ${boards.length}`, { status: 'ok', boards });
      } catch (error) {
        const failure = publicError(error);
        return textResult(`Boards konnten nicht geladen werden: ${failure.message}`, { status: 'error', code: failure.code }, true);
      }
    }
  );

  server.registerTool(
    'pinterest_create_pin',
    {
      title: 'Pinterest-Pin veröffentlichen',
      description:
        'Use this when the user explicitly wants to publish one Pin immediately. The first call only validates and previews Board, title, link and image. Only call again with confirmation_token after the user has explicitly approved publication.',
      inputSchema: { ...pinInput, ...confirmationInput },
      annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true }
    },
    async (input) => {
      try {
        const initial = await preparedPin(env, toPinPayload(input));
        const resolution = await previewOrConfirm(env, 'create_pin', input.confirmation_token, initial, `Pin-Vorschau: ${initial.title}`);
        if ('content' in resolution) return resolution;

        const readiness = postingReadiness(env);
        if (!readiness.ready) {
          return textResult(readiness.reason, { status: 'blocked', reason: readiness.reason, preview: resolution }, true);
        }
        if (await hasRecordedPublication(env.PINTEREST_DB, resolution)) {
          throw new AppError('Dieser Pin wurde bereits veröffentlicht und wird nicht doppelt gesendet.', 'duplicate_pin');
        }
        const created = await createPinterestPin(env, resolution);
        await recordPublicationFingerprint(env.PINTEREST_DB, resolution, created.id, 'immediate_publish');
        await recordPublishAttempt(env.PINTEREST_DB, {
          pinterestPinId: created.id,
          action: 'immediate_publish',
          status: 'published'
        });
        return textResult(`Pin wurde veröffentlicht: ${created.url}`, { status: 'published', pin_id: created.id, pinterest_url: created.url });
      } catch (error) {
        const failure = publicError(error);
        return textResult(`Pin wurde nicht veröffentlicht: ${failure.message}`, { status: 'error', code: failure.code }, true);
      }
    }
  );

  server.registerTool(
    'pinterest_schedule_pin',
    {
      title: 'Pinterest-Pin einplanen',
      description:
        'Use this when the user wants to place one Pin in the BabyReiseHelfer queue for later publication. The first call only previews the scheduled Pin. Only call again with confirmation_token after the user confirms the Board, text, image, target link and time.',
      inputSchema: {
        ...pinInput,
        scheduled_at: z.string().datetime({ offset: true }),
        timezone: z.string().trim().min(1).max(100),
        ...confirmationInput
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false }
    },
    async (input) => {
      try {
        const pin = await preparedPin(env, toPinPayload(input));
        const payload: SchedulePayload = {
          ...pin,
          scheduledAt: scheduleAt(input.scheduled_at, input.timezone),
          timezone: input.timezone
        };
        const resolution = await previewOrConfirm(
          env,
          'schedule_pin',
          input.confirmation_token,
          payload,
          `Planungs-Vorschau: ${payload.title} für ${payload.scheduledAt} (${payload.timezone})`
        );
        if ('content' in resolution) return resolution;
        const scheduled = await insertScheduledPin(env.PINTEREST_DB, resolution);
        return textResult('Pin wurde bestätigt und in die Warteschlange aufgenommen. Er wird erst veröffentlicht, wenn ENABLE_PINTEREST_POSTING=true und pins:write verfügbar sind.', {
          status: 'scheduled',
          pin: scheduled,
          posting_readiness: postingReadiness(env)
        });
      } catch (error) {
        const failure = publicError(error);
        return textResult(`Pin wurde nicht eingeplant: ${failure.message}`, { status: 'error', code: failure.code }, true);
      }
    }
  );

  server.registerTool(
    'pinterest_list_scheduled_pins',
    {
      title: 'Geplante Pinterest-Pins anzeigen',
      description: 'Use this when the user wants to inspect scheduled, published, failed or cancelled BabyReiseHelfer Pins in the queue.',
      inputSchema: {
        status: z.enum(['scheduled', 'publishing', 'published', 'failed', 'cancelled']).optional(),
        limit: z.number().int().min(1).max(100).default(50)
      },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
    },
    async ({ status, limit }) => {
      const pins = await listScheduledPins(env.PINTEREST_DB, status as ScheduledPinStatus | undefined, limit);
      return textResult(`Queue-Einträge: ${pins.length}`, { status: 'ok', pins });
    }
  );

  server.registerTool(
    'pinterest_update_scheduled_pin',
    {
      title: 'Geplanten Pinterest-Pin ändern',
      description:
        'Use this when the user wants to change a still scheduled Pin. The first call produces a full preview of the edited Pin. Only call again with confirmation_token after explicit user approval.',
      inputSchema: {
        scheduled_pin_id: z.string().uuid(),
        board_id: z.string().trim().min(1).max(128).optional(),
        title: z.string().trim().min(1).max(100).optional(),
        description: z.string().trim().min(1).max(800).optional(),
        link: z.string().url().optional(),
        image_url: z.string().url().optional(),
        alt_text: z.string().trim().min(1).max(500).nullable().optional(),
        scheduled_at: z.string().datetime({ offset: true }).optional(),
        timezone: z.string().trim().min(1).max(100).optional(),
        ...confirmationInput
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false }
    },
    async (input) => {
      try {
        const existing = await getScheduledPin(env.PINTEREST_DB, input.scheduled_pin_id);
        if (!existing || existing.status !== 'scheduled') {
          throw new AppError('Der geplante Pin existiert nicht oder kann nicht mehr geändert werden.', 'scheduled_pin_not_editable');
        }

        const raw: PinPayload = {
          boardId: input.board_id ?? existing.boardId,
          title: input.title ?? existing.title,
          description: input.description ?? existing.description,
          link: input.link ?? existing.link,
          imageUrl: input.image_url ?? existing.imageUrl,
          altText: input.alt_text === null ? undefined : input.alt_text ?? existing.altText
        };
        const pin = await preparedPin(env, raw);
        const timezone = input.timezone ?? existing.timezone;
        const payload: SchedulePayload & { scheduledPinId: string } = {
          ...pin,
          scheduledAt: scheduleAt(input.scheduled_at ?? existing.scheduledAt, timezone),
          timezone,
          scheduledPinId: existing.id
        };
        const resolution = await previewOrConfirm(
          env,
          'update_scheduled_pin',
          input.confirmation_token,
          payload,
          `Änderungs-Vorschau für ${existing.id}: ${payload.title}`
        );
        if ('content' in resolution) return resolution;
        const updated = await updateScheduledPin(env.PINTEREST_DB, resolution.scheduledPinId, resolution);
        return textResult('Geplanter Pin wurde aktualisiert.', { status: 'scheduled', pin: updated });
      } catch (error) {
        const failure = publicError(error);
        return textResult(`Geplanter Pin wurde nicht geändert: ${failure.message}`, { status: 'error', code: failure.code }, true);
      }
    }
  );

  server.registerTool(
    'pinterest_delete_scheduled_pin',
    {
      title: 'Geplanten Pinterest-Pin löschen',
      description:
        'Use this when the user wants to remove one still scheduled Pin from the queue. The first call only asks for confirmation. Only call again with confirmation_token after explicit user approval.',
      inputSchema: { scheduled_pin_id: z.string().uuid(), ...confirmationInput },
      annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false }
    },
    async ({ scheduled_pin_id, confirmation_token }) => {
      try {
        const existing = await getScheduledPin(env.PINTEREST_DB, scheduled_pin_id);
        if (!existing || existing.status !== 'scheduled') {
          throw new AppError('Nur noch nicht veröffentlichte Pins können aus der Warteschlange entfernt werden.', 'scheduled_pin_not_cancellable');
        }
        const resolution = await previewOrConfirm(
          env,
          'delete_scheduled_pin',
          confirmation_token,
          { scheduledPinId: existing.id, title: existing.title, scheduledAt: existing.scheduledAt },
          `Lösch-Vorschau: ${existing.title} (${existing.scheduledAt})`
        );
        if ('content' in resolution) return resolution;
        const cancelled = await cancelScheduledPin(env.PINTEREST_DB, resolution.scheduledPinId);
        return textResult('Der geplante Pin wurde entfernt und wird nicht veröffentlicht.', { status: 'cancelled', pin: cancelled });
      } catch (error) {
        const failure = publicError(error);
        return textResult(`Geplanter Pin wurde nicht entfernt: ${failure.message}`, { status: 'error', code: failure.code }, true);
      }
    }
  );

  return server;
}
