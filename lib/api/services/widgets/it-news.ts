import type { ITNewsItem, ITNewsWidgetConfig } from '@/components/widgets/implementations/ITNewsWidget/types';

/**
 * Fetch IT News data
 * Sources: Bloter, ZDNet, IT Chosun, ETNews
 */
export async function fetchITNewsData(
  config?: ITNewsWidgetConfig
): Promise<ITNewsItem[]> {
  const sources = config?.sources || ['bloter', 'zdnet', 'itchosun', 'etnews'];
  const limit = config?.limit || 10;

  const params = new URLSearchParams({
    sources: sources.join(','),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/widgets/it-news?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 300, // 5 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`IT News API failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}
