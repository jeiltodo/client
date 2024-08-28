import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './querykey';
import { TableQueries } from '../../../shared';

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
