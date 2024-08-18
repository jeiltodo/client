import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';

export const useGroupGoals = (groupId: null | number) => {
  return useQuery({
    queryKey: goalQueryKeys.group.detail(groupId ?? 'unknown'),
    queryFn: () => groupGoalsApi.getGroupGoals(groupId),
    select: (data) => data.data.groupGoals,
    enabled: groupId !== null,
  });
};

export const useGroupSingleGoal = (goalId: number) => {
  return useQuery({
    queryKey: goalQueryKeys.group.single(goalId),
    queryFn: () => groupGoalsApi.getSingleGroupGoal(goalId),
    select: (data) => data.data,
  });
};
