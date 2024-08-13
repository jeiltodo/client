import { useQuery } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { goalQueryKeys } from './queryKey';
import { getIndividualSingleGoal } from '../api/getIndividualSignleGoal';

export const useIndividualGoals = () => {
  return useQuery({
    queryKey: goalQueryKeys.individual.default(),
    queryFn: individualGoalsApi.getGoals,
    select: (data) => data.data,
  });
};
export const useIndividualSingleGoal = (goalId: number) => {
  const {
    data: individualSingleGoal,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.individual.single(),
    queryFn: () => getIndividualSingleGoal(goalId),
  });

  return {
    individualSingleGoal,
    error,
    isLoading,
  };
};
