import { Todo } from '../../todo';

export type GoalWithTodos = Goal & { todos: Todo[] };

export type Goal = {
  id: number;
  title: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
  progress: number;
};

export type UserProgress = { progress: number };
