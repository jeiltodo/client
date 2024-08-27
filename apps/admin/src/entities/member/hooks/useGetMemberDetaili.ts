import { useQuery } from '@tanstack/react-query';
import { membersQueryKeys } from './queryKeys';
import { memberApi } from '../api/memberApi';

export const useGetMemberDetail = (id: number) => {
  return useQuery({
    queryKey: membersQueryKeys.detail(id),
    queryFn: () => memberApi.getMemberDetail(id),
    select: (data) => data.data,
  });
};
