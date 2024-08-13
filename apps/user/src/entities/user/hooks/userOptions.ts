import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { userQueryKeys } from './queryKeys';
import { userApi } from '../api/userApi';

export const userOptions = () =>
  queryOptions({
    queryKey: userQueryKeys.all,
    queryFn: userApi.getUserInfo
  });