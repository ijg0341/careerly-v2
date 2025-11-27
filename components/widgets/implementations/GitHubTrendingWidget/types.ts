export interface GitHubTrendingRepo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  starsToday: number;
  language: string;
  languageColor: string;
}

export interface GitHubTrendingWidgetConfig {
  language?: string;
  since?: 'daily' | 'weekly' | 'monthly';
  limit?: number;
}
