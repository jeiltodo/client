
import { client } from '@jeiltodo/ui/shared';
import type { UserInfoResponse } from '../model/type';

export const userApi = {
  getUserInfo: async (): Promise<UserInfoResponse> => {
    try {
      const response = await client.get(`/member/info`, {
        headers: { 'X-Admin-Request': 'true' }
      });
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  }
} 
