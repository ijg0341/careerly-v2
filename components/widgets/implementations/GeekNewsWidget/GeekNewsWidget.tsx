'use client';

import { ArrowUp, MessageCircle, ExternalLink } from 'lucide-react';
import { WidgetProps } from '../../core/types';
import { WidgetContainer } from '../../core/WidgetContainer';
import { useGeekNewsData } from './useGeekNewsData';
import { GeekNewsItem, GeekNewsWidgetConfig } from './types';

export function GeekNewsWidget({
  config,
  onRemove,
}: WidgetProps<GeekNewsItem[], GeekNewsWidgetConfig>) {
  const { data, isLoading, isError, error, refetch } = useGeekNewsData(config.config);

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
          {data.map((item, idx) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-400 w-4">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.title}
                    <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      {item.points}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {item.comments}
                    </span>
                    <span>{item.postedAt}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </WidgetContainer>
  );
}
