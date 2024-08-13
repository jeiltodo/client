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
<<<<<<< HEAD

    if (accessToken) {
=======
    if (accessToken && refreshToken) {

>>>>>>> 27e2747 (#43 feat: sidebar prefetching 세팅)
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
    }
<<<<<<< HEAD

    if (refreshToken) {
      setCookie('refreshToken', refreshToken);
    }

    return response.data;
=======
>>>>>>> 27e2747 (#43 feat: sidebar prefetching 세팅)
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
