import { TableFilter } from "../../../../shared";

export interface GroupGoals {
  id: number;
  title: string;
  progressRate: number;
  group: GroupGoalsGroup;
  member: GroupGoalsMember;
  createdAt: string;
  updatedAt: string;
}

export interface GroupGoalTodos {
  id: number;
  title: string;
  isDone: boolean;
  noteId: number;
  writer: GroupGoalTodosWriter;
  memberInCharge: GroupGoalTodosCharge;
  createdAt: string;
  updatedAt: string;
}

export type GroupGoalsQueryParams = {
  page: number;
  limit: number;
  nickname?: string;
  groupName?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
};

export interface ResponseGetAllGroupGoals {
  msg: string;
  code: number;
  data: ResponseGetAllGroupGoalsData
}

export interface ResponseGetAllGroupGoalTodos {
  msg: string;
  code: number;
  data: ResponseGetAllGroupGoalTodosData
}

/*
 *================================================================= 
 */

 interface GroupGoalsGroup {
  id: number;
  title: string;
 }

 interface GroupGoalsMember {
  id: number;
  nickname: string;
 }

 interface GroupGoalTodosWriter {
  id: number;
  nickname: string;
 }

 interface GroupGoalTodosCharge {
  id: number;
  nickname: string;
 }

 interface ResponseGetAllGroupGoalsData {
  totalCount: number;
  currentPage: number;
  searchedCount: number;
  goals: GroupGoals[]
 }

 interface ResponseGetAllGroupGoalTodosData {
  totalCount: number;
  currentPage: number;
  todos: GroupGoalTodos[]
 }