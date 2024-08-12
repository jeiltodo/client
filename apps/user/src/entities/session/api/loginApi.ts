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

    if (accessToken) {
      setCookie('accessToken', accessToken);
    }

    if (refreshToken) {
      setCookie('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
