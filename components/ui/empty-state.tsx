'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Inbox, Filter } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  variant?: 'search' | 'empty' | 'filter';
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      description,
      actionLabel,
      onAction,
      icon,
      variant = 'empty',
      className,
      ...props
    },
    ref
  ) => {
    const defaultIcons = {
      search: <Search className="h-12 w-12 text-slate-300" />,
      empty: <Inbox className="h-12 w-12 text-slate-300" />,
      filter: <Filter className="h-12 w-12 text-slate-300" />,
    };

    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center py-16 px-4 text-center',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="mb-4 rounded-full bg-slate-100 p-6">
          {displayIcon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-600 max-w-sm mb-6">
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="outline">
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
