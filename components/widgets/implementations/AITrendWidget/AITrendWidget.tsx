'use client';

import { useState } from 'react';
import {
  Cpu,
  Star,
  Download,
  GitBranch,
  Code,
  MessageCircle,
  ArrowUp,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import { WidgetProps } from '../../core/types';
import { WidgetContainer } from '../../core/WidgetContainer';
import { useAITrendData } from './useAITrendData';
import { AITrendData, AITrendWidgetConfig, AITrendSource } from './types';

type TabType = 'huggingface' | 'github' | 'news';

export function AITrendWidget({
  config,
  onRemove,
}: WidgetProps<AITrendData, AITrendWidgetConfig>) {
  const { data, isLoading, isError, error, refetch } = useAITrendData(config.config);
  const [activeTab, setActiveTab] = useState<TabType>('huggingface');

  const showTabs = config.config?.showTabs !== false;
  const sources = config.config?.sources || ['huggingface', 'github', 'news'];

  const allTabs: Array<{ id: TabType; label: string; icon: React.ReactNode; count?: number }> = [
    {
      id: 'huggingface' as TabType,
      label: 'Models',
      icon: <Cpu className="w-4 h-4" />,
      count: data?.huggingface?.length,
    },
    {
      id: 'github' as TabType,
      label: 'GitHub',
      icon: <GitBranch className="w-4 h-4" />,
      count: data?.github?.length,
    },
    {
      id: 'news' as TabType,
      label: 'News',
      icon: <TrendingUp className="w-4 h-4" />,
      count: data?.news?.length,
    },
  ];

  const tabs = allTabs.filter((tab) => sources.includes(tab.id as AITrendSource));

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

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
          {/* Tabs */}
          {showTabs && tabs.length > 1 && (
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="text-xs opacity-60">({tab.count})</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Hugging Face Models */}
          {activeTab === 'huggingface' && data.huggingface && (
            <div className="space-y-3">
              {data.huggingface.map((model, idx) => (
                <a
                  key={model.id}
                  href={model.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-400 w-4">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {model.name}
                          <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        by {model.author}
                      </p>
                      {model.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {model.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {formatNumber(model.downloads)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {formatNumber(model.likes)}
                        </span>
                      </div>
                      {model.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {model.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* GitHub Trending */}
          {activeTab === 'github' && data.github && (
            <div className="space-y-3">
              {data.github.map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-400 w-4">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {repo.owner}/{repo.name}
                          <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {formatNumber(repo.stars)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {formatNumber(repo.todayStars)} today
                        </span>
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* AI News */}
          {activeTab === 'news' && data.news && (
            <div className="space-y-3">
              {data.news.map((item, idx) => (
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
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Last Updated */}
          {data.lastUpdated && (
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
              Updated {new Date(data.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </WidgetContainer>
  );
}
