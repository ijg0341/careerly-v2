/**
 * OAuth 콜백 API 라우트
 * OAuth 제공자로부터 받은 인증 코드를 Django 백엔드로 전달하여 토큰을 받음
 */

import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_PROVIDERS = ['kakao', 'apple'];

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  try {
    const { provider } = params;

    // Provider 검증
    if (!ALLOWED_PROVIDERS.includes(provider)) {
      return NextResponse.json(
        { success: false, error: '지원하지 않는 OAuth 제공자입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Django 백엔드 OAuth 콜백 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/oauth/${provider}/callback/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: error.error || error.message || 'OAuth 인증에 실패했습니다.'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // NextResponse에 httpOnly 쿠키 설정
    const res = NextResponse.json({
      success: true,
      user: data.user,
      accessToken: data.tokens.access,
    });

    res.cookies.set('accessToken', data.tokens.access, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    res.cookies.set('refreshToken', data.tokens.refresh, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30, // 30일
    });

    return res;

  } catch (error) {
    console.error('OAuth callback error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'OAuth 인증 처리 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  try {
    const { provider } = params;

    // Provider 검증
    if (!ALLOWED_PROVIDERS.includes(provider)) {
      return NextResponse.json(
        { success: false, error: '지원하지 않는 OAuth 제공자입니다.' },
        { status: 400 }
      );
    }

    // URL 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // OAuth 제공자에서 에러가 발생한 경우
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent(error)}`
      );
    }

    // 인증 코드가 없는 경우
    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login?error=no_code`
      );
    }

    // Django 백엔드로 인증 코드 전달
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/oauth/${provider}/callback/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login?error=${encodeURIComponent(errorData.error || 'oauth_failed')}`
      );
    }

    const data = await response.json();

    // 성공 시 홈으로 리다이렉트하면서 쿠키 설정
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/`;
    const res = NextResponse.redirect(redirectUrl);

    res.cookies.set('accessToken', data.tokens.access, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    res.cookies.set('refreshToken', data.tokens.refresh, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30, // 30일
    });

    return res;

  } catch (error) {
    console.error('OAuth callback GET error:', error);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login?error=oauth_error`
    );
  }
}
