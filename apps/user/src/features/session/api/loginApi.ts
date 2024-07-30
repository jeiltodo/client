import client from '../../../shared/api/client';
import { ApiResponse, LoginCredentials } from '../model/sessionService';

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response: ApiResponse = await client.post('/login', credentials);

    return response;
  } catch (error) {
    console.error('Login API call failed:', error);
    throw error;
  }
};
