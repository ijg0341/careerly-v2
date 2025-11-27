'use client';

import { useQuery } from '@tanstack/react-query';
import { BigTechBlogPost, BigTechBlogWidgetConfig } from './types';
import { WidgetDataHook } from '../../core/types';
import { fetchBigTechBlogData } from '@/lib/api/services/widgets';

export function useBigTechBlogData(config?: BigTechBlogWidgetConfig): WidgetDataHook<BigTechBlogPost[]> {
  const query = useQuery({
    queryKey: ['widget', 'bigtech-blog', config],
    queryFn: () => fetchBigTechBlogData(config),
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
