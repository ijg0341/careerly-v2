'use client';

import { cn } from '@/lib/utils';

export interface CategoryOption<T extends string = string> {
  id: T;
  label: string;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export interface CategoryFilterProps<T extends string = string> {
  categories: CategoryOption<T>[];
  selected: T;
  onChange: (id: T) => void;
  description?: string;
}

export function CategoryFilter<T extends string = string>({
  categories,
  selected,
  onChange,
  description,
}: CategoryFilterProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 border',
              selected === cat.id
                ? `${cat.bgClass} ${cat.borderClass} ${cat.textClass}`
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
      {description && <p className="text-xs text-slate-400">{description}</p>}
    </div>
  );
}

// 블로그용 카테고리 (5개)
export type BlogAICategory = 'ai-dev' | 'ai-design' | 'ai-biz' | 'ai-general' | 'other';

export const blogCategories: CategoryOption<BlogAICategory>[] = [
  {
    id: 'ai-dev',
    label: 'AI & Dev',
    icon: '🤖',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-300',
  },
  {
    id: 'ai-design',
    label: 'AI & Design',
    icon: '🎨',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-700',
    borderClass: 'border-pink-300',
  },
  {
    id: 'ai-biz',
    label: 'AI & Biz',
    icon: '💼',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-300',
  },
  {
    id: 'ai-general',
    label: 'AI 일반',
    icon: '✨',
    bgClass: 'bg-teal-100',
    textClass: 'text-teal-700',
    borderClass: 'border-teal-300',
  },
  {
    id: 'other',
    label: '기타',
    icon: '📝',
    bgClass: 'bg-slate-200',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-300',
  },
];

// 도서/강의용 카테고리 (전체 포함 6개)
export type ContentAICategory = 'all' | 'ai-dev' | 'ai-design' | 'ai-biz' | 'ai-general' | 'other';

export const contentCategories: CategoryOption<ContentAICategory>[] = [
  {
    id: 'all',
    label: '전체',
    icon: '📋',
    bgClass: 'bg-slate-100',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-300',
  },
  ...blogCategories,
];
