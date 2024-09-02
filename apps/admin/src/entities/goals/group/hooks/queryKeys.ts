import type { TableQueries } from '../../../../shared';

export const groupGoalsQueryKeys = {
  all: ['goalsGroup'] as const,
  detail: (id: number) => [...groupGoalsQueryKeys.all, id, 'todo'] as const,
  filters: (params: TableQueries) => [...groupGoalsQueryKeys.all, params],
  'detail-filters': (goalId: number, params: TableQueries) => [
    ...groupGoalsQueryKeys.all,
    goalId,
    'todo',
    params,
  ],
};
