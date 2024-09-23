import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api';
import type { TableQueries } from '../../../shared';
import { groupQueryKeys } from './queryKeys';

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
