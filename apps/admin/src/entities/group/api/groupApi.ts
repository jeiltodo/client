import { client } from '@jeiltodo/ui/shared';

export const groupApi = {
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
};
