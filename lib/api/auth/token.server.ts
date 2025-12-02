/**
 * 서버 사이드 토큰 관리
 * Next.js 서버 액션과 API 라우트에서 사용
 *
 * 주의: 쿠키 설정은 백엔드에서 직접 처리합니다.
 * 이 파일은 쿠키 읽기 전용으로 사용됩니다.
 */

import { cookies } from 'next/headers';
import { ApiError, ERROR_CODES, ERROR_MESSAGES } from '../types/error.types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * 인증 쿠키 조회
 */
export async function getAuthCookies(): Promise<{
  accessToken: string | undefined;
  refreshToken: string | undefined;
}> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_KEY)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_KEY)?.value,
  };
}

/**
 * Access Token 조회
 */
export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}

/**
 * Refresh Token 조회
 */
export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_KEY)?.value;
}

/**
 * Access Token 갱신 (백엔드 직접 호출)
 * 백엔드에서 쿠키를 직접 설정하므로 이 함수는 단순히 요청만 수행
 */
export async function refreshAccessToken(): Promise<string> {
  try {
    // Django 백엔드 토큰 갱신 요청 (쿠키 기반)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh-cookie/`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new ApiError(
        401,
        ERROR_CODES.REFRESH_FAILED,
        ERROR_MESSAGES.REFRESH_FAILED
      );
    }

    const data = await response.json();
    // 백엔드에서 새로운 httpOnly 쿠키를 설정함
    return data.access;
  } catch (error) {
    throw error;
  }
}

/**
 * 인증 여부 확인
 */
export async function isAuthenticated(): Promise<boolean> {
  const { accessToken } = await getAuthCookies();
  return !!accessToken;
}

/**
 * 서버 사이드 API 요청에 사용할 Authorization 헤더 생성
 */
export async function getAuthHeader(): Promise<Record<string, string>> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
