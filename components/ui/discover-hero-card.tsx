'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

export interface DiscoverHeroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  summary?: string;
  imageUrl: string;
  href?: string;
  badge?: string;
  badgeTone?: 'default' | 'slate' | 'coral' | 'success' | 'warning';
  overlay?: boolean;
}

export const DiscoverHeroCard = React.forwardRef<HTMLDivElement, DiscoverHeroCardProps>(
  (
    {
      title,
      summary,
      imageUrl,
      href,
      badge = '추천',
      badgeTone = 'coral',
      overlay = true,
      className,
      ...props
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn('overflow-hidden group cursor-pointer flex flex-row gap-6 items-center', className)}
        {...props}
      >
        {/* Hero Image */}
        <div className="relative w-2/5 aspect-[16/9] overflow-hidden rounded-lg shrink-0 border border-slate-200">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge tone={badgeTone} icon={<TrendingUp />}>
                {badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Content - Right side */}
        <div className="flex-1 space-y-5">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-coral-500 group-hover:underline transition-colors leading-tight">
            {title}
          </h2>

          {/* Summary */}
          {summary && (
            <p className="text-base text-slate-600 line-clamp-3 leading-relaxed">
              {summary}
            </p>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <a href={href} className="block">
          {content}
        </a>
      );
    }

    return content;
  }
);

DiscoverHeroCard.displayName = 'DiscoverHeroCard';
