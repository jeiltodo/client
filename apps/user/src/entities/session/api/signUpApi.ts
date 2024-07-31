import { ApiResponse } from '../../../features/session';
import client from '../../../shared/api/client';
import { SignUpData } from '../types';

export const signUpApi = async (signUpData: SignUpData) => {
  try {
    const response: ApiResponse = await client.post('/auth/user', signUpData);

    return response;
  } catch (error) {
    console.error('Login API call failed:', error);
    throw error;
  }
};
