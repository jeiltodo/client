import { TableFilter } from "../../../../shared";

export interface IndividualGoals {
  id: number;
  title: string;
  progressRate: number;
  member: IndividualGoalsMember;
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
  data: ResponseGetAllIndividualGoalsData
}

export const GOALS_INDIVIDUAL_FIILTERS: TableFilter[] = [
  {
    label: '키워드',
    query: 'keyword',
    placeholder: '키워드를 입력해주세요',
  },
  {
    label: '이름',
    query: 'name',
    placeholder: '이름을 입력해주세요',
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

 interface IndividualGoalsMember {
  id: number;
  nickname: string;
 }

 interface ResponseGetAllIndividualGoalsData {
  totalCount: number;
  currentPage: number;
  goals: IndividualGoals[]
 }