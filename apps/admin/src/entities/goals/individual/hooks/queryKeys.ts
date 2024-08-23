export const individualGoalsQueryKeys = {
  all: ['goalsIndividual'] as const,
  detail: (id: number) => [...individualGoalsQueryKeys.all, id, 'todo'] as const,
};
