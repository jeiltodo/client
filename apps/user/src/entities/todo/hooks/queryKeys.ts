export const todoQueryKeys = {
  todos: ['todos'] as const,

  list: (goalId: number) => [...todoQueryKeys.todos, 'list', goalId] as const,

  individual: {
    default: () => [...todoQueryKeys.todos, 'individual'] as const,
    single: (goalId: number) =>
      [...todoQueryKeys.individual.default(), 'single', goalId] as const,
  },
};
