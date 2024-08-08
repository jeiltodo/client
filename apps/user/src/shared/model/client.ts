import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { deleteCookie, getCookie } from '../lib/cookie';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../config/token';

// 에러 응답 데이터 타입 정의
interface ErrorResponseData {
  path?: string;
  [key: string]: any; // 다른 임의의 속성을 허용
}

const API_URL = 'https://api.jtodo.site/'; // - 실제 server url

// Axios 인스턴스 생성
export const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const noSessionRequired = ['/auth/login', '/auth/user'];
    if (noSessionRequired.includes(config.url ?? '')) {
      return config;
    }

    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    if (!accessToken) {
      window.location.href = '/login';
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
      error.response?.status === 500 ||
      error.response?.status === 404 ||
      (error.response?.status === 401 &&
        ((error.config && error.config.url === '/auth/login') ||
          (error.config && error.config.url === '/auth/user')))
    )
      return Promise.resolve(error.response);

    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest._retry 플래그를 사용하여 이미 리프레시 토큰 요청을 시도했는지 확인 -> 무한 루프 방지
      originalRequest._retry = true;

      // 쿠키에서 리프레시 토큰 가져오기
      const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_NAME);
      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await newAccessToken();

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패 시 쿠키 삭제 및 로그인 페이지로 이동
        deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
        window.location.href = '/login';
        return refreshError;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * ////////////////////////////////////////////////////////////
 */

const newAccessToken = async () => {
  try {
    const response = await client.get<{ accessToken: string }>(
      '/api/auth/tokens'
    );
    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};
