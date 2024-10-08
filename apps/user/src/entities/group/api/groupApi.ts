
import { client } from '@jeiltodo/ui/shared';
import type { GroupCode, GroupTitleOrCode, GroupWithMembers } from '@jeiltodo/ui/entities/group';
import type { GroupResponse, GroupPostResponse } from '../model/type';
import type { ResponseWith } from '../../../shared';

export const groupApi = {
  // GET 요청: 개인 그룹 조회
  getGroup: async (): Promise<GroupResponse> => {
    try {
      const response = await client.get(`/groups`);
      return response.data;
    } catch (error) {
      console.error('Fail fetch group:', error);
      throw error;
    }
  },

  // POST 요청: 그룹 생성
  createGroup: async (title: string): Promise<GroupPostResponse> => {
    try {
      const response = await client.post('/groups', { title });
      return response.data;
    } catch (error) {
      console.error('Failed to create groups:', error);
      throw error;
    }
  },

  // POST 요청: 그룹 참여
  attendGroup: async (secretCode: string): Promise<GroupPostResponse> => {
    try {
      const response = await client.post('/groups/members', { secretCode });
      return response.data;
    } catch (error) {
      console.error('Failed to attend groups:', error);
      throw error;
    }
  },

  getGroupDetail: async (
    id: number
  ): Promise<ResponseWith<GroupWithMembers>> => {
    try {
      const response = await client.get<ResponseWith<GroupWithMembers>>(
        `/groups/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },

  reissueGroupCode: async (id: number) => {
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

  updateGrouppTitleOrCode: async (id: number, groupBody: GroupTitleOrCode) => {
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

  leaveGroup: async (groupId: number) => {
    try {
      const response = await client.delete(`/groups/members/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Fail leaveGroup:', error);
      throw error;
    }
  },

  disbandGroup: async (groupId: number) => {
    try {
      const response = await client.delete(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Fail disbandGroup:', error);
      throw error;
    }
  },
};
