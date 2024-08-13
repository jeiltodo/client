import { useQuery } from '@tanstack/react-query';
import { goalApi } from '../../../entities/goal/api/goalApi';
import { goalQueryKeys } from './queryKey';

export const useIndividualGoals = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.default(),
    queryFn: goalApi.getGoals,
    select: (data) => data.data,
  });
};
