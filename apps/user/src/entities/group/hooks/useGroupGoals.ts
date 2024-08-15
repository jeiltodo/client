import { useQuery } from '@tanstack/react-query';
import { grouplGoalsApi } from '../../goal/api/groupGoalsApi';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const useGroupGoals = (groupId: number) => {
  return useQuery({
    queryKey: goalQueryKeys.group.detail(groupId),
    queryFn: () => grouplGoalsApi.getGroupGoals(groupId),
    enabled: groupId !== null,
  });
};
