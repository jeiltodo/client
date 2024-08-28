export interface UserData {
  email: string;
  nickname: string;
}

export interface LogoutData {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
}
export interface UserInfoResponse {
  msg: string;
  code: number;
  data: UserInfoProps;
}
interface UserInfoProps {
  id: number;
  nickname: string;
  email: string;
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

export interface AuthBody {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
/*
================================================
*/

interface DuplicateData {
  duplicated: boolean;
}
