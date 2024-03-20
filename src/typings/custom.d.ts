import { Request } from 'express';
import { UserInterface } from '../models/user.model';

declare module 'express' {
  interface Request {
    user?: UserInterface;
  }
}
