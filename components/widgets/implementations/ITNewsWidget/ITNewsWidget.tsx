'use client';

import { Newspaper, ExternalLink } from 'lucide-react';
import { WidgetProps } from '../../core/types';
import { WidgetContainer } from '../../core/WidgetContainer';
import { useITNewsData } from './useITNewsData';
import { ITNewsItem, ITNewsWidgetConfig } from './types';

const sourceColors: Record<string, string> = {
  bloter: '#FF6B35',
  zdnet: '#E31937',
  itchosun: '#003478',
  etnews: '#0066CC',
};

export function ITNewsWidget({
  config,
  onRemove,
}: WidgetProps<ITNewsItem[], ITNewsWidgetConfig>) {
  const { data, isLoading, isError, error, refetch } = useITNewsData(config.config);

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
        <div className="space-y-3">
          {data.map((news) => (
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-1.5 py-0.5 text-xs font-medium text-white rounded"
                  style={{ backgroundColor: sourceColors[news.source] }}
                >
                  {news.sourceName}
                </span>
                <span className="text-xs text-gray-400">{news.postedAt}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {news.title}
                <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
              </h4>
            </a>
          ))}
        </div>
      )}
    </WidgetContainer>
  );
}
