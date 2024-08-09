export interface SignUpData {
  nickname?: string;
  email: string;
  password?: string;
}

export interface ValidationErrors {
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Response<T> {
  code: number;
  msg: string;
  data?: T;
}
export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface User {
  memId: number;
  email: string;
  name: string;
  role: string;
  refreshToken: string;
  createDt: string;
  updateDt: string;
}
