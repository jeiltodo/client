export const todoQueryKeys = {
  todo: ['todos'] as const,

  // 개인 모든 목표 조회
  individual: {
    all: () => [...todoQueryKeys.todo, 'individual'] as const,
  },
};
