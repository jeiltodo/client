import { groupQueryKeys } from './querykey';
import { groupApi } from '../api/groupApi';
import { useQuery } from '@tanstack/react-query';

export const useGroupDetail = (groupId: number) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(groupId),
    queryFn: () => groupApi.getGroup(groupId),
    select: (data) => data,
  });
};
