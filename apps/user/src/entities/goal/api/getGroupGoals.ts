import { GroupGoalsResponse } from '../model/type';
import { client } from '../../../shared';

export const getGroupGoals = async (groupId: null | number): Promise<GroupGoalsResponse> => {
  try {
    const response = await client.get(`/group/goals/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Fail fetch group goals:', error);
    throw error;
  }
};
