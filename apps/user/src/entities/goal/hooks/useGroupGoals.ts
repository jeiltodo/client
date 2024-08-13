import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from './queryKeys';
import { grouplGoalsApi } from '../api/groupGoalsApi';

export const useGroupGoals = (groupId: null | number) => {
  const {
    data: groupGoalsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.group.detail(groupId ?? 'unknown'),
    queryFn: () => grouplGoalsApi.getGroupGoals(groupId),
    enabled: groupId !== null,
  });

  return {
    groupGoalsData,
    error,
    isLoading,
  };
};
