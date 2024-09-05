import { client } from '@jeiltodo/ui/shared';
import type { GoalWithProgress, GroupGoalWithTodos } from '../types';
import type { ResponseWith } from '../../../shared';
import type { GoalProps } from '../../../features/group';
import type { SingleGoalTodosResponse } from '../../todo';

export const groupGoalsApi = {
  getSingleGroupGoal: async (
    goalId: number
  ): Promise<ResponseWith<GoalWithProgress>> => {
    try {
      const response = await client.get<ResponseWith<GoalWithProgress>>(
        `/group/goals/single/${goalId}`
      );
      return response.data;
    } catch (error) {
      // 오류가 발생한 경우 적절히 처리
      console.error('Fail fetch single group goal:', error);
      throw error;
    }
  },
  // GET 요청: 그룹의 목표 목록 조회
  getGroupGoals: async (
    groupId: null | number
  ): Promise<ResponseWith<{ groupGoals: GoalProps[] }>> => {
    try {
      const response = await client.get<
        ResponseWith<{ groupGoals: GoalProps[] }>
      >(`/group/goals/${groupId}`);
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
        ResponseWith<{
          totalCount: number;
          currPage: number;
          goals: GroupGoalWithTodos[];
        }>
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

  deleteGroupGoal: async (groupId: number, goalId: number) => {
    try {
      const response = await client.delete(`/group/goals/${groupId}/${goalId}`);
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
