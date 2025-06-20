import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authService } from '@/shared/services/AuthService';
import { getAccessToken, clearTokens } from './token';

// To skip global 401 refresh logic for a request, pass { skipAuthRefresh: true } in axios config
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuthRefresh?: boolean;
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

let isRefreshing = false;
const queue: Array<(token: string | null) => void> = [];

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.skipAuthRefresh
    ) {
      if (original.url?.includes('/auth/logout')) return Promise.reject(error);
      if (isRefreshing) {
        return new Promise((resolve) => queue.push((token) => {
          if (token && original.headers) original.headers['Authorization'] = `Bearer ${token}`;
          resolve(api(original));
        }));
      }
      original._retry = true;
      isRefreshing = true;
      try {
        await authService.refreshTokens();
        const token = getAccessToken();
        queue.forEach((cb) => cb(token));
        queue.length = 0;
        if (token && original.headers) original.headers['Authorization'] = `Bearer ${token}`;
        return api(original);
      } catch (e) {
        queue.forEach((cb) => cb(null));
        queue.length = 0;
        await authService.logout();
        clearTokens();
        if (!['/login', '/register'].includes(window.location.pathname)) window.location.href = '/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
