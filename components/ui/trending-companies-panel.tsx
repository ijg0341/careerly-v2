'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { MarketAssetMiniCard, MarketAssetMiniCardProps } from '@/components/ui/market-asset-mini-card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

export interface TrendingCompaniesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  companies: MarketAssetMiniCardProps[];
  title?: string;
  maxItems?: number;
}

export const TrendingCompaniesPanel = React.forwardRef<HTMLDivElement, TrendingCompaniesPanelProps>(
  (
    {
      companies,
      title = '트렌딩 기업',
      maxItems,
      className,
      ...props
    },
    ref
  ) => {
    const displayedCompanies = maxItems ? companies.slice(0, maxItems) : companies;

    return (
      <Card ref={ref} className={cn('p-6', className)} {...props}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-coral-500" />
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-6">
          오늘 가장 많이 주목받는 기업들
        </p>

        {/* Companies List */}
        <div className="space-y-3">
          {displayedCompanies.map((company, index) => (
            <MarketAssetMiniCard
              key={company.symbol}
              {...company}
              className="shadow-none border-0 bg-slate-50"
            />
          ))}
        </div>

        {/* Footer */}
        {companies.length > displayedCompanies.length && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button className="w-full text-sm font-medium text-coral-500 hover:text-coral-600 transition-colors">
              {companies.length - displayedCompanies.length}개 더 보기
            </button>
          </div>
        )}
      </Card>
    );
  }
);

TrendingCompaniesPanel.displayName = 'TrendingCompaniesPanel';
