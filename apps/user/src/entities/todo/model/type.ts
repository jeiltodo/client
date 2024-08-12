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
