export const todoQueryKeys = {
  todos: ['todos'] as const,

  individual: {
    default: () => [...todoQueryKeys.todos, 'individual'] as const,
    lists: () => [...todoQueryKeys.individual.default(), 'list'] as const,
    single: (goalId: number) =>
      [...todoQueryKeys.individual.default(), 'single', goalId] as const,
  },
};
