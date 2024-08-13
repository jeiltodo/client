import { queryOptions } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { ResponseWith } from '../../../shared';
import { UserProgress } from '..';
import { goalQueryKeys } from './queryKey';

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
