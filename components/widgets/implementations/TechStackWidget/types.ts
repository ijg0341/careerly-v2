export interface TechStackItem {
  name: string;
  downloads: number;
  change: number;
  changePercent: number;
  color: string;
}

export interface TechStackWidgetConfig {
  category?: 'frontend' | 'backend' | 'all';
  period?: 'week' | 'month';
}
