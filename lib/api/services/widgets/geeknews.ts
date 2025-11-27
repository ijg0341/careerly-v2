import type { GeekNewsItem, GeekNewsWidgetConfig } from '@/components/widgets/implementations/GeekNewsWidget/types';

/**
 * Fetch GeekNews data
 * RSS: https://news.hada.io/rss/news
 */
export async function fetchGeekNewsData(
  config?: GeekNewsWidgetConfig
): Promise<GeekNewsItem[]> {
  const limit = config?.limit || 5;
  const category = config?.category || 'all';

  const params = new URLSearchParams({
    limit: limit.toString(),
    category,
  });

  const response = await fetch(`/api/widgets/geeknews?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 300, // 5 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`GeekNews API failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}
