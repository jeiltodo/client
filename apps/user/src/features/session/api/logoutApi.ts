import client from '../../../shared/api/client';
import { ApiResponse } from '../model/sessionService';

export const logoutApi = async () => {
  try {
    const response: ApiResponse = await client.post('/logout');

    return response;
  } catch (error) {
    console.error('Logout API call failed:', error);
    throw error;
  }
};
