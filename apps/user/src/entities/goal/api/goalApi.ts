import { client, ResponsePageListWith, ResponseWith } from '../../../shared';
import { Goal, GoalWithTodos, UserProgress } from '../model/type';

export const goalApi = {
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

  getGoalWithTodos: async (page: number, limit: number) => {
    try {
      const response = await client.get<
        ResponsePageListWith<{ goals: GoalWithTodos[] }>
      >('/individual/goals/todos', {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('goal API - getGoalWithTodos error:', error);
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
};
