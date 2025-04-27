import { api } from '@/shared/api/axiosInstance';

export type User = {
  id: string;
  email: string;
  role?: string;
};

export async function getMe(): Promise<User> {
  const response = await api.get<User>('/auth/me');
  return response.data;
}