'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchInlineProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
  onClear?: () => void;
}

const SearchInline = React.forwardRef<HTMLInputElement, SearchInlineProps>(
  (
    {
      className,
      value,
      onChange,
      onSubmit,
      leadingIcon,
      trailingAction,
      onClear,
      placeholder = '검색...',
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || '');

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleClear = () => {
      setInternalValue('');
      onChange?.('');
      onClear?.();
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(internalValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit?.(internalValue);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className={cn(
            'relative flex items-center rounded-md border border-slate-300 bg-white transition-all duration-200',
            focused && 'ring-2 ring-coral-500 ring-offset-0 border-coral-500',
            'hover:border-slate-400',
            className
          )}
        >
          {/* Leading Icon */}
          <div className="absolute left-3 flex items-center pointer-events-none">
            {leadingIcon || <Search className="h-4 w-4 text-slate-400" />}
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="text"
            value={internalValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'w-full py-2 px-10 text-sm bg-transparent outline-none',
              'placeholder:text-slate-400',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            {...props}
          />

          {/* Trailing Actions */}
          <div className="absolute right-3 flex items-center gap-1">
            {internalValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded hover:bg-slate-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
            {trailingAction}
          </div>
        </div>
      </form>
    );
  }
);

SearchInline.displayName = 'SearchInline';

export { SearchInline };
