'use client';

import { cn } from '@/lib/utils';

export interface SourceItemData {
  id: string;
  name: string;
  logo?: string;
  updateLabel?: string;
  changeCount?: number;
}

export interface SourceListItemProps {
  source: SourceItemData;
  variant?: 'purple' | 'teal' | 'amber' | 'blue';
  onClick?: () => void;
}

const variantConfig = {
  purple: {
    hoverText: 'group-hover:text-purple-700',
    countText: 'text-purple-600',
  },
  teal: {
    hoverText: 'group-hover:text-teal-700',
    countText: 'text-teal-600',
  },
  amber: {
    hoverText: 'group-hover:text-amber-700',
    countText: 'text-amber-600',
  },
  blue: {
    hoverText: 'group-hover:text-blue-700',
    countText: 'text-blue-600',
  },
};

export function SourceListItem({ source, variant = 'teal', onClick }: SourceListItemProps) {
  const config = variantConfig[variant];

  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {source.logo ? (
            <img
              src={source.logo}
              alt={source.name}
              className="w-full h-full object-contain p-0.5"
            />
          ) : (
            <span className="text-[10px] font-bold text-slate-400">{source.name[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              'text-sm font-medium text-slate-700 transition-colors truncate block',
              config.hoverText
            )}
          >
            {source.name}
          </span>
          {source.updateLabel && (
            <span className="text-xs text-slate-400">{source.updateLabel}</span>
          )}
        </div>
      </div>
      {source.changeCount !== undefined && source.changeCount > 0 && (
        <div className={cn('flex items-center gap-1 text-xs font-medium flex-shrink-0', config.countText)}>
          <span>+{source.changeCount}</span>
        </div>
      )}
    </div>
  );
}
