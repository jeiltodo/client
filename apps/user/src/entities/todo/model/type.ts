export type Todo = {
  id: number;
  isDone: boolean;
  title: string;
  noteId?: number;
};

export interface Todos {
  id: number;
  title: string;
  goal: {
    id: number;
    title: string;
  };
  isDone: boolean | null | undefined;
  created_at: string;
  updated_at: string;
  noteId: number;
}

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

// 페이지네이션이 적용된 응답 타입 정의
export interface ResponsePageListWith<T> {
  msg: string;
  code: number;
  data: {
    goals: T[];
    currPage: number;
    totalCount: number;
  };
}

// 페이지네이션이 적용된 응답 타입 정의
export interface ResponsePageListRecentTodo<T> {
  msg: string;
  code: number;
  data: {
    todos: T[];
    currentPage: number;
    totalCount: number;
  };
}

/*
================================================
*/

