export type TableQuery = 'name' | 'keyword' | 'period' | 'email';

export type TableFilter = {
  label: string;
  query: string;
  type?: 'email' | 'date';
  placeholder?: string;
};
