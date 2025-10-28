import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      default: 'text-slate-400',
      brand: 'text-coral-500',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  ariaLabel?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, color, ariaLabel = 'Loading...', ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn(spinnerVariants({ size, color, className }))}
        aria-label={ariaLabel}
        role="status"
        {...props}
      />
    );
  }
);
Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
