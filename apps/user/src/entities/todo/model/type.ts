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
  createdAt: string;
  updatedAt: string;
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

export type SingleGoalTodosResponse = {
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

export type SingleGoal = {
  id: number;
  title: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
  progress: number;
};


export type FormattedGoalWithTodos = {goal: {
  id: number;
  title: string;
};
todos: {
  memberInCharge: {
      nickname: string;
      color: string;
  } | null;
  id: number;
  isDone: boolean;
  title: string;
  noteId?: number;
}[];}