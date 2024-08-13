import { useQuery } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { ResponseWith } from '../../../shared';
import { UserProgress } from '../../../entities/goal';
import { goalQueryKeys } from './queryKey';

export const useProgressAll = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.progress(),
    queryFn: individualGoalsApi.getAllProgress,
    select: (data: ResponseWith<UserProgress>) => data.data,
  });
};
