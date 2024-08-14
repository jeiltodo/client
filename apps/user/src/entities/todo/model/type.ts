export type Todo = {
  id: number;
  isDone: boolean;
  title: string;
  noteId?: number;
};

export type Asignee = {
  id: number;
  name: string;
  color: string;
};

export type TodoCreateBody = {
  goalId: number;
  title: string;
};

export type TodoUpdateBody = Pick<Todo, 'id' | 'title'>;

export type SingleGoalTodoResponse = {
  msg: string;
  code: number;
  data: SingleGoalTodo[];
};

export interface SingleGoalTodo {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  noteId: number | null;
}
