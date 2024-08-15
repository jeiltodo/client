import { GroupGoalsResponse, GroupGoalWithTodos } from '../model/type';
import { client, ResponsePageListWith } from '../../../shared';

export const grouplGoalsApi = {
  // GET 요청: 그룹의 목표 목록 조회
  getGroupGoals: async (
    groupId: null | number
  ): Promise<GroupGoalsResponse> => {
    try {
      const response = await client.get(`/group/goals/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Fail fetch group goals:', error);
      throw error;
    }
  },

  getGroupGoalsWithTodos: async (
    groupId: number,
    params: { page: number; limit: number }
  ) => {
    try {
      const response = await client.get<
        ResponsePageListWith<{ goals: GroupGoalWithTodos[] }>
      >(`/group/goals/todos/${groupId}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('goal API - getGroupGoalsWithTodos error:', error);
      throw error;
    }
  },

  updateGroupGoal: async (groupId: number, goalId: number, title: string) => {
    try {
      const response = await client.patch(`/group/goals/${groupId}/${goalId}`, {
        title,
      });
      return response.data;
    } catch (error) {
      console.error('goal API - updateGroupGoal error:', error);
      throw error;
    }
  },

  createGroupGoal: async (groupId: number, title: string) => {
    try {
      const response = await client.post(`/group/goals/${groupId}`, {
        title,
      });
      return response.data;
    } catch (error) {
      console.error('goal API - updateGroupGoal error:', error);
      throw error;
    }
  },
};
