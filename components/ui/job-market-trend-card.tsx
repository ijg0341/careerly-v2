'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Briefcase } from 'lucide-react';

export interface JobMarketTrend {
  id: string;
  category: string;
  position: string;
  postingCount: number;
  change: number;
  changePercent: number;
  chart?: number[];
}

export interface JobMarketTrendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trends: JobMarketTrend[];
  title?: string;
}

export const JobMarketTrendCard = React.forwardRef<HTMLDivElement, JobMarketTrendCardProps>(
  (
    {
      trends,
      title = '채용 시장 동향',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-coral-500" />
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>

        {/* Trends Grid - 2 columns, each item is a card */}
        <div className="grid grid-cols-2 gap-3">
          {trends.map((trend) => {
            const isPositive = trend.change >= 0;
            const changeColor = isPositive ? 'text-emerald-600' : 'text-red-600';
            const bgColor = isPositive ? 'bg-emerald-50' : 'bg-red-50';

            return (
              <Card
                key={trend.id}
                className="p-3 hover:border-slate-400 transition-colors"
              >
                {/* Category Badge */}
                <div className="mb-1">
                  <span className="text-xs text-slate-500">{trend.category}</span>
                </div>

                {/* Position */}
                <h4 className="text-xs font-bold text-slate-900 mb-2 line-clamp-1">
                  {trend.position}
                </h4>

                {/* Posting Count */}
                <p className="text-lg font-bold text-slate-900 mb-2">
                  {trend.postingCount.toLocaleString()}개
                </p>

                {/* Chart Mini Visualization */}
                {trend.chart && trend.chart.length > 0 && (
                  <div className="w-full h-8 mb-2">
                    <svg width="100%" height="100%" className="overflow-visible">
                      <polyline
                        fill="none"
                        stroke={isPositive ? '#10b981' : '#ef4444'}
                        strokeWidth="2"
                        points={trend.chart
                          .map((value, index) => {
                            const x = (index / (trend.chart!.length - 1)) * 100;
                            const minVal = Math.min(...trend.chart!);
                            const maxVal = Math.max(...trend.chart!);
                            const y = 100 - ((value - minVal) / (maxVal - minVal)) * 100;
                            return `${x}%,${y}%`;
                          })
                          .join(' ')}
                      />
                    </svg>
                  </div>
                )}

                {/* Change Info */}
                <div className="flex items-center gap-2">
                  <div className={cn('flex items-center gap-1 text-xs font-bold', changeColor)}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}
                      {trend.change}
                    </span>
                  </div>
                  <div className={cn('text-xs font-medium px-1.5 py-0.5 rounded', changeColor, bgColor)}>
                    {isPositive ? '+' : ''}
                    {trend.changePercent.toFixed(1)}%
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 text-center">
            실시간 채용공고 데이터 (업데이트: 매일 오전 9시)
          </p>
        </div>
      </div>
    );
  }
);

JobMarketTrendCard.displayName = 'JobMarketTrendCard';
