export const groupQueryKeys = {
  all: ['groups'] as const,
  detail: (id: number) => [...groupQueryKeys.all, id, 'todos'] as const,
  code: (id: number) => [...groupQueryKeys.all, id, 'code'] as const,
  members: (id: number) => [...groupQueryKeys.all, id, 'members'] as const,
};
