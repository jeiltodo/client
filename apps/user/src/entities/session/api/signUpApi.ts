import { client, ResponseWith } from '../../../shared';
import type { AuthBody, Token } from '../types';

export const signUpApi = async (
  signUpData: AuthBody
): Promise<ResponseWith<Token | null>> => {
  const response = await client.post('/member/signup', signUpData);
  return response.data;
};
