import { useMutation, useQueryClient } from '@tanstack/react-query';
import { grouplGoalsApi } from '../api/groupGoalsApi';

export const useUpdateGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      grouplGoalsApi.updateGroupGoal(groupId, id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};
