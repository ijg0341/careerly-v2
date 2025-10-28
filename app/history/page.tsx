'use client';

import { Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function HistoryPage() {
  const { recentQueries, clearRecentQueries } = useStore();
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-teal-500" />
            <h1 className="text-2xl font-bold text-slate-900">검색 히스토리</h1>
          </div>
          {recentQueries.length > 0 && (
            <button
              onClick={clearRecentQueries}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              전체 삭제
            </button>
          )}
        </div>

        {/* History List */}
        {recentQueries.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">검색 기록이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentQueries.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSearch(item.query)}
                className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all text-left group"
              >
                <Search className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-medium truncate">
                    {item.query}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {dayjs(item.timestamp).fromNow()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
