import { logoutApi } from '../api/logoutApi';

export const handleLogout = async () => {
  try {
    // 서버에 로그아웃 요청
    await logoutApi();

    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 추가적으로 필요한 상태 초기화 (예: 유저 정보 등)
    // 예: clearUserInfo();

    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};
