'use server';

import { cookies } from 'next/headers';

interface GetServerTokenProps {
  isAdmin: boolean;
}

export async function getServerToken({ isAdmin }: GetServerTokenProps) {
  const tokenName = isAdmin ? 'accessAdminToken' : 'accessToken';
  const token = cookies().get(tokenName)?.value;
  
  return token;
}
