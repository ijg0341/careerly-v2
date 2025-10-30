'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface MarketAssetMiniCardProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent?: number;
  logo?: string | React.ReactNode;
  currency?: string;
  href?: string;
}

export const MarketAssetMiniCard = React.forwardRef<HTMLDivElement, MarketAssetMiniCardProps>(
  (
    {
      symbol,
      name,
      price,
      change,
      changePercent,
      logo,
      currency = '$',
      href,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = change >= 0;
    const changeColor = isPositive ? 'text-emerald-600' : 'text-red-600';
    const bgColor = isPositive ? 'bg-emerald-50' : 'bg-red-50';

    const content = (
      <Card
        ref={ref}
        className={cn(
          'p-3 hover:shadow-md transition-all',
          href && 'cursor-pointer',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Logo & Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Logo */}
            {logo && (
              <div className="shrink-0">
                {typeof logo === 'string' ? (
                  <img src={logo} alt={symbol} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    {logo}
                  </div>
                )}
              </div>
            )}

            {/* Symbol & Name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{symbol}</p>
              <p className="text-xs text-slate-500 truncate">{name}</p>
            </div>
          </div>

          {/* Price & Change */}
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-slate-900">
              {currency}{price.toLocaleString()}
            </p>
            <div className={cn('flex items-center justify-end gap-1 text-xs font-medium', changeColor)}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change.toFixed(2)}
                {changePercent !== undefined && ` (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`}
              </span>
            </div>
          </div>
        </div>

        {/* Change Badge */}
        <div className="mt-2">
          <div className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium', changeColor, bgColor)}>
            {isPositive ? '상승' : '하락'}
          </div>
        </div>
      </Card>
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

MarketAssetMiniCard.displayName = 'MarketAssetMiniCard';
