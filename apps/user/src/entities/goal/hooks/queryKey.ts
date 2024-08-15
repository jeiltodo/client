export const goalQueryKeys = {
  goals: ['goals'] as const,

  individual: {
    default: () => [...goalQueryKeys.goals, 'individual'] as const,
    progress: () =>
      [...goalQueryKeys.individual.default(), 'progress'] as const,
    todos: () => [...goalQueryKeys.individual.default(), 'todos'] as const,
    lists: () => [...goalQueryKeys.individual.default(), 'list'] as const,
    single: (goalId: number) =>
      [...goalQueryKeys.individual.todos(), 'single', goalId] as const,
  },

  group: {
    default: () => [...goalQueryKeys.goals, 'group'] as const,
    lists: () => [...goalQueryKeys.group.default(), 'list'] as const,
    single: (goalId: number) =>
      [...goalQueryKeys.group.default(), 'single', goalId] as const,
    detail: (groupId: number | string) =>
      [...goalQueryKeys.group.default(), groupId] as const,
  },
};
