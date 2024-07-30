import axiosInstance from "../../../../shared/api/axiosInstance";
import { LoginCredentials } from "../ui/login-form";

export const loginApi = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/api/login', credentials);
  return response.data;
};