export interface GroupResponse {
  msg: string;
  code: number;
  data: Groups[];
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
  members: Member[];
}

export type GroupQueryParams = {
  page: number;
  limit: string | number | undefined;
  nickname?: string;
  group?: string;
};

interface Member {
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
