import type { Token, LoginCredentials, Response } from '..';
import { client, setCookie } from '../../../shared';

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response = await client.post<Response<Token | null>>(
      '/member/signin',
      credentials
    );

    const accessToken = response.data.data?.access_token;
    const refreshToken = response.data.data?.refresh_token;
    if (accessToken && refreshToken) {

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
    }
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
