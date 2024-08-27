import { client, ResponseWith } from '@jeiltodo/ui/shared';
import { Member, MemberDetail, MemberQueryParams } from './type';
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

  deleteMembers: async (memberIds: number[]) => {
    try {
      const response = await client.delete(`/admin/member/delete`, {
        data: { memberIds },
      });
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },

  getMemberDetail: async (memberId: number) => {
    try {
      const response = await client.get<ResponseWith<MemberDetail>>(
        `/admin/member/detail/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },

  updateMemberInfo: async (
    memberId: number,
    updated: Partial<{ nickname: string; email: string }>
  ) => {
    try {
      const response = await client.patch(
        `/admin/member/update/${memberId}`,
        updated
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },
};
