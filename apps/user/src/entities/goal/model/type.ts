import { Todo } from '../../todo';

export type Goal = {
  id: number;
  title: string;
  todos: Todo[];
};
