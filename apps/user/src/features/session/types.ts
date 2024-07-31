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
