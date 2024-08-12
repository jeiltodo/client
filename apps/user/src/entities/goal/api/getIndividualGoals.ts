import { IndividualGoalsResponse } from '../model/type';
import { client } from '../../../shared';

export const getIndividualGoals = async (): Promise<IndividualGoalsResponse> => {
  try {
    const response = await client.get('/individual/goals');
    return response.data;
  } catch (error) {
    // 오류가 발생한 경우 적절히 처리
    console.error('Fail fetch individual goals:', error);
    throw error;
  }
};
