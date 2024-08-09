export interface SignUpData {
  nickname?: string;
  email: string;
  password?: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationErrors {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface MessageResponse {
  code: number;
  msg: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SessionApiResponse {
  code: number;
  msg: 'string';
  data: any;
  total: number;
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
