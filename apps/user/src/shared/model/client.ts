import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { isServer } from '@tanstack/react-query';
import { getServerToken } from './getServerToken';
import { deleteCookie, getCookie, setCookie } from '../lib/cookie';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../config/token';
import { API_URL } from '../config/api';

// 에러 응답 데이터 타입 정의
interface ErrorResponseData {
  path?: string;
  [key: string]: any; // 다른 임의의 속성을 허용
}

// Axios 인스턴스 생성
export const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!config.url) {
      throw new Error('API 요청에 URL이 누락되었습니다.'); // 오류 발생
    }

    const url = config.url;

    const noSessionRequired = [
      '/member/signin',
      '/member/signup',
      '/member/email/duplicate?email=',
    ];
    if (noSessionRequired.some((path) => url.startsWith(path))) {
      return config;
    }

    let accessToken: string | null | undefined;
    if (isServer) {
      accessToken = await getServerToken();
    } else {
      accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    }

    if (!accessToken) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(new Error('No access token found'));
    }
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
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

    //에러 메시지를 return 하기 위한 분기 처리
    // if (axios.isAxiosError(error) && error.response) {
    //   // 모든 에러 코드의 response를 반환
    //   return Promise.resolve(error.response);
    // }

    // access token 없이 요청 시 401 에러 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      // originalRequest._retry 플래그를 사용하여 이미 리프레시 토큰 요청을 시도했는지 확인 -> 무한 루프 방지
      originalRequest._retry = true;

      // 쿠키에서 리프레시 토큰 가져오기
      const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_NAME);
      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그인 페이지로 이동
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      // 리프레시 토큰이 있으면 새로운 access token 발급받아서 다시 요청
      try {
        const response = await newAccessToken();

        setCookie(ACCESS_TOKEN_COOKIE_NAME, response.data.access_token, {
          maxAge: ACCESS_TOKEN_EXPIRY_TIME,
        });

        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패 시 쿠키 삭제 및 로그인 페이지로 이동
        deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/*
 * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const newAccessToken = async () => {
  try {
    const response = await client.get<{ access_token: string }>(
      '/member/token/refresh'
    );
    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};
