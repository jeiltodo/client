import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import type { TableQueries } from '../../../shared';
import { groupQueryKeys } from './querykey';

export const useSearchGroups = (params: TableQueries) => {
  const query = useQuery({
    queryKey: groupQueryKeys.filters(params),
    queryFn: () => groupApi.searchGroups(params),
    select: (data) => data.data,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
  };
};
