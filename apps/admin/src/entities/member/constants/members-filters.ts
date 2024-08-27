import { TableFilter } from '../../../shared';

export const MEMBERS_FIILTERS: TableFilter[] = [
  {
    label: '이름',
    query: 'nickname',
    placeholder: '이름을 입력해주세요',
  },
  {
    label: '이메일',
    query: 'email',
    placeholder: '이메일을 입력해주세요',
  },
  {
    label: '기간',
    query: 'period',
    type: 'date',
  },
];
