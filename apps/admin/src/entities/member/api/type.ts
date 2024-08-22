export interface Member {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  groupCount: number;
}

export type MemberQueryParams = {
  page?: number;
  limit?: number;
  nickname?: string;
  email?: string;
  createdAfter?: string;
  createdBefore?: string;
};
