import { loginApi } from "../api/loginApi";
import { LoginCredentials } from "../ui/login-form";

export const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const { accessToken, refreshToken } = await loginApi(credentials);

    // 토큰 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
