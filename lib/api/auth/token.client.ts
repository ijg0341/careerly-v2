/**
 * 클라이언트 사이드 토큰 유틸리티
 * 브라우저 환경에서 사용
 */

'use client';

import { API_CONFIG } from '../config';

/**
 * 클라이언트에서는 httpOnly 쿠키에 직접 접근할 수 없으므로
 * 백엔드 API를 직접 호출하여 쿠키를 관리합니다.
 *
 * 백엔드에서 httpOnly 쿠키를 직접 설정합니다.
 */

/**
 * 로그인 처리 (백엔드 직접 호출)
 */
export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 전송 허용
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '로그인에 실패했습니다.');
  }
}

/**
 * 로그아웃 처리 (백엔드 직접 호출)
 */
export async function logout(): Promise<void> {
  const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/logout/`, {
    method: 'POST',
    credentials: 'include', // 쿠키 전송 허용
  });

  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.');
  }
}

/**
 * 토큰 갱신 (백엔드 직접 호출)
 */
export async function refreshToken(): Promise<void> {
  const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/refresh-cookie/`, {
    method: 'POST',
    credentials: 'include', // 쿠키 전송 허용
  });

  if (!response.ok) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
}

/**
 * 현재 인증 상태 확인 (백엔드 직접 호출)
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/users/me/`, {
      credentials: 'include', // 쿠키 전송 허용
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * 클라이언트에서 사용할 수 있는 간단한 메모리 토큰 저장소
 * (백업용, httpOnly 쿠키가 주 인증 수단)
 */
let memoryToken: string | null = null;

export function setMemoryToken(token: string): void {
  memoryToken = token;
}

export function getMemoryToken(): string | null {
  return memoryToken;
}

export function clearMemoryToken(): void {
  memoryToken = null;
}

/**
 * SSE나 다른 용도로 토큰이 필요할 때 사용
 * (httpOnly 쿠키로는 EventSource에 토큰을 전달할 수 없음)
 */
export function getAuthToken(): string | null {
  return memoryToken;
}
