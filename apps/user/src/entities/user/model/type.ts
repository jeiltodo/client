export interface UserInfoResponse {
  msg: string;
  code: number;
  data: UserInfoProps;
}

/*
================================================
*/

interface UserInfoProps {
  id: number;
  nickname: string;
  email: string;
}
