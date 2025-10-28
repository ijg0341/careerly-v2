import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
        selected: 'bg-slate-700 border border-slate-700 text-white',
        coral: 'bg-coral-500 border border-coral-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  selected?: boolean;
  dismissible?: boolean;
  onToggle?: () => void;
  onDismiss?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, selected = false, dismissible = false, onToggle, onDismiss, children, ...props }, ref) => {
    const handleClick = () => {
      if (onToggle) {
        onToggle();
      }
    };

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDismiss) {
        onDismiss();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant: selected ? 'selected' : variant, className }))}
        onClick={handleClick}
        role={onToggle ? 'button' : undefined}
        aria-pressed={onToggle ? selected : undefined}
        tabIndex={onToggle ? 0 : undefined}
        {...props}
      >
        {children}
        {dismissible && (
          <button
            type="button"
            className="ml-1 rounded-full hover:bg-black/10 p-0.5"
            onClick={handleDismiss}
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
