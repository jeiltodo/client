import { useQuery } from '@tanstack/react-query';
import { individualGoalsApi } from '../../goal/api/individualGoalsApi';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const useIndividualGoals = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.default(),
    queryFn: individualGoalsApi.getGoals,
    select: (data) => data.data,
  });
};
