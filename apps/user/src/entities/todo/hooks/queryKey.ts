export const todoQueryKeys = {
  todo: ['todos'] as const,

  // 개인 모든 목표 조회
  individual: {
    all: (params?: { limit?: number; goalIds?: string; isDone?: boolean | null }) => 
      [...todoQueryKeys.todo, 'individual', 'all', params] as const,
  },
};