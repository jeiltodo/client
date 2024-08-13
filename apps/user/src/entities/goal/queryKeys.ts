export const goalQueryKeys = {
  goal: ['goal'] as const,
  goals: ['goals'] as const,

  // 개인 목표
  individual: {
    single: () => [...goalQueryKeys.goal, 'individual'] as const, //개인 목표 루트 키
    default: () => [...goalQueryKeys.goals, 'individual'] as const, //개인 목표 루트 키
    // list: () => [...goalQueryKeys.individual.all(), 'list'] as const,
    progress: () =>
      [...goalQueryKeys.individual.default(), 'progress'] as const,
    todos: () => [...goalQueryKeys.individual.default(), 'todos'] as const,

    lists: () => [...goalQueryKeys.individual.default(), 'list'] as const,
  },
  // 그룹 목표
  group: {
    default: () => [...goalQueryKeys.goals, 'group'] as const, //개인 목표 루트 키
    lists: () => [...goalQueryKeys.group.default(), 'list'] as const,
    detail: (groupId: number | string) =>
      [...goalQueryKeys.group.default(), groupId] as const,
  },
};
