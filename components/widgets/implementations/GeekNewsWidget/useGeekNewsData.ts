'use client';

import { useQuery } from '@tanstack/react-query';
import { GeekNewsItem, GeekNewsWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchGeekNewsData } from '@/lib/api/services/widgets';

export function useGeekNewsData(config?: GeekNewsWidgetConfig): WidgetDataHook<GeekNewsItem[]> {
  const query = useQuery({
    queryKey: ['widget', 'geeknews', config],
    queryFn: () => fetchGeekNewsData(config),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
