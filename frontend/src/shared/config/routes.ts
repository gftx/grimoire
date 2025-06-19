export const AppRoutes = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ME: '/me',
  VAULT: '/vault',
  KANBAN: '/kanban',
  PROJECTS: '/projects',
  PROJECT_BOARD: (id: string) => `/board/${id}`,
  SETTINGS: '/settings',
  TODAY: '/today',
  JOURNAL: '/journal',
  NOT_FOUND: '*',
} as const;
