import { Todo } from '../../todo';

export type Goal = {
  id: number;
  title: string;
  todos: Todo[];
};

export interface IndividualGoalsResponse {
  msg: string;
  code: number;
  data: {
    individualGoals: IndividualGoals[];
  };
}

/*
================================================
*/

interface IndividualGoals {
  id: number;
  title: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
}