import { Request } from 'express';
import { CurrentUserPayload } from '../../auth/types/jwt-payload';

export interface RequestWithUser extends Request {
  user: CurrentUserPayload;
}
