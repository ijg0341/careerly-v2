'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface CategoryTabItem {
  id: string;
  label: string;
  count?: number;
}

export interface CategoryTabsProps {
  items: CategoryTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const CategoryTabs = React.forwardRef<HTMLDivElement, CategoryTabsProps>(
  ({ items, activeId, onChange, className }, ref) => {
    return (
      <div ref={ref} className={cn('border-b border-slate-200', className)}>
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  'group relative inline-flex items-center gap-2 border-b-2 py-3 px-1 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2',
                  isActive
                    ? 'border-coral-500 text-coral-600'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-800'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <Badge
                    tone={isActive ? 'coral' : 'default'}
                    className={cn(
                      'min-w-[20px] h-5 px-1.5 text-xs'
                    )}
                  >
                    {item.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }
);

CategoryTabs.displayName = 'CategoryTabs';

export { CategoryTabs };
