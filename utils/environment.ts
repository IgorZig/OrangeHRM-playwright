export const demoURL = 'https://opensource-demo.orangehrmlive.com';
export function adminCredentials() {
  const demo = new URL(process.env.BASE_URL || demoURL).origin === demoURL;
  const username = process.env.ADMIN_USERNAME || (demo ? 'Admin' : '');
  const password = process.env.ADMIN_PASSWORD || (demo ? 'admin123' : '');
  if (!username || !password)
    throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD for a non-demo environment.');
  return { username, password };
}
