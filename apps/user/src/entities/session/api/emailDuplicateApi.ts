import { client } from '../../../shared';
import { Response } from '../types';

export const EmailDuplicateApi = async (email: string) => {
  const response = await client.get<Response<{ is_duplicated: boolean }>>(
    `/member/email/duplicate?email=${email}`
  );
  return response.data;
};
