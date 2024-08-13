import { useQuery } from '@tanstack/react-query';
import { groupQueryKeys } from '../queryKeys';
import { getGroup } from '../api/getGroup';

export const useGroup = () => {
  const {
    data: groupData,
    error,
    isLoading,
  } = useQuery({
    queryKey: groupQueryKeys.all,
    queryFn: getGroup,
  });

  return {
    groupData,
    error,
    isLoading,
  };
};
