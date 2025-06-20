export const TOKEN_KEY = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export function setTokens(tokens: { accessToken: string; refreshToken: string }) {
  localStorage.setItem(TOKEN_KEY.access, tokens.accessToken);
  localStorage.setItem(TOKEN_KEY.refresh, tokens.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY.access);
  localStorage.removeItem(TOKEN_KEY.refresh);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY.access);
}

export function getRefreshToken() {
  return localStorage.getItem(TOKEN_KEY.refresh);
} 