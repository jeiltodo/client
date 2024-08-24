import { client, ResponseWith } from '../../../shared';
import { GroupCode, GroupTitleOrCode } from '../model/type';

export const groupApi = {
  reissueGroupoCode: async (id: number) => {
    try {
      const response = await client.get<ResponseWith<GroupCode>>(
        `/groups/code/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },

  updateGrouppTitleOrCode: async (id: number, groupBody: GroupTitleOrCode) => {
    try {
      const response = await client.patch<ResponseWith<GroupTitleOrCode>>(
        `/groups/${id}`,
        groupBody
      );
      return response.data;
    } catch (error) {
      console.error('Fail fetch getGroupDetail:', error);
      throw error;
    }
  },
};
