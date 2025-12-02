/**
 * 비밀번호 재설정 확인 API 라우트
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { success: false, error: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Django 백엔드 비밀번호 재설정 확인
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/password-reset/verify/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          new_password: newPassword
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: error.error || error.message || '비밀번호 재설정에 실패했습니다.'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: data.message || '비밀번호가 성공적으로 변경되었습니다.',
    });
  } catch (error) {
    console.error('Password reset verify error:', error);

    return NextResponse.json(
      {
        success: false,
        error: '비밀번호 재설정 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
