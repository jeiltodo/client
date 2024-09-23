import { client } from '@jeiltodo/ui/shared';
import type { ResponsePageListWith, ResponseWith } from '../../../shared';
import type {
  GoalWithProgress,
  GoalWithTodos,
  IndividualGoal,
  IndividualProgress,
} from '../types';

export const individualGoalsApi = {
  getAllProgress: async () => {
    try {
      const response = await client.get<ResponseWith<IndividualProgress>>(
        '/individual/goals/progress'
      );
      return response.data;
    } catch (error) {
      console.error('goal API - getAllProgress error:', error);
      throw error;
    }
  },

  getGoalWithTodos: async (params: { page: number; limit: number }) => {
    try {
      const response = await client.get<
        ResponsePageListWith<{ goals: GoalWithTodos[] }>
      >('/individual/goals/todos', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('goal API - getGoalWithTodos error:', error);
      throw error;
    }
  },
  getSingleGoal: async (goalId: number) => {
    try {
      const response = await client.get<ResponseWith<GoalWithProgress>>(
        `/individual/goals/single/${goalId}`
      );
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail fetch individual goal:', error);
      throw error;
    }
  },

  getGoals: async () => {
    try {
      const response =
        await client.get<ResponseWith<{ individualGoals: GoalWithProgress[] }>>(
          '/individual/goals'
        );
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail fetch individual goals:', error);
      throw error;
    }
  },

  // POST 요청: 새로운 개인 목표 생성
  createGoal: async ({ title }: { title: string }) => {
    try {
      await client.post('/individual/goals', { title });
    } catch (error) {
      console.error('Failed to create individual goal:', error);
      throw error;
    }
  },

  patchIndividualGoal: async ({
    goalId,
    title,
  }: {
    goalId: number;
    title: string;
  }) => {
    try {
      const response = await client.patch<
        ResponseWith<{ goals: IndividualGoal[] }>
      >(`/individual/goals/${goalId}`, {
        title,
      });
      return response.data;
    } catch (error) {
      console.error('Fail to patch individual goals:', error);
      throw error;
    }
  },

  deleteIndividualGoal: async ({ goalId }: { goalId: number }) => {
    try {
      const response = await client.delete<ResponseWith<object>>(
        `/individual/goals/${goalId}`
      );
      return response;
    } catch (error) {
      console.error('Fail to delete individual goals:', error);
      throw error;
    }
  },
};
