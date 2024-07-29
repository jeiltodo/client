import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@jeiltodo/ui';

export interface LoginCredentials {
	userId: string;
	password: string;
}

interface LoginFormProps {
	onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
	const [userId, setUserId] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('userId: ', userId);
		console.log('password: ', password);
		onSubmit({ userId, password });
	};

	const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input type='text' value={userId} onChange={handleUserIdChange} placeholder='Username' />
			<Input type='password' value={password} onChange={handlePasswordChange} placeholder='Password' />
			<button type='submit'>Login</button>
		</form>
	);
};
