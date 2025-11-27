'use client';

import { useQuery } from '@tanstack/react-query';
import { TechStackItem, TechStackWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchTechStackData } from '@/lib/api/services/widgets';

export function useTechStackData(config?: TechStackWidgetConfig): WidgetDataHook<{
  stacks: TechStackItem[];
  hot: string[];
}> {
  const query = useQuery({
    queryKey: ['widget', 'techstack', config],
    queryFn: () => fetchTechStackData(config),
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
