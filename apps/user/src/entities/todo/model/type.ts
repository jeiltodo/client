export type Todo = {
  id: number;
  done: boolean;
  title: string;
  noteId?: number;
};

export type Asignee = {
  id: number;
  name: string;
  color: string;
};

export type TodoCreateBody = {
  goal_id: number;
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
  is_done: boolean;
  created_at: string;
  updated_at: string;
}
