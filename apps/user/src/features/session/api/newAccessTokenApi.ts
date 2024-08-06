import client from '../../../shared/api/client';
import { SessionApiResponse } from '../types';

export const newAccessTokenApi = async () => {
  try {
    const response: SessionApiResponse = await client.get('/api/auth/tokens');

    return response;
  } catch (error) {
    throw error;
  }
};
