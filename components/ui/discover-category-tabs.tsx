'use client';

import * as React from 'react';
import { CategoryTabs, CategoryTabsProps } from '@/components/ui/category-tabs';
import { cn } from '@/lib/utils';

export interface DiscoverCategoryTabsProps extends Omit<CategoryTabsProps, 'items' | 'activeId' | 'onChange'> {
  tabs?: Array<{
    id: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
  }>;
  showCounts?: boolean;
  activeId?: string;
  onChange?: (id: string) => void;
}

export const DiscoverCategoryTabs = React.forwardRef<HTMLDivElement, DiscoverCategoryTabsProps>(
  (
    {
      tabs = [
        { id: 'recommended', label: '추천' },
        { id: 'trending', label: '인기' },
        { id: 'latest', label: '최신' },
        { id: 'following', label: '팔로잉' },
      ],
      showCounts = true,
      activeId,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('border-b border-slate-200', className)}>
        <CategoryTabs
          items={tabs}
          activeId={activeId || tabs[0].id}
          onChange={onChange || (() => {})}
          {...props}
        />
      </div>
    );
  }
);

DiscoverCategoryTabs.displayName = 'DiscoverCategoryTabs';
