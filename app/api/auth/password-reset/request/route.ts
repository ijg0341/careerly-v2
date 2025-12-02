/**
 * 비밀번호 재설정 요청 API 라우트
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: '이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    // Django 백엔드 비밀번호 재설정 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/password-reset/request/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: error.error || error.message || '비밀번호 재설정 요청에 실패했습니다.'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: data.message || '인증 코드가 이메일로 전송되었습니다.',
    });
  } catch (error) {
    console.error('Password reset request error:', error);

    return NextResponse.json(
      {
        success: false,
        error: '비밀번호 재설정 요청 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
