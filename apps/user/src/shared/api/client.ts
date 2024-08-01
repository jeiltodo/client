import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { sessionService } from '../../features/session';

// 에러 응답 데이터 타입 정의
interface ErrorResponseData {
  path?: string;
  [key: string]: any; // 다른 임의의 속성을 허용
}

const API_URL = 'http://52.78.126.130:8080/api'; // - Ec2 Server url 실제 API 주소로 변경해야 함

// Token management functions - 파일 분리해서 accessToken 상태관리 라이브러리 추가?
let accessToken: string | null = null;

// 토큰 저장하기
export const setCookieTokens = (cookieName: string, token: string) => {
  accessToken = token; // 메모리에 저장
  const TOKEN_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
  const REFRESH_TOKEN_EXPIRY_TIME = 24 * 3600 * 1000 * 7;

  // 쿠키에 저장 (HTTP-only 쿠키는 서버 측에서 설정해야 함)
  document.cookie = `${cookieName}=${token}; path=/; max-age=${cookieName === 'accessToken' ? TOKEN_EXPIRY_TIME : REFRESH_TOKEN_EXPIRY_TIME}; SameSite=Strict; Secure`;
};

// 액세스 토큰 가져오기
export const getAccessToken = () => {
  // 메모리에서 먼저 확인
  if (accessToken) return accessToken;

  const cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (cookieToken) {
    accessToken = cookieToken;
    return cookieToken;
  }

  return null;
};

export const deleteCookieToken = () => {
  accessToken = null;
  document.cookie = 'accessToken=; path=/; max-age=0';
  document.cookie = 'refreshToken=; path=/; max-age=0';
};

// Axios 인스턴스 생성
const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const noSessionRequired = ['/auth/login', '/auth/user'];
    if (noSessionRequired.includes(config.url ?? '')) {
      return config;
    }

    accessToken = getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      window.location.href = '/login';
      return Promise.reject('No access token available');
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    // 이메일 validation, 로그인
    if (error.response?.status === 400 || error.response?.status === 409)
      return Promise.resolve(error.response);

    // 500 또는 404 응답이 특정 경로에서 온 경우 그대로 반환
    if (
      (error.response?.status === 500 ||
        error.response?.status === 404 ||
        error.response?.status === 401) &&
      (error.response?.data?.path === '/api/auth/user' ||
        error.response?.data?.path === '/api/auth/login')
    )
      return Promise.resolve(error.response);

    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest._retry 플래그를 사용하여 이미 리프레시 토큰 요청을 시도했는지 확인 -> 무한 루프 방지
      originalRequest._retry = true;

      // 쿠키에서 리프레시 토큰 가져오기
      const refreshToken = getAccessToken();
      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await sessionService.newAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] =
            `Bearer ${response.data.accessToken}`;
        }
        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패 시 쿠키 삭제 및 로그인 페이지로 이동
        deleteCookieToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default client;