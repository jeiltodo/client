import { queryOptions } from '@tanstack/react-query';
import { userQueryKeys } from './queryKeys';
import { userApi } from '../api/userApi';

export const userOptions = () =>
  queryOptions({
    queryKey: userQueryKeys.all,
    queryFn: userApi.getUserInfo,
    select: (data) => data.data,
  }); 
