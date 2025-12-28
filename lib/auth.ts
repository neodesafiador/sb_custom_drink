import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === 'authenticated';
}

export async function setAuthenticated() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24時間
  });
}

export async function clearAuthentication() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
