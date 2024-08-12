import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../config/token';

const API_URL = 'https://api.jtodo.site';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function serverFetch(path: string, options: FetchOptions = {}) {
  const { params, ...fetchOptions } = options;

  const url = new URL(path, API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  const headers = new Headers(fetchOptions.headers);
  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401 && refreshToken) {
      // Try to refresh the token
      const refreshResponse = await fetch(`${API_URL}/member/token/refresh`, {
        method: 'GET',
        headers: {
          Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
        },
      });

      if (refreshResponse.ok) {
        const { access_token } = await refreshResponse.json();
        cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, access_token);

        // Retry the original request with the new token
        headers.set('Authorization', `Bearer ${access_token}`);
        const retryResponse = await fetch(url.toString(), {
          ...fetchOptions,
          headers,
        });

        if (retryResponse.ok) {
          return retryResponse.json();
        }
      }

      // If refresh failed, redirect to login
      redirect('/login');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
