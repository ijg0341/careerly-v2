'use client';

import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { WidgetProps } from '../../core/types';
import { WidgetContainer } from '../../core/WidgetContainer';
import { useTechStackData } from './useTechStackData';
import { TechStackItem, TechStackWidgetConfig } from './types';

function formatDownloads(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export function TechStackWidget({
  config,
  onRemove,
}: WidgetProps<{ stacks: TechStackItem[]; hot: string[] }, TechStackWidgetConfig>) {
  const { data, isLoading, isError, error, refetch } = useTechStackData(config.config);

  const maxDownloads = data?.stacks ? Math.max(...data.stacks.map((s) => s.downloads)) : 0;

  return (
    <WidgetContainer
      config={config}
      onRemove={onRemove}
      onRefresh={() => refetch()}
      isLoading={isLoading}
      isError={isError}
      error={error ?? undefined}
    >
      {data && (
        <div className="space-y-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            이번 주 npm 다운로드
          </div>

          <div className="space-y-3">
            {data.stacks.map((stack) => (
              <div key={stack.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {stack.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDownloads(stack.downloads)}
                    </span>
                    <span
                      className={`flex items-center text-xs ${
                        stack.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stack.changePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-0.5" />
                      )}
                      {stack.changePercent >= 0 ? '+' : ''}
                      {stack.changePercent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(stack.downloads / maxDownloads) * 100}%`,
                      backgroundColor: stack.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 급상승 패키지 */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Flame className="w-3 h-3 text-orange-500" />
              급상승
            </div>
            <div className="flex flex-wrap gap-1">
              {data.hot.map((pkg) => (
                <span
                  key={pkg}
                  className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full"
                >
                  {pkg}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </WidgetContainer>
  );
}
