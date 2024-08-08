import type { AxiosResponse } from 'axios';
import {
  type LoginCredentials,
  type LoginResponse,
  type MessageResponse,
} from '..';
import { client } from '../../../shared';

export const loginApi = async (
  credentials: LoginCredentials
): Promise<AxiosResponse<LoginResponse | MessageResponse>> => {
  const response = await client.post('/auth/login', credentials);
  console.log('api response: ', response);
  return response;
};
