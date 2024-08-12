export type PageList = {
  nextCursor: number;
  totalCount: number;
};

export type ResponseWith<T> = {
  msg: string;
  code: number;
  data: T;
};

export type ResponsePageListWith<T> = {
  msg: string;
  code: number;
  data: PageList & T;
};
