import { client } from '../../../shared/model/client';
import { MemberQueryParams } from './type';

export const memberApi = {
  getMemberList: async (params: MemberQueryParams) => {
    try {
      const response = await client.get(`/member`, { params });
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },
};
