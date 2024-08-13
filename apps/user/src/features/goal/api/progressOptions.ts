import { queryOptions } from '@tanstack/react-query';
import { goalApi, UserProgress } from '../../../entities/goal';
import { ResponseWith } from '../../../shared';

// export const progressOptions = queryOptions({
//   queryKey: goalQueryKeys.individual.progress,
//   queryFn: goalApi.getAllProgress,
//   select: (data: ResponseWith<UserProgress>) => data.data,
// });
