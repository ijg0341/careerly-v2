'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, ChevronDown, ChevronRight } from 'lucide-react';

export interface TodayJob {
  id: string;
  url: string;
  title: string;
  company: {
    name: string;
    symbolImageUrl: string;
  };
}

export interface TodayJobsCompany {
  company: {
    id: string;
    name: string;
    symbolImageUrl: string;
  };
  jobs: TodayJob[];
}

export interface TodayJobsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  companies: TodayJobsCompany[];
  title?: string;
  maxItems?: number;
}

export const TodayJobsPanel = React.forwardRef<HTMLDivElement, TodayJobsPanelProps>(
  (
    {
      companies,
      title = '오늘의 채용',
      maxItems = 5,
      className,
      ...props
    },
    ref
  ) => {
    const displayedCompanies = companies.slice(0, maxItems);
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

    const toggleExpand = (companyId: string) => {
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(companyId)) {
          newSet.delete(companyId);
        } else {
          newSet.add(companyId);
        }
        return newSet;
      });
    };

    return (
      <Card ref={ref} className={cn('p-4', className)} {...props}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-5 w-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4">
          오늘 새로 올라온 채용공고
        </p>

        {/* Companies List - Accordion */}
        <div className="-mx-4">
          {displayedCompanies.map((item, index) => {
            const isExpanded = expandedIds.has(item.company.id);
            const isLast = index === displayedCompanies.length - 1;

            return (
              <div key={item.company.id} className={cn(!isLast && 'border-b border-slate-200')}>
                {/* Company Header - Clickable */}
                <button
                  onClick={() => toggleExpand(item.company.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <img
                    src={item.company.symbolImageUrl}
                    alt={item.company.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {item.company.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {item.jobs.length}개 공고
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-slate-500 transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {/* Job List - Collapsible */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-4 pb-3 space-y-2 bg-slate-50/50">
                    {item.jobs.map((job) => (
                      <a
                        key={job.id}
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-slate-700 hover:text-slate-900 line-clamp-1 transition-colors pl-11"
                      >
                        • {job.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {companies.length > displayedCompanies.length && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button className="w-full flex items-center justify-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              {companies.length - displayedCompanies.length}개 기업 더 보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Card>
    );
  }
);

TodayJobsPanel.displayName = 'TodayJobsPanel';
