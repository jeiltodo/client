import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './queryKeys';

export const useGroupDetail = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(id),
    queryFn: () => groupApi.getGroupDetail(id),
    select: (data) => data.data,
  });
};
