import { Goal } from '../../../shared';

export interface Group {
  id: number;
  title: string;
  createdAt?: string;
  updatedAT?: string;
  secretCode: string;
  createUser: string;
}

export interface Member {
  id: number;
  isLeader: boolean;
  nickname: string;
  color: string;
  contributionRank: number;
}

export type GroupWithMembers = Group & {
  members: Member[];
  goals?: Goal[];
};

export type GroupCode = Pick<Group, 'secretCode'>;

export interface GroupTitleOrCode {
  secretCode?: string;
  title?: string;
}
