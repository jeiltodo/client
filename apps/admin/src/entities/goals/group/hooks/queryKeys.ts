export const groupGoalsQueryKeys = {
  all: ['goalsGroup'] as const,
  detail: (goalId: number) => [...groupGoalsQueryKeys.all, goalId, 'todo'] as const,
};
