import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './queryKeys';

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
