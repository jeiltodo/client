import { AxiosResponse } from 'axios';
import client, {
  deleteCookieToken,
  setCookieTokens,
} from '../../../shared/api/client';
import {
  loginApi,
  logoutApi,
  newAccessTokenApi,
  SessionApiResponse,
  LoginCredentials,
} from '../../session';
import { LoginResponse } from '../types';
import {
  MessageResponse,
  SignUpData,
  SignUpResponse,
} from '../../../entities/session/types';
import { signUpApi } from '../../../entities/session/model';
// 타입 가드 함수 정의
function isLoginResponse(response: any): response is LoginResponse {
  return response && response.data && response.data.user;
}
function isSignUpResponse(response: any): response is SignUpResponse {
  return response && (response as SignUpResponse).id !== undefined;
}

export const sessionService = {
  signUp: async (
    signUpData: SignUpData
  ): Promise<SignUpResponse | MessageResponse | undefined> => {
    try {
      const response = await signUpApi(signUpData);

      if (
        'status' in response &&
        response.status === 200 &&
        isSignUpResponse(response)
      ) {
        // 성공적인 응답 처리
        return response as SignUpResponse;
      } else if (
        'status' in response &&
        (response.status === 400 || response.status === 409)
      ) {
        // 실패한 응답 처리
        return response as MessageResponse;
      }
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },
  login: async (credentials: LoginCredentials) => {
    try {
      // API 호출
      const response: AxiosResponse<LoginResponse | MessageResponse> =
        await loginApi(credentials);

      // 성공적인 응답 처리
      if (isLoginResponse(response.data)) {
        const authHeader = response.headers['authorization'];
        const accessToken = authHeader ? authHeader.split(' ')[1] : undefined;
        const refreshToken = response.data.data.user.refreshToken;

        // 성공적인 응답의 경우 토큰을 저장
        if (accessToken) {
          setCookieTokens('accessToken', accessToken);
        }
        if (refreshToken) {
          setCookieTokens('refreshToken', refreshToken);
        }

        return response.data;
      } else {
        // 실패한 응답 처리
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response: AxiosResponse<LoginResponse | MessageResponse> =
        await logoutApi();

      if (response.status === 200 || response.status === 204) {
        deleteCookieToken();

        delete client.defaults.headers.common['Authorization'];
        window.location.href = '/login';

        return true;
      } else {
        console.error('Unexpected response status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  },

  newAccessToken: async () => {
    try {
      const response = await newAccessTokenApi();

      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
};
