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
  password: 'TestUser123!',
  role: 'ESS',
  employeeName,
  status: 'Enabled',
});
