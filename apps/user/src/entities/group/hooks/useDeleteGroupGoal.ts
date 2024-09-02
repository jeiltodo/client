import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';

export const useDeleteGroupGoal = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      groupGoalsApi.deleteGroupGoal(groupId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('goals'),
      });
      showToast({ message: '목표 삭제 성공!', type: 'alert', isGroup: true });
    },
  });
};
