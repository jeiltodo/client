import { queryOptions } from '@tanstack/react-query';
import { individualGoalsApi } from '../../goal/api/individualGoalsApi';
import type { ResponseWith } from '../../../shared';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import type { IndividualProgress } from '../../goal/types';

export const progressAllOptions = () =>
  queryOptions({
    queryKey: goalQueryKeys.individual.progress(),
    queryFn: individualGoalsApi.getAllProgress,
    select: (data: ResponseWith<IndividualProgress>) => data.data,
  });
