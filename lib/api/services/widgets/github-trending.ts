import type { GitHubTrendingRepo, GitHubTrendingWidgetConfig } from '@/components/widgets/implementations/GitHubTrendingWidget/types';

/**
 * Fetch GitHub Trending repositories
 */
export async function fetchGitHubTrendingData(
  config?: GitHubTrendingWidgetConfig
): Promise<GitHubTrendingRepo[]> {
  const language = config?.language || 'typescript';
  const since = config?.since || 'daily';
  const limit = config?.limit || 10;

  const params = new URLSearchParams({
    language,
    since,
    limit: limit.toString(),
  });

  const response = await fetch(`/api/widgets/github-trending?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 1800, // 30 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub Trending API failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.repos || [];
}
