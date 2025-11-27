export interface BigTechBlogPost {
  id: string;
  title: string;
  url: string;
  company: 'kakao' | 'naver' | 'toss' | 'line' | 'woowa';
  companyName: string;
  companyColor: string;
  tags: string[];
  postedAt: string;
}

export interface BigTechBlogWidgetConfig {
  companies?: ('kakao' | 'naver' | 'toss' | 'line' | 'woowa')[];
  limit?: number;
}
