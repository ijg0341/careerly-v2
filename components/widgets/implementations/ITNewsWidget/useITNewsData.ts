'use client';

import { useQuery } from '@tanstack/react-query';
import { ITNewsItem, ITNewsWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchITNewsData } from '@/lib/api/services/widgets';

export function useITNewsData(config?: ITNewsWidgetConfig): WidgetDataHook<ITNewsItem[]> {
  const query = useQuery({
    queryKey: ['widget', 'itnews', config],
    queryFn: () => fetchITNewsData(config),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
