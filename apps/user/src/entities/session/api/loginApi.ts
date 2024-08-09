import type { AxiosResponse } from 'axios';
import { Token, type LoginCredentials, type Response } from '..';
import { client, setCookie } from '../../../shared';

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response = await client.post<Response<Token | null>>(
      '/member/signin',
      credentials
    );

    const accessToken = response.data.data?.access_token;
    if (accessToken) {
      setCookie('accessToken', accessToken);
    }
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
