export interface Env {
  PINTEREST_DB: D1Database;
  PUBLIC_SITE_URL: string;
  PINTEREST_API_BASE_URL: string;
  ENABLE_PINTEREST_POSTING: string;
  PINTEREST_MAX_PINS_PER_CRON: string;
  PINTEREST_MAX_PINS_PER_DAY: string;
  PINTEREST_GRANTED_SCOPES: string;
  ALLOWED_IMAGE_HOSTS: string;
  PINTEREST_APP_ID?: string;
  PINTEREST_APP_SECRET?: string;
  PINTEREST_ACCESS_TOKEN?: string;
  PINTEREST_REFRESH_TOKEN?: string;
  PINTEREST_REDIRECT_URI?: string;
  PINTEREST_TOKEN_ENCRYPTION_KEY?: string;
}

export type ScheduledPinStatus = 'scheduled' | 'publishing' | 'published' | 'failed' | 'cancelled';
export type ConfirmationAction = 'create_pin' | 'schedule_pin' | 'update_scheduled_pin' | 'delete_scheduled_pin';

export type PinPayload = {
  boardId: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  altText?: string;
};

export type ScheduledPin = PinPayload & {
  id: string;
  scheduledAt: string;
  timezone: string;
  status: ScheduledPinStatus;
  pinterestPinId: string | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type PinterestTokenRecord = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  scopes: string[];
  updatedAt: string;
};

export type PinterestBoard = {
  id: string;
  name: string;
  description: string;
  privacy?: string;
};

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status = 400
  ) {
    super(message);
  }
}
