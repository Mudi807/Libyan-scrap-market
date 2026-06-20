// src/lib/api.ts
//
// Thin wrapper around fetch() for talking to the backend API.
// Set NEXT_PUBLIC_API_URL in your .env.local to point at your
// backend (e.g. http://localhost:5000 or your deployed Vercel URL).

import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lsm-token') : null;

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    const data = await res.json();
    return data as ApiResponse<T>;
  } catch (error) {
    return {
      success: false,
      message: 'Unable to reach the server. Please try again later.',
    };
  }
}
