import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authService } from '@/shared/services/AuthService';
import { useAuthStore } from '@/store/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Очередь запросов, которые ждут новый access token
const failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

let isRefreshing = false;

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue.length = 0;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const authStore = useAuthStore.getState();

      // ⚡  Если запрос шёл на logout — НЕ рефрешим, просто падаем
      if (originalRequest.url?.includes('/auth/logout')) {
        authStore.setRefreshing(false);
        return Promise.reject(error);
      }

      // ⚡  Если кто-то уже рефрешит — ставим запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // ⚡  Начинаем рефреш токенов
      originalRequest._retry = true;
      isRefreshing = true;
      authStore.setRefreshing(true);

      try {
        await authService.refreshTokens();
        const newAccessToken = localStorage.getItem('accessToken');
        
        if (originalRequest.headers && newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
      
        authStore.setRefreshing(false);
        isRefreshing = false;
      
        await authService.logout();
      
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          window.location.href = '/login';
        }
      
        return Promise.reject(refreshError);
      } finally {
        authStore.setRefreshing(false);
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
