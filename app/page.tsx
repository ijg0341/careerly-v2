'use client';

import { useState } from 'react';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getTrendingKeywords } from '@/lib/api/search';
import { useStore } from '@/hooks/useStore';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { recentQueries, addRecentQuery } = useStore();
  const trendingKeywords = getTrendingKeywords();

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    addRecentQuery(searchQuery);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            커리어의 모든 것,
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
              AI와 함께 탐색하세요
            </span>
          </h1>
          <p className="text-lg text-slate-600">
            Perplexity 스타일의 AI 검색으로 커리어 정보를 빠르게 찾아보세요
          </p>
        </div>

        {/* Search Input */}
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up animation-delay-200"
        >
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="궁금한 커리어 정보를 검색해보세요..."
              className="w-full px-6 py-4 pr-14 text-base border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all shadow-md group-hover:shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Recent Queries */}
        {recentQueries.length > 0 && (
          <div className="animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">
                최근 검색
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentQueries.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSearch(item.query)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Keywords */}
        <div className="animate-fade-in-up animation-delay-600">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              인기 검색어
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleSearch(keyword)}
                className="tw-tag-sm hover:bg-teal-100 hover:text-teal-700 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
