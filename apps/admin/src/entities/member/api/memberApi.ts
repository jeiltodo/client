import { client } from '@jeiltodo/ui/shared';
import { Member, MemberQueryParams } from './type';
import { ResponsePageListWith } from '../../../shared/model/type';

export const memberApi = {
  getMemberList: async (params: MemberQueryParams) => {
    try {
      const response = await client.get<
        ResponsePageListWith<{ searchedCount: number; members: Member[] }>
      >(`/admin/member`, { params });
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },
};
