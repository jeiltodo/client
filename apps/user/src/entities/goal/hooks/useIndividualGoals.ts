import { useQuery } from '@tanstack/react-query';
import { goalApi } from '../api/individualGoalsApi';
import { goalQueryKeys } from './queryKey';

export const useIndividualGoals = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.default(),
    queryFn: goalApi.getGoals,
    select: (data) => data.data,
  });
};
