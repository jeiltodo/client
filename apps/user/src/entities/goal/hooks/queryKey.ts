export const goalQueryKeys = {
  goals: ['goals'] as const,

  individual: {
    default: () => [...goalQueryKeys.goals, 'individual'] as const,
    progress: () =>
      [...goalQueryKeys.individual.default(), 'progress', 'todos'] as const,
    todos: () => [...goalQueryKeys.individual.default(), 'todos'] as const,
    lists: () =>
      [...goalQueryKeys.individual.default(), 'list', 'todos'] as const,
    single: (goalId: number) =>
      [...goalQueryKeys.individual.todos(), 'single', goalId, 'todos'] as const,
  },

  group: {
    default: () => [...goalQueryKeys.goals, 'group'] as const,
    lists: () => [...goalQueryKeys.group.default(), 'list'] as const,
    todos: () => [...goalQueryKeys.group.default(), 'todos'] as const,
    single: (goalId: number) =>
      [...goalQueryKeys.group.default(), 'single', goalId, 'todos'] as const,
    detail: (groupId: number | string) =>
      [...goalQueryKeys.group.default(), groupId] as const,
  },
};
