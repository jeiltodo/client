import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useCreateGroupGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (title: string) =>
      groupGoalsApi.createGroupGoal(groupId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '목표 작성 성공!', type: 'alert' });
    },
  });
};
