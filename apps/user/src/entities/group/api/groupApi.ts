import { GroupResponse, GroupPostResponse } from '../model/type';
import { client, ResponseWith } from '../../../shared';
import {
  GroupCode,
  GroupTitleOrCode,
  GroupWithMembers,
} from '@jeiltodo/ui/entities';

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

  getGroupDetail: async (id: Number) => {
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

  updateGroupoCode: async (id: number, secretCode: string) => {
    try {
      const response = await client.patch<ResponseWith<GroupTitleOrCode>>(
        `/groups/code/${id}`,
        { secretCode }
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },
};
