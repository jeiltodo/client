import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useUpdateGroupGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      groupGoalsApi.updateGroupGoal(groupId, id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '수정 성공!', type: 'alert', isGroup: true });
    },
  });
};
