import { queryOptions } from '@tanstack/react-query';
import { individualGoalsApi } from '../../goal/api/individualGoalsApi';
import type { ResponseWith } from '../../../shared';
import type { UserProgress } from '../../goal';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const progressAllOptions = () =>
  queryOptions({
    queryKey: goalQueryKeys.individual.progress(),
    queryFn: individualGoalsApi.getAllProgress,
    select: (data: ResponseWith<UserProgress>) => data.data,
  });

// export const useProgressAll = () =>
//   return useQuery({
//     queryKey: goalQueryKeys.individual.progress(),
//     queryFn: individualGoalsApi.getAllProgress,
//     select: (data: ResponseWith<UserProgress>) => data.data,
//   });
// };
