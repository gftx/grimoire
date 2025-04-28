export const AppRoutes = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ME: '/me',
  PROJECTS: '/projects',
  PROJECT_BOARD: (id: string) => `/board/${id}`,
  SETTINGS: '/settings',
  NOT_FOUND: '*',
} as const;
