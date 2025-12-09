'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (추후 에러 트래킹 서비스 연동 가능)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center space-y-6">
        {/* 아이콘 */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* 메시지 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">
            문제가 발생했습니다
          </h1>
          <p className="text-slate-600">
            일시적인 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <Button onClick={reset} variant="solid" className="w-full">
            <RotateCcw className="w-4 h-4" />
            다시 시도
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
