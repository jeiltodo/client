import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';
import { GroupTitleOrCode } from '@jeiltodo/ui/entities';
import { useToast } from '@jeiltodo/ui/shared';

export const useGroupCode = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(id),
    queryFn: () => groupApi.reissueGroupoCode(id),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupTitleAndCode = (id: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (groupBody: GroupTitleOrCode) =>
      groupApi.updateGroupTitleOrCode(id, groupBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
      showToast({ message: '수정 성공!', type: 'alert', isGroup: true });
    },
  });
};