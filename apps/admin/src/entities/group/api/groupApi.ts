import { client } from '@jeiltodo/ui/shared';
import type {
  GroupGoalsResponse,
  GroupResponse,
  GroupsResponse,
} from '../model/type';
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
    group,
  }: TableQueries): Promise<GroupsResponse | undefined> => {
    try {
      const queries = [
        `/admin/groups?page=${page}&limit=${limit}`,
        nickname ? `nickname=${nickname}` : '',
        group ? `group=${group}` : '',
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
};
