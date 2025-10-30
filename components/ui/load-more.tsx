'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDown } from 'lucide-react';

export interface LoadMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  hasMore: boolean;
  onLoadMore: () => void;
  loading?: boolean;
  loadingText?: string;
  loadMoreText?: string;
  endText?: string;
}

const LoadMore = React.forwardRef<HTMLDivElement, LoadMoreProps>(
  (
    {
      hasMore,
      onLoadMore,
      loading = false,
      loadingText = '로딩 중...',
      loadMoreText = '더 보기',
      endText = '모든 항목을 표시했습니다',
      className,
      ...props
    },
    ref
  ) => {
    // Intersection Observer for infinite scroll
    const sentinelRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore || loading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
      };
    }, [hasMore, loading, onLoadMore]);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center py-8 gap-4', className)}
        {...props}
      >
        {loading && (
          <div className="flex items-center gap-2 text-slate-600">
            <Spinner size="sm" />
            <span className="text-sm">{loadingText}</span>
          </div>
        )}

        {!loading && hasMore && (
          <>
            <Button variant="outline" onClick={onLoadMore} className="gap-2">
              {loadMoreText}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
          </>
        )}

        {!loading && !hasMore && (
          <p className="text-sm text-slate-500">{endText}</p>
        )}
      </div>
    );
  }
);

LoadMore.displayName = 'LoadMore';

export { LoadMore };
