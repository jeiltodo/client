interface CookieOptions {
  maxAge?: number;
  expires?: number;
}

const isBrowser = typeof window !== 'undefined';

/**
 * 쿠키를 저장하는 함수
 * @example
 * setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, { maxAge: ACCESS_TOKEN_EXPIRY_TIME });
 */
export const setCookie = (
  key: string,
  value: string,
  options?: CookieOptions
) => {
  if (!isBrowser) return;
  const cookie = [
    `${key}=${value}`,
    options?.maxAge ? `max-age=${options.maxAge}` : undefined,
    options?.expires ? `expires=${options.expires}` : undefined,
  ]
    .filter(Boolean)
    .join('; ');
  document.cookie = cookie;
};

// 쿠키 가져오기
export const getCookie = (key: string) => {
  if (!isBrowser) return;
  // 쿠키 이름과 일치하는 부분을 찾기 위한 정규식 생성
  const regex = new RegExp(
    `(?:^|; )${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`
  );

  // document.cookie에서 정규식을 사용하여 쿠키 값을 추출
  const match = document.cookie.match(regex);

  // 일치하는 값이 있으면 해당 값을 반환하고, 없으면 null 반환
  return match ? decodeURIComponent(match[1]) : null;
};

export const deleteCookie = (key: string) => {
  if (!isBrowser) return;
  setCookie(key, '', { maxAge: -1 });
};
