'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertCircle, X } from 'lucide-react';

export interface ErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'fixed' | 'inline';
}

const ErrorBanner = React.forwardRef<HTMLDivElement, ErrorBannerProps>(
  (
    {
      message,
      retryLabel = '다시 시도',
      onRetry,
      onDismiss,
      variant = 'inline',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border border-red-200 bg-red-50 rounded-lg',
          variant === 'fixed' && 'fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-lg',
          variant === 'inline' && 'w-full',
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Icon */}
          <div className="shrink-0">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-800">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="text-red-700 hover:text-red-800 hover:bg-red-100"
              >
                {retryLabel}
              </Button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1 rounded hover:bg-red-100 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4 text-red-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ErrorBanner.displayName = 'ErrorBanner';

export { ErrorBanner };
