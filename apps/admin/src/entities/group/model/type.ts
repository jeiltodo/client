import type { Member } from '@jeiltodo/ui/entities/group';
import type { Goal } from '@jeiltodo/ui/shared';

// 그룹 리스트
export interface GroupsResponse {
  msg: string;
  code: number;
  data: GroupPageResponse;
}
export interface GroupPageResponse {
  totalCount: number;
  searchCount: number;
  current_page: number;
  groups: GroupsWithMembers[];
}

export interface GroupMembers {
  id: number;
  isLeader: boolean;
  nickname: string;
  color: string;
  contributionRank: number;
}

//그룹 상세
export interface GroupResponse {
  msg: string;
  code: number;
  data: GroupDetailResponse;
}

export interface GroupDetailResponse {
  id: number;
  title: string;
  secretCode: string;
  createUser: string;
  members: Member[];
  goals: Goal[];
  contributionRank: number;
}
export interface Groups {
  id: number;
  title: string;
  createUser: string;
  createdAt: string;
  updatedAt: string;
}

export type GroupsWithMembers = Groups & { members: GroupMembers[] };

export interface GroupErrorResponse {
  msg: string;
  code: number;
}

export interface GroupGoalsResponse {
  msg: string;
  code: number;
  data: GroupGoalsPageResponse;
}
export interface GroupGoalsPageResponse {
  totalCount: number;
  searchedCount: number;
  currentPage: number;
  goals: GroupGoalsList[];
}

export interface GroupGoalsList {
  createdAt: string;
  group: { id: number; title: string }[];
  id: number;
  member: { id: number; nickname: string }[];
  progressRate: number;
  title: string;
}
