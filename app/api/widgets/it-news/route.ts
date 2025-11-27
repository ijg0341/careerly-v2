import { NextRequest, NextResponse } from 'next/server';
import { parseMultipleRSSFeeds, formatRelativeTime } from '@/lib/utils/rss-parser';
import type { ITNewsItem } from '@/components/widgets/implementations/ITNewsWidget/types';

/**
 * IT News RSS feeds
 */
const IT_NEWS_RSS_FEEDS: Record<string, { url: string; name: string }> = {
  bloter: {
    url: 'https://www.bloter.net/feed/',
    name: '블로터',
  },
  zdnet: {
    url: 'https://zdnet.co.kr/feed/',
    name: 'ZDNet Korea',
  },
  itchosun: {
    url: 'http://it.chosun.com/site/data/rss/rss.xml',
    name: 'IT조선',
  },
  etnews: {
    url: 'https://www.etnews.com/rss/0020.xml',
    name: '전자신문',
  },
};

/**
 * GET /api/widgets/it-news
 * Fetch and parse IT News RSS feeds
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sourcesParam = searchParams.get('sources');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Parse sources parameter
    const sources = sourcesParam
      ? sourcesParam.split(',').filter((s) => s in IT_NEWS_RSS_FEEDS)
      : ['bloter', 'zdnet', 'itchosun', 'etnews'];

    // Get RSS feed URLs
    const feedUrls = sources.map((source) => IT_NEWS_RSS_FEEDS[source].url);

    // Fetch all RSS feeds in parallel
    const feeds = await parseMultipleRSSFeeds(feedUrls, {
      timeout: 10000,
    });

    // Transform and merge all news items
    const items: ITNewsItem[] = [];

    feeds.forEach((feed, feedIndex) => {
      const source = sources[feedIndex];
      const sourceInfo = IT_NEWS_RSS_FEEDS[source];

      if (!sourceInfo) return; // Skip invalid sources

      feed.items.forEach((item) => {
        items.push({
          id: item.guid || item.link,
          title: item.title,
          url: item.link,
          source: source as 'bloter' | 'zdnet' | 'itchosun' | 'etnews',
          sourceName: sourceInfo.name,
          postedAt: item.isoDate ? formatRelativeTime(item.isoDate) : '최근',
        });
      });
    });

    // Sort by date (most recent first)
    // For better sorting, we should parse the actual dates
    // This is a simplified version
    items.sort((a, b) => {
      return a.postedAt.localeCompare(b.postedAt);
    });

    // Limit results
    const limitedItems = items.slice(0, limit);

    return NextResponse.json({
      items: limitedItems,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('IT News API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch IT News data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Configure route segment
export const runtime = 'nodejs';
export const revalidate = 300; // Revalidate every 5 minutes
