import axiosInstance from "../../../../shared/api/axiosInstance";

export const logoutApi = async () => {
  try {
    await axiosInstance.post('/api/logout');
  } catch (error) {
    console.error('Logout API call failed:', error);
    throw error;
  }
};