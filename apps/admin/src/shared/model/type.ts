export interface PageList {
  currentPage: number;
  totalCount: number;
}

export interface ResponseWith<T> {
  msg: string;
  code: number;
  data: T;
}

export interface ResponsePageListWith<T> {
  msg: string;
  code: number;
  data: PageList & T;
}
