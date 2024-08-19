export const noteQueryKeys = {
  one: ['note'] as const,
  all: ['notes'] as const,

  note: {
    //노트 단건 조회
    noteDetail: (noteId: string | number) =>
      [...noteQueryKeys.one, 'note', noteId] as const,
    // 특정 할 일의 노트
    oneOfTodo: (todoId: string | number) =>
      [...noteQueryKeys.one, 'todo', todoId] as const,
    // 특정 목표의 모든 노트
    allOfGoal: (goalId: number) =>
      [...noteQueryKeys.all, 'goal', goalId] as const,
  },
};
