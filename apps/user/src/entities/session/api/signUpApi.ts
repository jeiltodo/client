import type { AuthBody, Token } from '@jeiltodo/ui/entities/user';
import { client } from '@jeiltodo/ui/shared';
import type { ResponseWith } from '../../../shared';

export const signUpApi = async (
  signUpData: AuthBody
): Promise<ResponseWith<Token>> => {
  const response = await client.post('/member/signup', signUpData);
  return response.data;
};
