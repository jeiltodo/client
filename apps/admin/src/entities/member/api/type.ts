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
