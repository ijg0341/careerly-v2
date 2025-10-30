'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface Action {
  id: string;
  icon: React.ReactNode;
  label: string;
  pressed?: boolean;
}

export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: Action[];
  onAction: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ actions, onAction, size = 'md', className, ...props }, ref) => {
    return (
      <TooltipProvider>
        <div ref={ref} className={cn('flex items-center gap-1', className)} {...props}>
          {actions.map((action) => (
            <Tooltip key={action.id}>
              <TooltipTrigger asChild>
                <IconButton
                  variant="ghost"
                  size={size}
                  pressed={action.pressed}
                  onClick={() => onAction(action.id)}
                  aria-label={action.label}
                >
                  {action.icon}
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    );
  }
);

ActionBar.displayName = 'ActionBar';

export { ActionBar };
