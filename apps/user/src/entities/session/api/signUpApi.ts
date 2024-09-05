import type { AuthBody, Token } from '@jeiltodo/ui/entities';
import { client } from '@jeiltodo/ui/shared';
import type { ResponseWith } from '../../../shared';

export const signUpApi = async (
  signUpData: AuthBody
): Promise<ResponseWith<Token | null>> => {
  const response = await client.post('/member/signup', signUpData);
  return response.data;
};
