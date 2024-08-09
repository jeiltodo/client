import { client } from '../../../shared';
import type { Response, SignUpData, Token } from '../types';

export const signUpApi = async (
  signUpData: SignUpData
): Promise<Response<Token | null>> => {
  const response = await client.post('/member/signup', signUpData);
  return response.data;
};
