export const groupQueryKeys = {
  all: ['groups'] as const,

  detail: (id: number) => [...groupQueryKeys.all, id] as const,
};
