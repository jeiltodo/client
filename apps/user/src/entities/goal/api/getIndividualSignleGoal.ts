import { client } from '../../../shared';
import { GoalWithoutTodos } from '../model/type';

export const getIndividualSingleGoal = async (
  goalId: number
): Promise<GoalWithoutTodos> => {
  try {
    const response = await client.get(`/individual/goals/single/${goalId}`);
    return response.data;
  } catch (error) {
    // 오류가 발생한 경우 적절히 처리
    console.error('Fail fetch individual goal:', error);
    throw error;
  }
};
