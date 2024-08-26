import { client, ResponseWith } from '../../../shared';
import { GroupCode, GroupTitleOrCode } from '../model/type';

export const groupApi = {
  reissueGroupoCode: async (id: number) => {
    try {
      const response = await client.get<ResponseWith<GroupCode>>(
        `/groups/code/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },

  updateGroupTitleOrCode: async (id: number, groupBody: GroupTitleOrCode) => {
    try {
      const response = await client.patch<ResponseWith<GroupTitleOrCode>>(
        `/groups/${id}`,
        groupBody
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },

  changeLeader: async (groupId: number, memberId: number) => {
    try {
      const response = await client.patch(
        `/groups/${groupId}/leader/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail changeLeader:', error);
      throw error;
    }
  },

  removeMember: async (groupId: number, memberId: number) => {
    try {
      const response = await client.delete(
        `/groups/members/${groupId}/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail removeMember:', error);
      throw error;
    }
  },
};
