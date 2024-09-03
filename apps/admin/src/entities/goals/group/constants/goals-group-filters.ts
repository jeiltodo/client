import type { TableFilter } from '../../../../shared';

export const GOALS_GROUP_FILTERS: TableFilter[] = [
  {
    label: '키워드',
    query: 'title',
    placeholder: '키워드를 입력해주세요',
  },
  {
    label: '그룹 이름',
    query: 'groupName',
    placeholder: '그룹 이름을 입력해주세요',
  },
  {
    label: '작성자',
    query: 'nickname',
    placeholder: '작성자를 입력해주세요',
  },
  {
    label: '기간',
    query: 'period',
    type: 'date',
  },
];
