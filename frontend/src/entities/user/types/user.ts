import { Role } from './role';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
}
