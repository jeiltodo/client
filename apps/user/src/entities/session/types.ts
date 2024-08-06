export interface SignUpData {
  name?: string;
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
