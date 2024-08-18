export interface UserData {
  email: string;
  nickname: string;
}

export interface LogoutData {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
}

export interface UserPatchResponse {
  msg: string;
  code: number;
  data: UserData;
}

export interface UserResponse {
  msg: string;
  code: number;
  data: UserData;
}

export interface DuplicateResponse {
  msg: string;
  code: number;
  data: DuplicateData;
}
/*
================================================
*/

interface DuplicateData {
  duplicated: boolean;
}