export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignUpResponse {
  id: 0;
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
