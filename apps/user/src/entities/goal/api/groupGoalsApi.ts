import type {
  GroupGoalWithTodos,
  SingleGoalResponse} from '../model/type';
import {
  GroupGoalsResponse
} from '../model/type';
import type { ResponsePageListWith, ResponseWith } from '../../../shared';
import { client } from '../../../shared';
import type { GoalProps} from '../../../features/group';
import { GroupProps } from '../../../features/group';

export const groupGoalsApi = {
  getSingleGroupGoal: async (goalId: number) => {
    try {
      const response = await client.get<SingleGoalResponse>(
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
  getGroupGoals: async (groupId: null | number) => {
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
