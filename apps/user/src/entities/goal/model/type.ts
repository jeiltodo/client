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
  }
}

export interface GroupGoalsResponse {
  msg: string;
  code: number;
  data: {
    groupGoals: GoalProps[];
  }
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

interface GoalProps {
  id: number;
  title: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}