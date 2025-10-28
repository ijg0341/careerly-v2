import * as React from 'react';
import { cn } from '@/lib/utils';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys: string | string[];
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, keys, ...props }, ref) => {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  return (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm',
        className
      )}
      {...props}
    >
      {keyArray.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-slate-400">+</span>}
          <span>{key}</span>
        </React.Fragment>
      ))}
    </kbd>
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
