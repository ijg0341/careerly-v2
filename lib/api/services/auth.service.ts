/**
 * 인증 관련 API 서비스
 */

import { API_CONFIG } from '../config';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenResponse,
  User,
  OAuthProvider,
  OAuthLoginResponse,
  OAuthCallbackRequest,
} from '../types/rest.types';

/**
 * 로그인 (백엔드 직접 호출)
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 쿠키 전송 허용
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || '로그인에 실패했습니다.');
    }

    const data = await response.json();

    // Django 백엔드 응답 형식: { user, tokens: { access, refresh } }
    // 백엔드에서 httpOnly 쿠키를 직접 설정함
    return {
      user: data.user,
      tokens: {
        access: data.tokens.access,
        refresh: data.tokens.refresh,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
}

/**
 * 로그아웃 (백엔드 직접 호출)
 */
export async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/logout/`, {
      method: 'POST',
      credentials: 'include', // 쿠키 전송 허용
    });

    if (!response.ok) {
      throw new Error('로그아웃에 실패했습니다.');
    }
  } catch (error) {
    // 로그아웃 실패해도 로컬 상태는 클리어
    console.error('Logout error:', error);
  }
}

/**
 * 토큰 갱신 (백엔드 직접 호출)
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/refresh-cookie/`, {
      method: 'POST',
      credentials: 'include', // 쿠키 전송 허용
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data = await response.json();
    // 백엔드에서 새로운 httpOnly 쿠키를 설정함
    return { access: data.access };
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
}

/**
 * 현재 사용자 정보 조회 (백엔드 직접 호출)
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/users/me/`, {
      credentials: 'include', // 쿠키 전송 허용
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || '사용자 정보를 가져올 수 없습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('사용자 정보 조회 중 오류가 발생했습니다.');
  }
}

/**
 * 회원가입 (백엔드 직접 호출)
 */
export async function signup(data: RegisterRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 쿠키 전송 허용
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || '회원가입에 실패했습니다.');
    }

    const result = await response.json();

    // Django 백엔드 응답 형식: { user, tokens: { access, refresh } }
    // 백엔드에서 httpOnly 쿠키를 직접 설정함
    return {
      user: result.user,
      tokens: {
        access: result.tokens.access,
        refresh: result.tokens.refresh,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
}

/**
 * 비밀번호 재설정 요청
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/auth/password-reset/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '비밀번호 재설정 요청에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('비밀번호 재설정 요청 중 오류가 발생했습니다.');
  }
}

/**
 * 비밀번호 재설정 확인
 */
export async function verifyPasswordReset(
  email: string,
  code: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/auth/password-reset/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '비밀번호 재설정에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('비밀번호 재설정 중 오류가 발생했습니다.');
  }
}

/**
 * OAuth 인증 URL 가져오기 (백엔드 직접 호출)
 */
export async function initiateOAuthLogin(provider: OAuthProvider): Promise<OAuthLoginResponse> {
  try {
    // OAuth는 프론트엔드 API 라우트를 유지 (리다이렉트 처리 필요)
    const response = await fetch(`/api/auth/oauth/${provider}/login`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'OAuth 인증을 시작할 수 없습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('OAuth 인증 중 오류가 발생했습니다.');
  }
}

/**
 * OAuth 콜백 처리
 */
export async function handleOAuthCallback(
  data: OAuthCallbackRequest
): Promise<LoginResponse> {
  try {
    // OAuth는 프론트엔드 API 라우트를 유지 (복잡한 리다이렉트 처리 필요)
    const response = await fetch(`/api/auth/oauth/${data.provider}/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        code: data.code,
        ...(data.state && { state: data.state }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'OAuth 콜백 처리에 실패했습니다.');
    }

    const result = await response.json();

    return {
      user: result.user,
      tokens: {
        access: result.accessToken || result.tokens?.access,
        refresh: result.refreshToken || result.tokens?.refresh || '',
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('OAuth 콜백 처리 중 오류가 발생했습니다.');
  }
}
