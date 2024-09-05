import { client, type ResponseWith } from '@jeiltodo/ui/shared';

export const EmailDuplicateApi = async (email: string) => {
  const response = await client.get<
    ResponseWith<{
      duplicated: boolean;
    }>
  >(`/member/email/duplicate?email=${email}`);
  return response.data;
};

export const NicknameDuplicateApi = async (nickname: string) => {
  const response = await client.get<
    ResponseWith<{
      duplicated: boolean;
    }>
  >(`/member/nickname/duplicate?nickname=${nickname}`);
  return response.data;
};
