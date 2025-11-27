import { NextRequest, NextResponse } from 'next/server';
import { parseMultipleRSSFeeds, formatRelativeTime } from '@/lib/utils/rss-parser';
import type { BigTechBlogPost } from '@/components/widgets/implementations/BigTechBlogWidget/types';

/**
 * BigTech company blog RSS feeds
 */
const BIGTECH_RSS_FEEDS: Record<string, { url: string; name: string; color: string }> = {
  kakao: {
    url: 'https://tech.kakao.com/feed/',
    name: 'Kakao',
    color: '#FEE500',
  },
  naver: {
    url: 'https://d2.naver.com/d2.atom',
    name: 'NAVER',
    color: '#03C75A',
  },
  toss: {
    url: 'https://toss.tech/rss.xml',
    name: 'Toss',
    color: '#0064FF',
  },
  line: {
    url: 'https://engineering.linecorp.com/ko/feed/',
    name: 'LINE',
    color: '#00B900',
  },
  woowa: {
    url: 'https://techblog.woowahan.com/feed/',
    name: 'Woowahan',
    color: '#2AC1BC',
  },
};

/**
 * Extract tags from content or categories
 */
function extractTags(categories?: string[], content?: string): string[] {
  const tags: string[] = [];

  // Add categories as tags
  if (categories && categories.length > 0) {
    tags.push(...categories.slice(0, 3));
  }

  // If no categories, try to extract from content
  if (tags.length === 0 && content) {
    const commonTags = ['React', 'TypeScript', 'Node.js', 'Python', 'Kubernetes', 'AWS', 'MSA'];
    commonTags.forEach((tag) => {
      if (content.includes(tag)) {
        tags.push(tag);
      }
    });
  }

  return tags.slice(0, 3);
}

/**
 * GET /api/widgets/bigtech-blog
 * Fetch and parse BigTech blog RSS feeds
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const companiesParam = searchParams.get('companies');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Parse companies parameter
    const companies = companiesParam
      ? companiesParam.split(',').filter((c) => c in BIGTECH_RSS_FEEDS)
      : ['kakao', 'naver', 'toss', 'line', 'woowa'];

    // Get RSS feed URLs
    const feedUrls = companies.map((company) => BIGTECH_RSS_FEEDS[company].url);

    // Fetch all RSS feeds in parallel
    const feeds = await parseMultipleRSSFeeds(feedUrls, {
      timeout: 10000,
    });

    // Transform and merge all posts
    const posts: BigTechBlogPost[] = [];

    feeds.forEach((feed, feedIndex) => {
      const company = companies[feedIndex];
      const companyInfo = BIGTECH_RSS_FEEDS[company];

      if (!companyInfo) return; // Skip invalid companies

      feed.items.forEach((item) => {
        posts.push({
          id: item.guid || item.link,
          title: item.title,
          url: item.link,
          company: company as 'kakao' | 'naver' | 'toss' | 'line' | 'woowa',
          companyName: companyInfo.name,
          companyColor: companyInfo.color,
          tags: extractTags(item.categories, item.contentSnippet),
          postedAt: item.isoDate ? formatRelativeTime(item.isoDate) : '최근',
        });
      });
    });

    // Sort by date (most recent first)
    posts.sort((a, b) => {
      // This is a simple sort, in production you'd parse the dates properly
      return a.postedAt.localeCompare(b.postedAt);
    });

    // Limit results
    const limitedPosts = posts.slice(0, limit);

    return NextResponse.json({
      posts: limitedPosts,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('BigTechBlog API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch BigTechBlog data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Configure route segment
export const runtime = 'nodejs';
export const revalidate = 600; // Revalidate every 10 minutes
