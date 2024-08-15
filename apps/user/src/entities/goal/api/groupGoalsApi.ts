import { GroupGoalsResponse, SingleGoalResponse } from '../model/type';
import { client } from '../../../shared';

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
};
