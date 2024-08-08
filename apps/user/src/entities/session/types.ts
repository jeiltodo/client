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
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface MessageResponse {
  status: number;
  message: string;
}
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
