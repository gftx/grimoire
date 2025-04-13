export type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
};

export type CurrentUserPayload = {
  id: string;
  email: string;
  role: string;
};
