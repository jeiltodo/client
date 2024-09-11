import { client } from '@jeiltodo/ui/shared';
import type {
  ResponseGetAllGroupGoals,
  ResponseGetAllGroupGoalTodos,
} from '../model';

export const groupGoalsApi = {
  //목표 관리
  getAllGroupGoals: async (params: {
    page: number;
    limit: number | string;
    groupId?: number;
    nickname?: string;
    groupName?: string;
    title?: string;
    createdAfter?: string;
    createdBefore?: string;
  }) => {
    try {
      const response = await client.get<ResponseGetAllGroupGoals>(
        `/admin/goals/group`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getAllGroupGoals error:', error);
      throw error;
    }
  },

  deleteGroupGoal: async ({ goalIds }: { goalIds: number[] }) => {
    try {
      const response = await client.delete(`/admin/goals/group/delete`, {
        data: { goalIds },
      });
      return response;
    } catch (error) {
      console.error('Fail to delete Group goals:', error);
      throw error;
    }
  },

  // 할 일 관리
  getAllGroupGoalTodos: async (
    params: {
      page: number;
      limit: number | string;
    },
    goalId: number
  ) => {
    try {
      const response = await client.get<ResponseGetAllGroupGoalTodos>(
        `/admin/todo/group/${goalId}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getGroupGoalTodos error:', error);
      throw error;
    }
  },

  deleteGroupGoalTodos: async ({ todoIds }: { todoIds: number[] }) => {
    try {
      const response = await client.delete(`/admin/todo/group/delete`, {
        data: { todoIds },
      });
      return response;
    } catch (error) {
      console.error('Fail to delete group todo:', error);
      throw error;
    }
  },
};
