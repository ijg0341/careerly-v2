import type {
  AITrendData,
  AITrendWidgetConfig,
} from '@/components/widgets/implementations/AITrendWidget/types';

/**
 * Fetch AI Trend data from multiple sources
 *
 * Data sources:
 * - Hugging Face trending models: https://huggingface.co/api/trending
 * - GitHub trending (AI-related repos): scraped from trending page
 * - GeekNews AI-tagged articles: filtered from RSS feed
 */
export async function fetchAITrendData(config?: AITrendWidgetConfig): Promise<AITrendData> {
  const limit = config?.limit || 5;
  const period = config?.period || 'daily';
  const sources = config?.sources || ['huggingface', 'github', 'news'];
  const githubLanguage = config?.githubLanguage || 'python';

  const params = new URLSearchParams({
    limit: limit.toString(),
    period,
    sources: sources.join(','),
    githubLanguage,
  });

  const response = await fetch(`/api/widgets/ai-trend?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 600, // 10 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`AI Trend API failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
