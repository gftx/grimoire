import { api } from '@/shared/lib/axios';
import { Role } from '@/entities/user/types/role';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface RefreshTokenDto {
  refreshToken: string;
}

// Что приходит с ручки /auth/me
interface MeResponse {
  userId: string;
  email: string;
  username: string;
  role: Role; // строго наш enum
}

export const authApi = {
  register: async (dto: RegisterDto): Promise<Tokens> => {
    const response = await api.post('/auth/register', dto);
    return response.data;
  },

  login: async (dto: LoginDto): Promise<Tokens> => {
    const response = await api.post('/auth/login', dto);
    return response.data;
  },

  refresh: async (dto: RefreshTokenDto): Promise<Tokens> => {
    const response = await api.post('/auth/refresh', dto);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  me: async (): Promise<MeResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
