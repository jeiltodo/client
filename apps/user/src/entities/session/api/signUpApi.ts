import type { AuthBody, Token } from '@jeiltodo/ui/entities'
import type { ResponseWith } from '../../../shared';
import { client } from '../../../shared';

export const signUpApi = async (
  signUpData: AuthBody
): Promise<ResponseWith<Token | null>> => {
  const response = await client.post('/member/signup', signUpData);
  return response.data;
};
