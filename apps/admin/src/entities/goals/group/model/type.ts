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

export const GOALS_GROUP_FIILTERS: TableFilter[] = [
  {
    label: '키워드',
    query: 'keyword',
    placeholder: '키워드를 입력해주세요',
  },
  {
    label: '그룹 이름',
    query: 'groupName',
    placeholder: '그룹 이름을 입력해주세요',
  },
  {
    label: '작성자',
    query: 'member',
    placeholder: '작성자를 입력해주세요',
  },
  {
    label: '기간',
    query: 'period',
    type: 'date',
  },
];

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