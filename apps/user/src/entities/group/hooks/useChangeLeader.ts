import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './queryKeys';

export const useChangeLeader = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (memberId: number) => groupApi.changeLeader(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.detail(groupId),
      });
      showToast({ message: '그룹장 변경 성공!', type: 'alert', isGroup: true });
    },
  });
};
