import { useMutation, useQueryClient } from '@tanstack/react-query';
import { grouplGoalsApi } from '../api/groupGoalsApi';

export const useCreateGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      grouplGoalsApi.createGroupGoal(groupId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};
