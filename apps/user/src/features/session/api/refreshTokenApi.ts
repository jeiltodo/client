import client from '../../../shared/api/client';
import { ApiResponse, LoginCredentials } from '../model/sessionService';

export const refreshTokenApi = async () => {
  try {
    const response: ApiResponse = await client.post('/refresh');

    return response;
  } catch (error) {
    console.error('Login API call failed:', error);
    throw error;
  }
};
