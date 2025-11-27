'use client';

import { useQuery } from '@tanstack/react-query';
import { GitHubTrendingRepo, GitHubTrendingWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchGitHubTrendingData } from '@/lib/api/services/widgets';

export function useGitHubTrendingData(config?: GitHubTrendingWidgetConfig): WidgetDataHook<GitHubTrendingRepo[]> {
  const query = useQuery({
    queryKey: ['widget', 'github-trending', config],
    queryFn: () => fetchGitHubTrendingData(config),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
