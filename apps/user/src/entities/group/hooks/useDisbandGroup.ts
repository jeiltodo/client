import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { groupApi } from '../api/groupApi';

export const useDisbandGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const showToast = useToast();
  return useMutation({
    mutationFn: () => groupApi.disbandGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
      showToast({ message: '그룹을 해체하였습니다', type: 'confirm' });
      router.push('/');
    },
  });
};
