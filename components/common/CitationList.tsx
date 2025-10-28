'use client';

import { ExternalLink } from 'lucide-react';
import type { Citation } from '@/lib/api/search';

interface CitationListProps {
  citations: Citation[];
}

export function CitationList({ citations }: CitationListProps) {
  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        출처 및 참고자료
      </h3>
      {citations.map((citation, index) => (
        <a
          key={citation.id}
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-white border border-slate-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-start gap-2">
            <span className="flex-none w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-medium flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {citation.title}
                </h4>
                <ExternalLink className="flex-none w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {citation.snippet}
              </p>
              <p className="text-xs text-slate-400 mt-1 truncate">
                {citation.url}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
