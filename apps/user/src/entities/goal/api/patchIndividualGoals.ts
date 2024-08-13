import { IndividualGoalsResponse } from '../model/type';
import { client } from '../../../shared';

interface Props {
  goalid: number;
  title: string;
}

export const patchIndividualGoals = async ({
  goalid,
  title,
}: Props): Promise<IndividualGoalsResponse> => {
  try {
    const response = await client.patch(`/individual/goals/${goalid}`, {
      title,
    });
    return response.data;
  } catch (error) {
    // 오류가 발생한 경우 적절히 처리
    console.error('Fail fetch individual goals:', error);
    throw error;
  }
};
