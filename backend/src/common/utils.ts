import { SafeUser } from './types';

export function sanitizeUser(user: any): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser as SafeUser;
}
