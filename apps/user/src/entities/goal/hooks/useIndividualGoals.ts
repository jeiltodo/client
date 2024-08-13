import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../queryKeys';
import { getIndividualGoals } from '../api/getIndividualGoals';
import { getIndividualSingleGoal } from '../api/getIndividualSignleGoal';

export const useIndividualGoals = () => {
  const {
    data: individualGoals,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.individual.lists(),
    queryFn: getIndividualGoals,
  });

  return {
    individualGoals,
    error,
    isLoading,
  };
};
export const useIndividualSingleGoal = (goalId: number) => {
  const {
    data: individualSingleGoal,
    error,
    isLoading,
  } = useQuery({
    queryKey: goalQueryKeys.individual.single(),
    queryFn: () => getIndividualSingleGoal(goalId),
    enabled: goalId !== null,
  });

  return {
    individualSingleGoal,
    error,
    isLoading,
  };
};
