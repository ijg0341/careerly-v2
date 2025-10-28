'use client';

import { BookmarkIcon } from 'lucide-react';

export default function BookmarksPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <BookmarkIcon className="w-6 h-6 text-teal-500" />
          <h1 className="text-2xl font-bold text-slate-900">북마크</h1>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <BookmarkIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">저장된 북마크가 없습니다.</p>
          <p className="text-sm text-slate-400 mt-2">
            검색 결과를 북마크하여 나중에 다시 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
