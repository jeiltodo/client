
import { client } from '@jeiltodo/ui/shared';
import { UserInfoResponse } from '../model/type';

export const userApi = {
  getUserInfo: async (): Promise<UserInfoResponse> => {
    try {
      const response = await client.get(`/member/info`);
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  }
} 
