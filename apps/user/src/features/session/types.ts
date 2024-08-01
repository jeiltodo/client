export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SessionApiResponse {
  status: number;
  message: 'string';
  data: any;
  total: number;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: User;
  };
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
