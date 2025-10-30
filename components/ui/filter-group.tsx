'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  value?: string;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'select' | 'switch';
  options?: FilterOption[];
  multiple?: boolean;
}

export interface FilterGroupProps {
  sections: FilterSection[];
  values: Record<string, string | string[] | boolean>;
  onChange: (sectionId: string, value: string | string[] | boolean) => void;
  onReset?: () => void;
  className?: string;
}

const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ sections, values, onChange, onReset, className }, ref) => {
    const hasActiveFilters = React.useMemo(() => {
      return Object.values(values).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'boolean') return value;
        return !!value;
      });
    }, [values]);

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        {/* Header with Reset Button */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">필터</h3>
          {onReset && hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
              <RotateCcw className="h-3.5 w-3.5" />
              초기화
            </Button>
          )}
        </div>

        {/* Filter Sections */}
        {sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">{section.title}</h4>

            {section.type === 'checkbox' && section.options && (
              <div className="space-y-2">
                {section.options.map((option) => {
                  const sectionValues = (values[section.id] || []) as string[];
                  const isChecked = sectionValues.includes(option.id);

                  return (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${section.id}-${option.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const currentValues = (values[section.id] || []) as string[];
                          const newValues = checked
                            ? [...currentValues, option.id]
                            : currentValues.filter((v) => v !== option.id);
                          onChange(section.id, newValues);
                        }}
                      />
                      <Label
                        htmlFor={`${section.id}-${option.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}

            {section.type === 'select' && section.options && (
              <Select
                value={(values[section.id] as string) || ''}
                onValueChange={(value) => onChange(section.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {section.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {section.type === 'switch' && section.options && (
              <div className="space-y-2">
                {section.options.map((option) => {
                  const isChecked = values[option.id] as boolean;

                  return (
                    <div key={option.id} className="flex items-center justify-between">
                      <Label htmlFor={`${section.id}-${option.id}`} className="text-sm font-normal">
                        {option.label}
                      </Label>
                      <Switch
                        id={`${section.id}-${option.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => onChange(option.id, checked)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';

export { FilterGroup };
