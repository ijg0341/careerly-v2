'use client';

import { cn } from '@/lib/utils';

export interface SourceItemData {
  id: string;
  name: string;
  logo?: string;
  updateLabel?: string;
  changeCount?: number;
  isUpdatedToday?: boolean;
}

export interface SourceListItemProps {
  source: SourceItemData;
  variant?: 'purple' | 'teal' | 'amber' | 'blue';
  isSelected?: boolean;
  onClick?: () => void;
}

const variantConfig = {
  purple: {
    hoverText: 'group-hover:text-purple-700',
    selectedText: 'text-purple-700',
    countText: 'text-purple-600',
    selectedBg: 'bg-purple-50 border-purple-200',
  },
  teal: {
    hoverText: 'group-hover:text-teal-700',
    selectedText: 'text-teal-700',
    countText: 'text-teal-600',
    selectedBg: 'bg-teal-50 border-teal-200',
  },
  amber: {
    hoverText: 'group-hover:text-amber-700',
    selectedText: 'text-amber-700',
    countText: 'text-amber-600',
    selectedBg: 'bg-amber-50 border-amber-200',
  },
  blue: {
    hoverText: 'group-hover:text-blue-700',
    selectedText: 'text-blue-700',
    countText: 'text-blue-600',
    selectedBg: 'bg-blue-50 border-blue-200',
  },
};

export function SourceListItem({ source, variant = 'teal', isSelected, onClick }: SourceListItemProps) {
  const config = variantConfig[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between p-2.5 rounded-lg transition-colors cursor-pointer border',
        isSelected
          ? config.selectedBg
          : 'border-transparent hover:bg-slate-50 hover:border-slate-100'
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
          {source.logo ? (
            <img
              src={source.logo}
              alt={source.name}
              className="w-full h-full object-contain p-0.5"
            />
          ) : (
            <span className="text-[10px] font-bold text-slate-400">{source.name[0]}</span>
          )}
          {source.isUpdatedToday && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'text-sm font-medium transition-colors truncate',
                isSelected ? config.selectedText : `text-slate-700 ${config.hoverText}`
              )}
            >
              {source.name}
            </span>
            {source.isUpdatedToday && (
              <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium flex-shrink-0">
                NEW
              </span>
            )}
          </div>
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
