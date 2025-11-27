'use client';

import { useQuery } from '@tanstack/react-query';
import { AITrendData, AITrendWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchAITrendData } from '@/lib/api/services/widgets';

export function useAITrendData(config?: AITrendWidgetConfig): WidgetDataHook<AITrendData> {
  const query = useQuery({
    queryKey: ['widget', 'aitrend', config],
    queryFn: () => fetchAITrendData(config),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
