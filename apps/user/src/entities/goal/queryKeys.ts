export const goalQueryKeys = {
  all: ['goals'] as const,

  // 개인 목표
  individual: {
    all: () => [...goalQueryKeys.all, 'individual'] as const, //개인 목표 루트 키
    lists: () => [...goalQueryKeys.individual.all(), 'list'] as const,
  },
};
