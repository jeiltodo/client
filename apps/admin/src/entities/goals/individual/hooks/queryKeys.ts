export const individualGoalsQueryKeys = {
  all: ['goalsIndividual'] as const,
  detail: (goalId: number) => [...individualGoalsQueryKeys.all, goalId, 'todo'] as const,
};
