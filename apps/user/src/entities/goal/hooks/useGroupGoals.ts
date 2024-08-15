import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from './queryKey';
import { groupGoalsApi } from '../api/groupGoalsApi';

export const useGroupGoals = (groupId: null | number) => {
  const {
    data: groupGoalsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.group.detail(groupId ?? 'unknown'),
    queryFn: () => groupGoalsApi.getGroupGoals(groupId),
    enabled: groupId !== null,
  });

  return {
    groupGoalsData,
    error,
    isLoading,
  };
};

export const useGroupSingleGoal = (goalId: number) => {
  return useQuery({
    queryKey: goalQueryKeys.group.single(goalId),
    queryFn: () => groupGoalsApi.getSingleGroupGoal(goalId),
  });
};
