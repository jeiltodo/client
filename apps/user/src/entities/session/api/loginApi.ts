import type { Token, LoginCredentials, Response } from '..';
import { client, setCookie } from '../../../shared';

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response = await client.post<Response<Token | null>>(
      '/member/signin',
      credentials
    );

    const accessToken = response.data.data?.access_token;

    if (accessToken) {
      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      setCookie('accessToken', accessToken);
    }
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
