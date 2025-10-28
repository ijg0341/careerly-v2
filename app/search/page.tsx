'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Markdown } from '@/components/common/Markdown';
import { CitationList } from '@/components/common/CitationList';
import { searchCareer, type SearchResult } from '@/lib/api/search';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await searchCareer(query);
        setResult(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">검색어를 입력해주세요.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left/Center */}
        <div className="lg:col-span-2 space-y-6">
          {/* Query Display */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">{query}</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full" />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-3 py-8">
              <Loader2 className="w-5 h-5 animate-spin text-teal-500" />
              <span className="text-slate-600">AI가 답변을 생성하고 있습니다...</span>
            </div>
          )}

          {/* Results */}
          {!isLoading && result && (
            <div className="space-y-6">
              {/* Answer */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
                <Markdown content={result.answer} />
              </div>

              {/* Mobile Citations */}
              <div className="lg:hidden bg-slate-50 rounded-xl border border-slate-200 p-6">
                <CitationList citations={result.citations} />
              </div>
            </div>
          )}
        </div>

        {/* Citations Sidebar - Right */}
        <div className="hidden lg:block">
          <div className="sticky top-20 bg-slate-50 rounded-xl border border-slate-200 p-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            {!isLoading && result && (
              <CitationList citations={result.citations} />
            )}
            {isLoading && (
              <div className="text-center py-8 text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                <p className="text-sm">출처를 찾고 있습니다...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
