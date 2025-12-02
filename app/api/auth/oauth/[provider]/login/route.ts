/**
 * OAuth 로그인 시작 API 라우트
 * Django 백엔드에서 OAuth 로그인 URL을 가져와서 프론트엔드에 전달
 */

import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_PROVIDERS = ['kakao', 'apple'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;

    // Provider 검증
    if (!ALLOWED_PROVIDERS.includes(provider)) {
      return NextResponse.json(
        { success: false, error: '지원하지 않는 OAuth 제공자입니다.' },
        { status: 400 }
      );
    }

    // Django 백엔드 OAuth 로그인 요청
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/oauth/${provider}/login/`;

    console.log('[OAuth Login] Requesting:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[OAuth Login] Backend error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.error || error.message || 'OAuth 로그인 URL을 가져오는데 실패했습니다.'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[OAuth Login] Backend response:', data);

    // Django 응답의 authorization_url을 프론트엔드가 기대하는 authUrl로 변환
    if (data.authorization_url) {
      return NextResponse.json({
        authUrl: data.authorization_url
      });
    }

    // 이미 authUrl 형식이면 그대로 반환
    if (data.authUrl) {
      return NextResponse.json(data);
    }

    // 둘 다 없으면 에러
    return NextResponse.json(
      {
        success: false,
        error: 'OAuth 로그인 URL을 가져오는데 실패했습니다.',
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('[OAuth Login] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'OAuth 로그인 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
