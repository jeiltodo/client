import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../queryKeys';
import { getGroupGoals } from '../api/getGroupGoals';

export const useGroupGoals = (groupId: null | number) => {
  const {
    data: groupGoalsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.group.detail(groupId ?? 'unknown'),
    queryFn: () => getGroupGoals(groupId),
    enabled: groupId !== null,
  });

  return {
    groupGoalsData,
    error,
    isLoading,
  };
};
