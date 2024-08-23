import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './querykey';
import { GroupQueryParams } from '../model/type';

export const useSearchGroups = (params: GroupQueryParams) => {
  const query = useQuery({
    queryKey: groupQueryKeys.list(params),
    queryFn: () => groupApi.searchGroups(params),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
  };
};
