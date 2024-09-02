import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './querykey';

export const useChangeLeader = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => groupApi.changeLeader(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupQueryKeys.detail(groupId),
      });
    },
  });
};
