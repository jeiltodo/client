import { client } from '../../../shared';

interface Props {
  msg: string;
  code: number;
  data: {
    is_duplicated: boolean;
  };
}

export const EmailDuplicateApi = async (email: string) => {
  const response = await client.get<Props>(
    `/member/email/duplicate?email=${email}`
  );
  return response.data;
};
