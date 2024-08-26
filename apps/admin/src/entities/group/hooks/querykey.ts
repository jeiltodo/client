import { TableQueries } from '../../../shared';

export const groupQueryKeys = {
  all: ['group'] as const,
  filters: (params: TableQueries) => [...groupQueryKeys.all, params],
  detail: (groupId: number) =>
    [...groupQueryKeys.all, 'detail', groupId] as const,
  goals: (groupId: number) =>
    [...groupQueryKeys.all, 'goals', groupId] as const,
};
