import type { TechStackItem } from '@/components/widgets/implementations/TechStackWidget/types';

/**
 * Fetch TechStack data from npm API
 */
export async function fetchTechStackData(config?: {
  category?: 'frontend' | 'backend' | 'all';
  period?: 'week' | 'month';
}): Promise<{
  stacks: TechStackItem[];
  hot: string[];
}> {
  const category = config?.category || 'frontend';
  const period = config?.period || 'week';

  const params = new URLSearchParams({
    category,
    period,
  });

  const response = await fetch(`/api/widgets/techstack?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 1800, // 30 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`TechStack API failed: ${response.statusText}`);
  }

  return response.json();
}
