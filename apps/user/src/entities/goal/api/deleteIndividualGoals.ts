import { IndividualGoalsResponse } from '../model/type';
import { client } from '../../../shared';

export const deleteIndividualGoals = async ({
  goalId,
}: {
  goalId: number;
}): Promise<IndividualGoalsResponse> => {
  try {
    const response = await client.delete(`/individual/goals/${goalId}`);
    return response.data;
  } catch (error) {
    // 오류가 발생한 경우 적절히 처리
    console.error('Fail fetch individual goals:', error);
    throw error;
  }
};
