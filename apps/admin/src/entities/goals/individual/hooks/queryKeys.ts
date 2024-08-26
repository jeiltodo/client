import { TableQueries } from '../../../../shared';

export const individualGoalsQueryKeys = {
  all: ['goalsIndividual'] as const,
  detail: (id: number) =>
    [...individualGoalsQueryKeys.all, id, 'todo'] as const,
  filters: (params: TableQueries) => [...individualGoalsQueryKeys.all, params],
};
