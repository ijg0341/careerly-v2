'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { UnifiedSearchPage } from '@/components/search/UnifiedSearchPage';

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-500" />
          <p className="text-slate-500">검색 중...</p>
        </div>
      }
    >
      <UnifiedSearchPage />
    </Suspense>
  );
}
