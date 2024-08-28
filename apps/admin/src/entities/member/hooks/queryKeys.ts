import { TableQueries } from '../../../shared';

export const membersQueryKeys = {
  all: ['members'] as const,
  //   detail: (id: number) =>
  //     [...individualGoalsQueryKeys.all, id, 'todo'] as const,
  filters: (params: TableQueries) => [...membersQueryKeys.all, params],
  detail: (id: number) => [...membersQueryKeys.all, id],
};
