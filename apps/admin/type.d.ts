type ObjectWithOptionalFields<T> = {
  [K in keyof T]?: T[K];
};
