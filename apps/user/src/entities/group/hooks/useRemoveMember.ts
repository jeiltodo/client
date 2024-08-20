import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useRemoveMember = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (memberId: number) => groupApi.removeMember(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.detail(groupId),
      });
      showToast({ message: '삭제 성공!', type: 'alert', isGroup: true });
    },
  });
};
