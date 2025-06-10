import { api } from "@/shared/lib/axios";
import { showSuccess, showError } from "@/shared/lib/toast";
import { AxiosError } from "axios";

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
interface MeResponse {
  userId: string;
  email: string;
  username: string;
}

export const authApi = {
  register: async (dto: RegisterDto): Promise<Tokens | null> => {
    try {
      const response = await api.post("/auth/register", dto);
      showSuccess("Successfully registered!");
      return response.data;
    } catch (error) {
      console.error("err", error);
      showError("Register failed. Please check your credentials.");
      return null;
    }
  },

  login: async (dto: LoginDto): Promise<Tokens | null> => {
    try {
      const response = await api.post("/auth/login", dto);
      showSuccess("Successfully logged in!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<string>;
      if (error?.response?.status === 401) {
        showError("Неверный логин или пароль");
      } else if (error?.response?.data) {
        showError(error.response.data);
      } else {
        showError("Что-то пошло не так. Попробуй позже.");
        showError(JSON.stringify(error.response));
      }
      return null;
    }
  },

  refresh: async (dto: RefreshTokenDto): Promise<Tokens> => {
    const response = await api.post("/auth/refresh", dto);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  me: async (): Promise<MeResponse> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
