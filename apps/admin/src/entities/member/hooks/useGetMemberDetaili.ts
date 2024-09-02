import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../api/memberApi';
import { membersQueryKeys } from './queryKeys';

export const useGetMemberDetail = (id: number) => {
  return useQuery({
    queryKey: membersQueryKeys.detail(id),
    queryFn: () => memberApi.getMemberDetail(id),
    select: (data) => data.data,
  });
};
