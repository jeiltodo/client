export interface SignUpBody extends AuthBody {
  nickname?: string;
}

export interface ValidationErrors {
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export interface AuthBody {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

// export interface User {
//   memId: number;
//   email: string;
//   name: string;
//   role: string;
//   refreshToken: string;
//   createDt: string;
//   updateDt: string;
// }
