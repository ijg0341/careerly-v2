'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Kbd } from '@/components/ui/kbd';

export interface ShortcutItem {
  keys: string[];
  description: string;
}

export interface KeyboardShortcutsHelpProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ShortcutItem[];
  title?: string;
}

const KeyboardShortcutsHelp = React.forwardRef<HTMLDivElement, KeyboardShortcutsHelpProps>(
  ({ items, title = '키보드 단축키', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        )}

        {/* Shortcuts List */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 py-2"
            >
              {/* Description */}
              <span className="text-sm text-slate-700">{item.description}</span>

              {/* Key Combination */}
              <div className="flex items-center gap-1 shrink-0">
                <Kbd keys={item.keys} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

KeyboardShortcutsHelp.displayName = 'KeyboardShortcutsHelp';

export { KeyboardShortcutsHelp };
