'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { UnifiedSearchPage } from '@/components/search/UnifiedSearchPage';

function SessionPageContent() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  return <UnifiedSearchPage initialSessionId={sessionId} />;
}

export default function SessionPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-500" />
          <p className="text-slate-500">로딩 중...</p>
        </div>
      }
    >
      <SessionPageContent />
    </Suspense>
  );
}
