import { IndividualGoalsResponse } from '../model/type';
import { client } from '../../../shared';

export const individualGoalsApi = {
  // GET 요청: 개인 목표 목록 조회
  getIndividualGoals: async (): Promise<IndividualGoalsResponse> => {
    try {
      const response = await client.get('/individual/goals');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch individual goals:', error);
      throw error;
    }
  },

  // POST 요청: 새로운 개인 목표 생성
  createIndividualGoal: async (
    title: string
  ): Promise<IndividualGoalsResponse> => {
    try {
      const response = await client.post('/individual/goals', { title });
      return response.data;
    } catch (error) {
      console.error('Failed to create individual goal:', error);
      throw error;
    }
  },
};
