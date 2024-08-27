import type { TableHeadMap } from '../../../shared/ui/table/type';

export const GROUP_TABLE_HEAD_MAP: TableHeadMap<any>[] = [
  {
    criteria: 'id',
    title: 'id',
    withSort: false,
  },
  {
    criteria: 'title',
    title: '그룹 이름',
    withSort: true,
  },
  {
    criteria: 'createUser',
    title: '그룹장',
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
];

export const GROUP_DETAIL_TABLE_HEAD_MAP: TableHeadMap<any>[] = [
  {
    criteria: 'id',
    title: 'id',
    withSort: false,
  },
  {
    criteria: 'title',
    title: '목표',
    withSort: true,
  },
  {
    criteria: 'progressRate',
    title: '목표별 진행상황',
    withSort: true,
  },
];