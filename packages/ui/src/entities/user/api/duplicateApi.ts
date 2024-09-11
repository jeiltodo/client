import { client } from '../../../shared';

interface MemberProps {
  msg: string;
  code: number;
  data: {
    duplicated: boolean;
  };
}

export const EmailDuplicateApi = async (email: string) => {
  const response = await client.get<MemberProps>(
    `/member/email/duplicate?email=${email}`
  );
  return response.data;
};

export const NicknameDuplicateApi = async (nickname: string) => {
  const response = await client.get<MemberProps>(
    `/member/nickname/duplicate?nickname=${nickname}`
  );
  return response.data;
};
