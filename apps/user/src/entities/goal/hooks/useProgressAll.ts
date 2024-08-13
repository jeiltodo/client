import { useQuery } from '@tanstack/react-query';
import { goalApi } from '../../../entities/goal/api/goalApi';
import { ResponseWith } from '../../../shared';
import { UserProgress } from '../../../entities/goal';
import { goalQueryKeys } from './queryKey';

export const useProgressAll = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.progress(),
    queryFn: goalApi.getAllProgress,
    select: (data: ResponseWith<UserProgress>) => data.data,
  });
};
