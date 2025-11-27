/**
 * Chat API 라우트 (Django Backend 프록시)
 * CORS 우회를 위해 서버사이드에서 Django API 호출
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // Django 백엔드 Chat API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Django Chat API Error:', response.status, errorText);

      try {
        const error = JSON.parse(errorText);
        return NextResponse.json(
          { error: error.error || error.message || 'Chat API 호출 실패' },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { error: 'Chat API 호출 실패' },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);

    return NextResponse.json(
      {
        error: '채팅 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
