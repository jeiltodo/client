import type { ResponseWith } from '@jeiltodo/ui/shared';
import { client } from '@jeiltodo/ui/shared';
import type { GroupTitleOrCode } from '@jeiltodo/ui/entities';
import type { GroupResponse, GroupsResponse } from '../model/type';
import type { TableQueries } from '../../../shared';

export const groupApi = {
  getGroup: async (groupId: number): Promise<GroupResponse> => {
    try {
      const response = await client.get<GroupResponse>(
        `/admin/groups/${groupId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch group:', error);
      throw error;
    }
  },

  searchGroups: async ({
    page,
    limit,
    nickname,
    title,
  }: TableQueries): Promise<GroupsResponse> => {
    try {
      const queries = [
        `/admin/groups?page=${page}&limit=${limit}`,
        nickname?.trim() ? `nickname=${nickname}` : '',
        title?.trim() ? `title=${title}` : '',
      ]
        .filter(Boolean)
        .join('&')
        .trim();
      const response = await client.get(queries);
      return response.data as GroupsResponse;
    } catch (error) {
      console.error('Fail fetch group:', error);
      throw error;
    }
  },

  deleteGroups: async (groupId: number[]): Promise<void> => {
    try {
      const response = await client.delete(`/admin/groups/`, {
        data: { groupId },
      });
      return response.data;
    } catch (error) {
      console.error('Fail delete group:', error);
      throw error;
    }
  },
  leaveGroup: async (groupId: number, memberId: number) => {
    try {
      const response = await client.delete(
        `/admin/groups/${groupId}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },

  changeLeader: async (groupId: number, memberId: number): Promise<void> => {
    try {
      const response = await client.patch(
        `/admin/groups/${groupId}/leader/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail change leader:', error);
      throw error;
    }
  },

  removeMember: async (groupId: number, memberId: number) => {
    try {
      const response = await client.delete(
        `/admin/groups/${groupId}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail remove member:', error);
      throw error;
    }
  },

  updateGroupTitleOrCode: async (id: number, groupBody: GroupTitleOrCode) => {
    try {
      const response = await client.patch<ResponseWith<GroupTitleOrCode>>(
        `/admin/groups/${id}`,
        groupBody
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },
};
