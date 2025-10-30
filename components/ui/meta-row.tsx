'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Link as LinkComponent } from '@/components/ui/link';

export interface MetaItem {
  icon?: React.ReactNode;
  label: string;
  href?: string;
}

export interface MetaRowProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MetaItem[];
  separator?: React.ReactNode;
}

const MetaRow = React.forwardRef<HTMLDivElement, MetaRowProps>(
  ({ items, separator = '·', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-2 text-sm text-slate-600', className)} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-slate-400">{separator}</span>}
            {item.href ? (
              <LinkComponent
                href={item.href}
                variant="subtle"
                className="inline-flex items-center gap-1.5 hover:text-coral-500 transition-colors"
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </LinkComponent>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

MetaRow.displayName = 'MetaRow';

export { MetaRow };
