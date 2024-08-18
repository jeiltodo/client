export const userQueryKeys = {
  all: ['user'] as const,
  info: () => [...userQueryKeys.all, 'info'] as const,
  logout: () => [...userQueryKeys.all, 'logout'] as const,
  withdraw: () => [...userQueryKeys.all, 'withdraw'] as const,
  nicknameDuplicate: (nickname: string) => [...userQueryKeys.all, 'nicknameDuplicate', nickname] as const,
  emailDuplicate: (email: string) => [...userQueryKeys.all, 'emailDuplicate', email] as const,
};