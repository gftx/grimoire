import { api } from '@/shared/api/axiosInstance';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
}