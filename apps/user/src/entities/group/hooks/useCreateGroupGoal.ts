import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';

export const useCreateGroupGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      groupGoalsApi.createGroupGoal(groupId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
    },
  });
};
