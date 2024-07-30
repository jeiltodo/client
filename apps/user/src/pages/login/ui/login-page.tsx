"use client";
import { useRouter } from "next/navigation";
import {
  LoginForm,
  LoginCredentials,
} from "../../../features/auth/login/ui/login-form";
import { handleLogin } from "../../../features/auth/login/model/loginModel";

export const LoginPage: React.FC = () => {
  const router = useRouter();

  const onLogin = async (credentials: LoginCredentials) => {
    const success = await handleLogin(credentials);
    if (success) {
      // 홈페이지로 리다이렉트
      router.push("/");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center py-[120px]">
      <h1 className="mb-[60px]">slid to-do</h1>
      <LoginForm onSubmit={onLogin} />
    </div>
  );
};
