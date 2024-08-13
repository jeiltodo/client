import { queryOptions } from '@tanstack/react-query';
import { individualGoalsApi, UserProgress } from '../../../entities/goal';
import { ResponseWith } from '../../../shared';

// export const progressOptions = queryOptions({
//   queryKey: goalQueryKeys.individual.progress,
//   queryFn: individualGoalsApi.getAllProgress,
//   select: (data: ResponseWith<UserProgress>) => data.data,
// });
