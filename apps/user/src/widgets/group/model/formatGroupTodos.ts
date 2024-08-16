import { GroupGoalWithTodos } from '../../../entities/goal';

export const formatGroupTodos = (goal: GroupGoalWithTodos, done: boolean) => {
  return goal.todos
    .filter((todo) => todo.isDone === done)
    .map((todo) => ({
      ...todo,
      memberInCharge: todo.memberInCharge
        ? {
            nickname: todo.memberInCharge,
            color: goal.progress.members.find(
              (member) => member.nickname === todo.memberInCharge
            )?.color ?? '#2563EB', // 기본 색상 값을 지정하세요
          }
        : null,
      goal: { id: goal.id, title: goal.title },
    }));
};