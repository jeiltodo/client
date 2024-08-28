import { TableQueries } from "../../../../shared";

export const groupGoalsQueryKeys = {
  all: ['goalsGroup'] as const,
  detail: (id: string) =>
    [...groupGoalsQueryKeys.all, id, 'todo'] as const,
  filters: (params: TableQueries) => [...groupGoalsQueryKeys.all, params],

};
