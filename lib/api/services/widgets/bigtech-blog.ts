import type { BigTechBlogPost, BigTechBlogWidgetConfig } from '@/components/widgets/implementations/BigTechBlogWidget/types';

/**
 * Fetch BigTech Blog posts
 * Sources: Kakao, Naver, Toss, Line, Woowa tech blogs
 */
export async function fetchBigTechBlogData(
  config?: BigTechBlogWidgetConfig
): Promise<BigTechBlogPost[]> {
  const companies = config?.companies || ['kakao', 'naver', 'toss', 'line', 'woowa'];
  const limit = config?.limit || 10;

  const params = new URLSearchParams({
    companies: companies.join(','),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/widgets/bigtech-blog?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 600, // 10 minutes
    },
  });

  if (!response.ok) {
    throw new Error(`BigTechBlog API failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.posts || [];
}
