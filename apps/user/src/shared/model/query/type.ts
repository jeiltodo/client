export interface PageList {
  currPage: number;
  totalCount: number;
};

export interface ResponseWith<T> {
  msg: string;
  code: number;
  data: T;
};

export interface ResponsePageListWith<T> {
  msg: string;
  code: number;
  data: PageList & T;
};
