'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';

export interface InterestCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface InterestSelectorPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  categories: InterestCategory[];
  selectedCategories?: string[];
  onToggle?: (categoryId: string) => void;
  onSave?: (selectedIds: string[]) => void;
  title?: string;
  description?: string;
  saveLabel?: string;
  resetLabel?: string;
}

export const InterestSelectorPanel = React.forwardRef<HTMLDivElement, InterestSelectorPanelProps>(
  (
    {
      categories,
      selectedCategories = [],
      onToggle,
      onSave,
      title = '관심사 선택',
      description = '관심 있는 주제를 선택하여 맞춤 콘텐츠를 받아보세요.',
      saveLabel = '저장',
      resetLabel = '초기화',
      className,
      ...props
    },
    ref
  ) => {
    const [localSelected, setLocalSelected] = React.useState<string[]>(selectedCategories);

    React.useEffect(() => {
      setLocalSelected(selectedCategories);
    }, [selectedCategories]);

    const handleToggle = (categoryId: string) => {
      const newSelected = localSelected.includes(categoryId)
        ? localSelected.filter((id) => id !== categoryId)
        : [...localSelected, categoryId];

      setLocalSelected(newSelected);
      onToggle?.(categoryId);
    };

    const handleSave = () => {
      onSave?.(localSelected);
    };

    const handleReset = () => {
      setLocalSelected([]);
      if (onToggle) {
        // Reset all selections
        localSelected.forEach((id) => onToggle(id));
      }
    };

    return (
      <Card ref={ref} className={cn('p-4', className)} {...props}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Settings className="h-5 w-5 text-coral-500" />
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-600 mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Chip
                key={category.id}
                selected={localSelected.includes(category.id)}
                onToggle={() => handleToggle(category.id)}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.label}
              </Chip>
            ))}
          </div>

          {/* Selection Count */}
          <p className="text-xs text-slate-500">
            {localSelected.length}개 선택됨
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
          <Button
            variant="solid"
            size="sm"
            onClick={handleSave}
            disabled={localSelected.length === 0}
            className="flex-1"
          >
            {saveLabel}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={localSelected.length === 0}
          >
            {resetLabel}
          </Button>
        </div>
      </Card>
    );
  }
);

InterestSelectorPanel.displayName = 'InterestSelectorPanel';
