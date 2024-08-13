import { queryOptions } from '@tanstack/react-query';
import { goalQueryKeys } from '../queryKeys';
import { getIndividualGoals } from './getIndividualGoals';

export const individualGoalsOptions = () =>
  queryOptions({
    queryKey: goalQueryKeys.individual.lists(),
    queryFn: getIndividualGoals,
  });
