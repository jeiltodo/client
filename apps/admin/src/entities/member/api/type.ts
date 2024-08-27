import { GroupsInterface } from '../../../widgets/members/model/type';

export interface Member {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  groupCount: number;
}

export type MemberQueryParams = {
  page: number;
  limit: number | string;
  nickname?: string;
  email?: string;
  createdAfter?: string;
  createdBefore?: string;
};

// export type MemberGroup = {
//   id: number;
//   title: string;
//   registerAt: string;
// };

export type MemberGoal = {
  id: number;
  title: string;
  progressRate: number;
};
export type MemberDetail = {
  id: number;
  email: string;
  nickname: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  groups: GroupsInterface[];
  goals: MemberGoal[];
};
