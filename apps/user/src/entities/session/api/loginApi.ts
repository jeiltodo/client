import type { AxiosResponse } from 'axios';
import {
  type LoginCredentials,
  type LoginResponse,
  type MessageResponse,
} from '..';
import { client, setCookieTokens } from '../../../shared';

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AxiosResponse<LoginResponse | MessageResponse>> => {
  const response = await client.post('/auth/login', credentials);
  const authHeader = response.headers['authorization'];
  const accessToken = authHeader ? authHeader.split(' ')[1] : undefined;
  const refreshToken = response.data.user.refreshToken;
  if (accessToken) {
    setCookieTokens('accessToken', accessToken);
  }
  if (refreshToken) {
    setCookieTokens('refreshToken', refreshToken);
  }
  return response;
};
