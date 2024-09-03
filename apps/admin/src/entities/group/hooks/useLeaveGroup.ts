import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';

export const useLeaveGroup = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: number) => groupApi.leaveGroup(groupId, memberId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('members'),
      });
    },
  });
};
