import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberApi } from '../api/memberApi';
import { UserInterface } from '../../../widgets/members/model/type';

export const useUpdateMemberInfo = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updated: Partial<Pick<UserInterface, 'nickname' | 'email'>>) =>
      memberApi.updateMemberInfo(memberId, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(memberId),
      });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('members'),
      });
    },
  });
};