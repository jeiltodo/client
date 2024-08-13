export const goalQueryKeys = {
  all: ['goals'] as const,

  // 개인 목표
  individual: {
    all: () => [...goalQueryKeys.all, 'individual'] as const, //개인 목표 루트 키
    lists: () => [...goalQueryKeys.individual.all(), 'list'] as const,
  },
  // 그룹 목표
  group: {
    all: () => [...goalQueryKeys.all, 'group'] as const, //개인 목표 루트 키
    lists: () => [...goalQueryKeys.group.all(), 'list'] as const,
    detail: (groupId: number | string) => [...goalQueryKeys.group.lists(), groupId] as const
  },
};
