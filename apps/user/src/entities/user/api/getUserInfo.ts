import { client } from '../../../shared';
import { UserInfoResponse } from '../model/type';

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await client.get(`/member/info`);
    return response.data;
  } catch (error) {
    console.error('Fail fetch userInfo:', error);
    throw error;
  }
};
