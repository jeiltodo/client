import { useQuery } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { goalQueryKeys } from './queryKey';

export const useIndividualGoals = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.default(),
    queryFn: individualGoalsApi.getGoals,
    select: (data) => data.data,
  });
};
