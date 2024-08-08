import { client } from '../../../shared';
import type { MessageResponse, SignUpData, SignUpResponse } from '../types';

export const signUpApi = async (
  signUpData: SignUpData
): Promise<SignUpResponse | MessageResponse> => {
  const response = await client.post('/auth/user', signUpData);
  return response.data as SignUpResponse;
};
