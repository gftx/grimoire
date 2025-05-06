import { authApi } from "@/shared/api/auth";
import { useAuthStore } from "@/store/auth";

class AuthService {
  async register(email: string, username: string, password: string) {
    const tokens = await authApi.register({ email, username, password });
    this.handleTokens(tokens);
    const me = await authApi.me();
    useAuthStore.getState().setUser({
      id: me.userId,
      email: me.email,
      username: me.username,
    });
  }

  async login(email: string, password: string) {
    const tokens = await authApi.login({ email, password });
    this.handleTokens(tokens);
    const me = await authApi.me();
    useAuthStore.getState().setUser({
      id: me.userId,
      email: me.email,
      username: me.username
    });
  }

  async logout() {
    try {
      await authApi.logout();
    } catch {
      // всё равно чистим
    }
    this.clearTokens();
    useAuthStore.getState().clearUser();
  }

  async refreshTokens() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const tokens = await authApi.refresh({ refreshToken });
    this.handleTokens(tokens);
  }

  private handleTokens(tokens: { accessToken: string; refreshToken: string }) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }

  private clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }
}

export const authService = new AuthService();
