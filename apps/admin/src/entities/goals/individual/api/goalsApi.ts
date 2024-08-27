import { client } from '@jeiltodo/ui/shared';
import {
  ResponseGetAllIndividualGoals,
  ResponseGetAllIndividualGoalTodos,
} from '../model/type';

export const individualGoalsApi = {
  //목표 관리
  getAllIndividualGoals: async (params: {
    page: number;
    limit: string | number;
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

  // 할 일 관리
  getAllIndividualGoalTodos: async (
    params: {
      page: number;
      limit: number | string;
    },
    goalId: number
  ) => {
    try {
      const response = await client.get<ResponseGetAllIndividualGoalTodos>(
        `/admin/todo/individual/${goalId}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getIndividualGoalTodos error:', error);
      throw error;
    }
  },

  deleteIndividualGoalTodos: async ({ todoIds }: { todoIds: number[] }) => {
    try {
      const response = await client.delete(`/admin/todo/individual/delete`, {
        data: { todoIds },
      });
      return response;
    } catch (error) {
      console.error('Fail to delete individual todo:', error);
      throw error;
    }
  },
};
