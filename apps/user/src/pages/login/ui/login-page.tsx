'use client';
import { useRouter } from 'next/navigation';
import { LoginForm, LoginCredentials } from '../../../features/auth/ui/login-form';
import axiosInstance from '../../../shared/api/axiosInstance';


export const LoginPage: React.FC = () => {
	const router = useRouter();

	const handleLogin = async (credentials: LoginCredentials) => {
		try {
			const response = await axiosInstance.post('/api/login', credentials);
			const { accessToken, refreshToken } = response.data;

			// 토큰 저장
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			// 홈페이지로 리다이렉트
			router.push('/');
		} catch (error) {
			console.error('Login failed:', error);
			alert('Login failed. Please try again.');
		}
	};

	return (
		<div>
			<h1>로그인페이지입니다.</h1>
			<LoginForm onSubmit={handleLogin} />
		</div>
	);
};
