
export interface IndividualGoals {
  id: number;
  title: string;
  progressRate: number;
  member: IndividualGoalsMember;
  createdAt: string;
  updatedAt: string;
}

export interface IndividualGoalTodos {
  id: number;
  title: string;
  isDone: boolean;
  noteId: number;
  createdAt: string;
  updatedAt: string;
}

export type IndividualGoalsQueryParams = {
  page: number;
  limit: number;
  nickname?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
};

export interface ResponseGetAllIndividualGoals {
  msg: string;
  code: number;
  data: ResponseGetAllIndividualGoalsData;
}

export interface ResponseGetAllIndividualGoalTodos {
  msg: string;
  code: number;
  data: ResponseGetAllIndividualGoalTodosData;
}

/*
 *=================================================================
 */

interface IndividualGoalsMember {
  id: number;
  nickname: string;
}

export interface ResponseGetAllIndividualGoalsData {
  totalCount: number;
  currentPage: number;
  searchedCount: number;
  goals: IndividualGoals[];
}

interface ResponseGetAllIndividualGoalTodosData {
  totalCount: number;
  currentPage: number;
  todos: IndividualGoalTodos[];
}
