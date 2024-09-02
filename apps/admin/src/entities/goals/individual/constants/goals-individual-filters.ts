import type { TableFilter } from '../../../../shared';

export const GOALS_INDIVIDUAL_FIILTERS: TableFilter[] = [
  {
    label: '키워드',
    query: 'title',
    placeholder: '키워드를 입력해주세요',
  },
  {
    label: '이름',
    query: 'nickname',
    placeholder: '이름을 입력해주세요',
  },
  {
    label: '기간',
    query: 'period',
    type: 'date',
  },
];
