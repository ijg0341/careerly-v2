'use client';

import { Star, ExternalLink } from 'lucide-react';
import { WidgetProps } from '../../core/types';
import { WidgetContainer } from '../../core/WidgetContainer';
import { useGitHubTrendingData } from './useGitHubTrendingData';
import { GitHubTrendingRepo, GitHubTrendingWidgetConfig } from './types';

function formatStars(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function GitHubTrendingWidget({
  config,
  onRemove,
}: WidgetProps<GitHubTrendingRepo[], GitHubTrendingWidgetConfig>) {
  const { data, isLoading, isError, error, refetch } = useGitHubTrendingData(config.config);

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
          {data.map((repo, idx) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-gray-400 w-4">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {repo.fullName}
                    <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3" />
                      {formatStars(repo.stars)}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{repo.starsToday} today
                    </span>
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
