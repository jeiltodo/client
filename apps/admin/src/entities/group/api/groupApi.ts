import { client } from '@jeiltodo/ui/shared';
import { GroupResponse, GroupQueryParams } from '../model/type';

export const groupApi = {
  getGroup: async (groupId: number): Promise<void> => {
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

  searchGroups: async ({
    page,
    limit,
    nickname,
    group,
  }: GroupQueryParams): Promise<GroupResponse> => {
    try {
      let queries = [
        `/admin/groups?page=${page}&limit=${limit}`,
        nickname ? `nickname=${nickname}` : '',
        group ? `group=${group}` : '',
      ]
        .filter(Boolean)
        .join('&')
        .trim();
      const response = await client.get(queries);
      return response.data as GroupResponse;
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
