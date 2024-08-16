import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';

export const useUpdateGroupGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      groupGoalsApi.updateGroupGoal(groupId, id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};
