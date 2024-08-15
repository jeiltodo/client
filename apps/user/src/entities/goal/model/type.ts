import { Member } from '@jeiltodo/ui/entities';
import { Todo } from '../../todo';

export type GoalWithTodos = Goal & { todos: Todo[] };

export type Goal = {
  id: number;
  title: string;
  memberId: number;
  updatedAt: string;
  progress: number;
};

export type UserProgress = { progress: number };

export interface IndividualGoalsResponse {
  msg: string;
  code: number;
  data: {
    individualGoals: IndividualGoals[];
  };
}

export interface GroupGoalsResponse {
  msg: string;
  code: number;
  data: {
    groupGoals: GoalProps[];
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

interface GoalProps {
  id: number;
  title: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}

/*
================================================
*/

export type GroupMember = Pick<Member, 'nickname' | 'color'> & {
  contributionPercent: number;
};
export type GroupTodo = Todo & { memberInCharge: string | null };

export type GroupGoal = {
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  progress: {
    completedPercent: number;
    members: GroupMember[];
  };
};

export type GroupGoalWithTodos = GroupGoal & {
  todos: GroupTodo[];
};

export type GoalIdAndTitle = Pick<Goal, 'id' | 'title'>;
