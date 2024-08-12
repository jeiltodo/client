import { useQuery } from '@tanstack/react-query';
import { goalApi } from '../../../entities/goal/api/goalApi';
import { goalQueryKeys } from '../api/queryKey';

export const useProgressAll = () =>
  useQuery({
    queryKey: goalQueryKeys.individual.progress.all(),
    queryFn: goalApi.getAllProgress,
    select: (data) => data.data,
  });
