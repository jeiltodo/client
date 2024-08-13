import axios from 'axios';
import { client, ResponseWith, setCookie } from '../../../shared';
import { AuthBody, Token } from '../types';

export const loginApi = async (credentials: AuthBody) => {
  try {
    const response = await client.post<ResponseWith<Token | null>>(
      '/member/signin',
      credentials
    );

    const accessToken = response.data.data?.access_token;
    const refreshToken = response.data.data?.refresh_token;

    if (accessToken && refreshToken) {
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
    }
    return Promise.resolve(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Promise.resolve(error.response.data); // 오류를 포함한 응답 반환
      }
    }
    return Promise.reject(error); // 네트워크 오류 등 처리할 수 없는 오류는 reject
  }
};
