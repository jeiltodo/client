export const todoQueryKeys = {
  todos: ['todos'] as const,

  list: (goalId: number) => [...todoQueryKeys.todos, 'list', goalId] as const,

  individual: {
    default: (params?: { limit?: number; goalIds?: string; isDone?: boolean | null }) => [...todoQueryKeys.todos, 'individual', 'all', params] as const,
    single: (goalId: number) =>
      [...todoQueryKeys.individual.default(), 'single', goalId] as const,
  },
};
