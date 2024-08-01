import client from '../../../shared/api/client';
import { MessageResponse, SignUpData, SignUpResponse } from '../types';

export const signUpApi = async (
  signUpData: SignUpData
): Promise<SignUpResponse | MessageResponse> => {
  const response = await client.post('/auth/user', signUpData);
  return response.data as SignUpResponse;
};
