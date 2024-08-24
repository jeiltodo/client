export interface GroupResponse {
  msg: string;
  code: number;
  data: GroupDetailResponse;
}

export interface GroupDetailResponse {
  totalCount: number;
  currentPage: number;
  groups: Groups[];
}
export interface Groups {
  id: number;
  title: string;
  createUser: string;
  createdAt: string;
  updatedAt: string;
  members: GroupMembers[];
}

export interface GroupQueryParams {
  page: number;
  limit: string | number | undefined;
  nickname?: string;
  group?: string;
}

export interface GroupMembers {
  id: number;
  isLeader: boolean;
  nickname: string;
  color: string;
  contributionRank: number;
}

export interface GroupErrorResponse {
  msg: string;
  code: number;
}
