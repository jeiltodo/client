export const goalQueryKeys = {
  goals: ['goals'] as const,

  // 개인 목표
  individual: {
    default: () => [...goalQueryKeys.goals, 'individual'] as const, //개인 목표 루트 키
    // list: () => [...goalQueryKeys.individual.all(), 'list'] as const,
    progress: {
      all: () => [...goalQueryKeys.individual.default(), 'progress'] as const,
    },

    todos: () => [...goalQueryKeys.individual.default(), 'todos'] as const,
  },
};
