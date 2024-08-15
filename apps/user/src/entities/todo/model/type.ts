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
