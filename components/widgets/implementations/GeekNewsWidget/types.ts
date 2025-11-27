export interface GeekNewsItem {
  id: string;
  title: string;
  url: string;
  points: number;
  comments: number;
  postedAt: string;
  author?: string;
}

export interface GeekNewsWidgetConfig {
  limit?: number;
  category?: 'news' | 'blog' | 'all';
}
