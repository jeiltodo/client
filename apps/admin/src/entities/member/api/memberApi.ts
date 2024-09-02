import type { ResponseWith } from '@jeiltodo/ui/shared';
import { client } from '@jeiltodo/ui/shared';
import type { ResponsePageListWith } from '../../../shared/model/type';
import type { Member, MemberDetail, MemberQueryParams } from './type';

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
