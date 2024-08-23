import { HOURS_WITH_MS, MINUTES_WITH_MS } from '../constants/time';

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const ACCESS_ADMIN_TOKEN_COOKIE_NAME = 'accessAdminToken';
export const REFRESH_ADMIN_TOKEN_COOKIE_NAME = 'refreshAdminToken';

// 만료 시간 (24시간 밀리 초로 표현)
export const ACCESS_TOKEN_EXPIRY_TIME = MINUTES_WITH_MS * 30;
export const REFRESH_TOKEN_EXPIRY_TIME = HOURS_WITH_MS;
