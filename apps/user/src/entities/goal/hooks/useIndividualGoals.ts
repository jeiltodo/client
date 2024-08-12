import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../queryKeys';
import { getIndividualGoals } from '../api/getIndividualGoals';

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
