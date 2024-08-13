'use server';

import { cookies } from 'next/headers';

export const getServerToken = async () => {
  return cookies().get('accessToken')?.value;
};
