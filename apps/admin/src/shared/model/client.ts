import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { isServer } from '@tanstack/react-query';
import { getServerToken } from './getServerToken';
import { deleteCookie, getCookie, setCookie } from '@jeiltodo/ui/shared';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../../../../packages/ui/src/shared/config/token';
import { API_ADMIN_URL } from '../config/baseUrl';

interface ErrorResponseData {
  path?: string;
  [key: string]: string | undefined;
}

export const client: AxiosInstance = axios.create({
  baseURL: API_ADMIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!config.url) {
      throw new Error('API 요청에 URL이 누락되었습니다.');
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_NAME);
      if (!refreshToken) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        const response = await newAccessToken();

        setCookie(ACCESS_TOKEN_COOKIE_NAME, response.data.accessToken, {
          maxAge: ACCESS_TOKEN_EXPIRY_TIME,
        });

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        const errorToThrow =
          refreshError instanceof Error
            ? refreshError
            : new Error('An unknown error occurred during token refresh.');
        deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(errorToThrow);
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
    const response = await client.get<{ accessToken: string }>(
      '/member/token/refresh'
    );
    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};
