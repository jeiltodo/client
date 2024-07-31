export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface ApiResponse {
  status: number;
  message: 'string';
  data: any;
  total: number;
}
