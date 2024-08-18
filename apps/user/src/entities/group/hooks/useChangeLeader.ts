import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useChangeLeader = (groupId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (memberId: number) => groupApi.changeLeader(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.detail(groupId),
      });
      showToast({ message: '그룹장 변경 성공!', type: 'alert' });
    },
  });
};
