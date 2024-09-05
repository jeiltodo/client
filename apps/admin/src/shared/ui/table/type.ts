export type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & string];

export interface TableHeadMap<T> {
  criteria: NestedKeyOf<T>;
  title: string;
  withSort: boolean;
}
