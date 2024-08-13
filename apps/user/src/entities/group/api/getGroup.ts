import { GroupResponse } from '../model/type';
import { client } from '../../../shared';

export const getGroup = async (): Promise<GroupResponse> => {
  try {
    const response = await client.get(`/groups`);
    return response.data;
  } catch (error) {
    console.error('Fail fetch group:', error);
    throw error;
  }
};
