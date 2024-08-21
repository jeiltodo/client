import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { useRouter } from 'next/navigation';
import { useToast } from '@jeiltodo/ui/shared';

export const useLeaveGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const showToast = useToast();
  return useMutation({
    mutationFn: () => groupApi.leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
      showToast({ message: '그룹을 해체하였습니다', type: 'confirm' });
      router.push('/');
    },
  });
};
