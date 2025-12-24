'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface ShareLayoutProps {
  children: React.ReactNode;
}

/**
 * Share Page Layout
 * 공유 페이지 전용 레이아웃 - 인증 체크 없음
 * 사이드바 없이 심플한 헤더만 표시
 */
export default function ShareLayout({ children }: ShareLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    // 이전 페이지가 같은 사이트인지 확인
    const referrer = document.referrer;
    const isSameOrigin = referrer && new URL(referrer).origin === window.location.origin;

    if (isSameOrigin) {
      router.back();
    } else {
      // 외부에서 직접 접근한 경우 홈으로 이동
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header with safe area support for mobile apps */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">뒤로가기</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-slate-900">
                career<span className="text-coral-500">·</span>ly
              </span>
            </Link>
          </div>
          {/* 질문하기 버튼 제거 */}
        </div>
      </header>

      {/* Main Content - No sidebar padding */}
      <main className="min-h-[calc(100vh-56px)]">
        {children}
      </main>
    </div>
  );
}
