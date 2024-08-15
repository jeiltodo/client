type ObjectWithOptionalFields<T> = {
  [K in keyof T]?: T[K];
};

declare module 'tailwind-scrollbar-hide';