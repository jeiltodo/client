import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';

export const useDeleteGroups = (groupId: number[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => groupApi.deleteGroups(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('list'),
      });
    },
  });
};
