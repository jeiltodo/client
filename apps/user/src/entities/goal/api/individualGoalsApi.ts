import { client, ResponsePageListWith, ResponseWith } from '../../../shared';
import type {
  Goal,
  GoalWithTodos,
  IndividualGoalsResponse,
  SingleGoalResponse,
  UserProgress,
} from '../model/type';

export const individualGoalsApi = {
  getAllProgress: async () => {
    try {
      const response = await client.get<ResponseWith<UserProgress>>(
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
      const response = await client.get<SingleGoalResponse>(
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
        await client.get<ResponseWith<{ individualGoals: Goal[] }>>(
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
  createGoal: async ({
    title,
  }: {
    title: string;
  }): Promise<IndividualGoalsResponse> => {
    try {
      const response = await client.post('/individual/goals', { title });
      return response.data;
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
      const response = await client.patch<IndividualGoalsResponse>(
        `/individual/goals/${goalId}`,
        {
          title,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Fail to patch individual goals:', error);
      throw error;
    }
  },

  deleteIndividualGoal: async ({ goalId }: { goalId: number }) => {
    try {
      const response = await client.delete<ResponseWith<{}>>(
        `/individual/goals/${goalId}`
      );

      console.log('delete goal response: ', response);
      if (response.status === 204) {
        console.log('Goal successfully deleted');
      }
      return response;
    } catch (error) {
      console.error('Fail to delete individual goals:', error);
      throw error;
    }
  },
};
