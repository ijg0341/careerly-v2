'use client';

import * as React from 'react';
import { DiscoverContentCard, DiscoverContentCardProps } from '@/components/ui/discover-content-card';
import { LoadMore } from '@/components/ui/load-more';
import { cn } from '@/lib/utils';

export type DiscoverFeedLayout = 'grid' | 'list';

export interface DiscoverFeedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DiscoverContentCardProps[];
  layout?: DiscoverFeedLayout;
  pagination?: {
    hasMore?: boolean;
    loading?: boolean;
    onLoadMore?: () => void;
  };
  emptyMessage?: string;
}

export const DiscoverFeedSection = React.forwardRef<HTMLDivElement, DiscoverFeedSectionProps>(
  (
    {
      items,
      layout = 'grid',
      pagination,
      emptyMessage = '표시할 콘텐츠가 없습니다.',
      className,
      ...props
    },
    ref
  ) => {
    // Empty state
    if (items.length === 0) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-center py-12', className)}
          {...props}
        >
          <p className="text-slate-500 text-center">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {/* Feed Grid/List */}
        {layout === 'grid' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {items.map((item, index) => {
                const isHorizontal = (index + 1) % 4 === 0;
                const isLastInVerticalGroup = index % 4 === 2; // index 2, 6, 10... (3rd in each group)

                return (
                  <React.Fragment key={index}>
                    <DiscoverContentCard
                      {...item}
                      layout={isHorizontal ? 'horizontal' : 'vertical'}
                      className={cn(
                        isHorizontal && 'md:col-span-2 lg:col-span-3',
                        item.className
                      )}
                    />
                    {/* Add divider after 3rd vertical card or after horizontal card */}
                    {(isLastInVerticalGroup || isHorizontal) && index < items.length - 1 && (
                      <div className="md:col-span-2 lg:col-span-3 border-t border-slate-200 my-4" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <DiscoverContentCard
                  {...item}
                  layout="horizontal"
                  className="py-6"
                />
                {index < items.length - 1 && (
                  <div className="border-t border-slate-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Pagination / Load More */}
        {pagination && (
          <LoadMore
            hasMore={pagination.hasMore ?? false}
            loading={pagination.loading ?? false}
            onLoadMore={pagination.onLoadMore ?? (() => {})}
          />
        )}
      </div>
    );
  }
);

DiscoverFeedSection.displayName = 'DiscoverFeedSection';
