import { MINUTES_WITH_MS, WEEK_WITH_MS } from '../constants/time';

export const ACCESS_TOKEN_COOKIE_NAME = 'at';
export const REFRESH_TOKEN_COOKIE_NAME = 'rt';

// 만료 시간 (24시간 밀리 초로 표현)
export const ACCESS_TOKEN_EXPIRY_TIME = MINUTES_WITH_MS * 5;
export const REFRESH_TOKEN_EXPIRY_TIME = WEEK_WITH_MS;
