import { GroupQueryParams } from '../model/type';

export const groupQueryKeys = {
  all: ['group'] as const,
  list: (params: GroupQueryParams) =>
    [...groupQueryKeys.all, 'list', params] as const,
  detail: (groupId: number) =>
    [...groupQueryKeys.all, 'detail', groupId] as const,
};
