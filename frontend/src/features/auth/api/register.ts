import { api } from '@/shared/api/axiosInstance';

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function register(email: string, password: string): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/auth/register', { email, password });
  return response.data;
}