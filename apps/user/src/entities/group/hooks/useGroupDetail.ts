import { useQuery } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';

export const useGroupDetail = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(id),
    queryFn: () => groupApi.getGroupDetail(id),
    select: (data) => data.data,
  });
};
