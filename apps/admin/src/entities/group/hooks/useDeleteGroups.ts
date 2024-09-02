import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './querykey';

export const useDeleteGroups = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (groupId: number[]) => groupApi.deleteGroups(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.all,
      });
      showToast({
        message: '그룹 삭제 성공!',
        type: 'alert',
        isGroup: false,
      });
    },
    onError: () => {
      showToast({ message: '그룹 삭제 실패!', type: 'confirm' });
    },
  });
};
