import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api';
import { groupQueryKeys } from './queryKeys';

export const useChangeLeader = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => groupApi.changeLeader(groupId, memberId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: groupQueryKeys.detail(groupId),
      });
    },
  });
};
