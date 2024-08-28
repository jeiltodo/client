import { userQueryKeys } from '@jeiltodo/ui/entities';
import { queryOptions } from '@tanstack/react-query';
import { userApi } from '../../../../../../packages/ui/src/entities/user/api/userApi';

export const userOptions = () =>
  queryOptions({
    queryKey: userQueryKeys.all,
    queryFn: userApi.getUserInfo,
    select: (data) => data.data,
  });
