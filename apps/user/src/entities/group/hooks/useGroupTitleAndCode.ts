import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { GroupTitleOrCode } from '@jeiltodo/ui/entities/group';
import { useToast } from '@jeiltodo/ui/shared';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './queryKeys';

export const useGroupCode = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(id),
    queryFn: () => groupApi.reissueGroupCode(id),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupTitleAndCode = (id: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (groupBody: GroupTitleOrCode) =>
      groupApi.updateGrouppTitleOrCode(id, groupBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
      showToast({ message: '수정 성공!', type: 'alert', isGroup: true });
    },
  });
};
