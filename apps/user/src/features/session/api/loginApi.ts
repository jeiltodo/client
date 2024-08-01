import { AxiosResponse } from 'axios';
import { MessageResponse } from '../../../entities/session/types';
import client from '../../../shared/api/client';
import { LoginCredentials, LoginResponse } from '../types';

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AxiosResponse<LoginResponse | MessageResponse>> => {
  const response = await client.post('/auth/login', credentials);
  return response.data;
};
