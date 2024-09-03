import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './queryKeys';

export const useGroupDetail = (groupId: number) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(groupId),
    queryFn: () => groupApi.getGroup(groupId),
    select: (data) => data,
  });
};
