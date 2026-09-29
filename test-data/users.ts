import { randomUUID } from 'node:crypto';
export interface UserData {
  username: string;
  password: string;
  role: 'Admin' | 'ESS';
  employeeName: string;
  status: 'Enabled' | 'Disabled';
}
export const validUser = (
  username: string,
  employeeName: string
): UserData => ({
  username,
  password: `Qa!${randomUUID()}`,
  role: 'ESS',
  employeeName,
  status: 'Enabled',
});
