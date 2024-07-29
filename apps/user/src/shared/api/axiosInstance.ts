import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.BASE_URL, // 실제 API 주소로 변경
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await axios.post('/api/token/refresh', { refreshToken });
				const { accessToken } = response.data;
				localStorage.setItem('accessToken', accessToken);
				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// 리프레시 토큰도 만료된 경우
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				// 로그인 페이지로 리다이렉트
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
