export type TableQueryName =
  | 'nickname'
  | 'title'
  | 'createdAfter'
  | 'createdBefore'
  | 'email'
  | 'nickname';
type PaginationQuery = { page: number; limit: string | number };

export type TableQueries = Partial<Record<TableQueryName, string>> &
  PaginationQuery;

export interface TableFilter {
  label: string;
  query: string;
  type?: 'email' | 'date';
  placeholder?: string;
}
