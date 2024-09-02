import { queryOptions } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { userQueryKeys } from './queryKeys';

export const userOptions = () =>
  queryOptions({
    queryKey: userQueryKeys.all,
    queryFn: userApi.getUserInfo,
    select: (data) => data.data,
  }); 
