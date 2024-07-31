export interface TableHeadMap<T> {
  criteria: keyof T;
  title: string;
  withSort: boolean;
}
