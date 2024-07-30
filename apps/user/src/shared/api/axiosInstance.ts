import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

const API_URL = 'http://localhost:3000/api'; // 실제 API 주소로 변경	//http://52.78.126.130:8080/ - Ec2 Server url
let accessToken: string | null = null;

// Token management functions - 파일 분리해서 accessToken 상태관리 라이브러리 추가?
export const setAccessToken = (token: string) => {
  accessToken = token; // 메모리에 저장
  // 쿠키에 저장 (HTTP-only 쿠키는 서버 측에서 설정해야 함)
  document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Strict`;
};

// 액세스 토큰 가져오기
export const getAccessToken = () => {
  // 메모리에서 확인
  if (accessToken) return accessToken;

  // 쿠키에서 확인
  const cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (cookieToken) {
    accessToken = cookieToken; // 메모리에 저장
    return cookieToken;
  }

  return null; // 토큰이 없을 경우 null 반환
};

export const clearTokens = () => {
  accessToken = null; // 메모리에서 삭제
  document.cookie =
    'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키 삭제
};

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 메모리/쿠키에서 액세스 토큰 가져오기
    accessToken = getAccessToken();

    // 액세스 토큰이 존재하는 경우
    if (accessToken) {
      // 액세스 토큰을 헤더에 추가
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      window.location.href = '/login';
      return Promise.reject('No access token available');
    }

    return config; // 수정된 요청을 반환하여 서버로 전송
  },
  (error: AxiosError) => {
    return Promise.reject(error); // 에러를 호출한 곳으로 전달
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      //originalRequest._retry 플래그를 사용하여 이미 리프레시 토큰 요청을 시도했는지 확인합니다. 이를 통해 무한 루프를 방지
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          '/auth/tokens',
          {},
          { withCredentials: true }
        );
        accessToken = response.data.accessToken;
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return axiosInstance(originalRequest); //원래 요청 재전송
      } catch (refreshError) {
        accessToken = null;
        window.location.href = '/login'; //리프레시 토큰 요청이 실패하면, accessToken을 null로 설정하고 사용자를 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
