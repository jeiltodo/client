export type TableQuery = 'name' | 'keyword' | 'period' | 'email';

export interface TableFilter {
  label: string;
  query: string;
  type?: 'email' | 'date';
  placeholder?: string;
};
