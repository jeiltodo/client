import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';

export const useGroupCode = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(id),
    queryFn: () => groupApi.reissueGroupoCode(id),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupCodeUpdate = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (secretCode: string) =>
      groupApi.updateGroupoCode(id, secretCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.code(id) });
    },
  });
};
