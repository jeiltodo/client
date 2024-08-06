import type { User } from '../../../entities/user/model/type';
import type { TableHeadMap } from '../../../shared/ui/table/type';

export const USER_TABLE_HEAD_MAP: TableHeadMap<User>[] = [
  {
    criteria: 'id',
    title: 'id',
    withSort: false,
  },
  {
    criteria: 'name',
    title: '이름',
    withSort: true,
  },
  {
    criteria: 'email',
    title: '이메일',
    withSort: true,
  },
  {
    criteria: 'createdAt',
    title: '가입일자',
    withSort: true,
  },
  {
    criteria: 'updatedAt',
    title: '수정일자',
    withSort: true,
  },
  {
    criteria: 'groupCount',
    title: '그룹수',
    withSort: true,
  },
];
