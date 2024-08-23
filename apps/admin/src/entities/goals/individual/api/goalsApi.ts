import { client } from '@jeiltodo/ui/shared';
import { ResponseGetAllIndividualGoals } from '../model/type';

export const individualGoalsApi = {
  getAllIndividualGoals: async (params: {
    page: number;
    limit: number;
    nickname?: string;
    title?: string;
    createdAfter?: string;
    createdBefore?: string;
  }) => {
    try {
      const response = await client.get<ResponseGetAllIndividualGoals>(
        `/admin/goals/individual`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getAllIndividualGoals error:', error);
      throw error;
    }
  },

  deleteIndividualGoal: async ({ goalIds }: { goalIds: number[] }) => {
    try {
      const response = await client.delete(`/admin/goals/individual/delete`, {
        data: { goalIds },
      });
      return response;
    } catch (error) {
      console.error('Fail to delete individual goals:', error);
      throw error;
    }
  },
};
