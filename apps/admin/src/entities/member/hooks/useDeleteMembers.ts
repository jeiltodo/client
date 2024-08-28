import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberApi } from '../api/memberApi';

export const useDeleteMembers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: memberApi.deleteMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('members'),
      });
    },
  });
};
