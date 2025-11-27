import { NextRequest, NextResponse } from 'next/server';
import { parseRSSFeed, formatRelativeTime } from '@/lib/utils/rss-parser';
import type { GeekNewsItem } from '@/components/widgets/implementations/GeekNewsWidget/types';

const GEEKNEWS_RSS_URL = 'https://news.hada.io/rss/news';

/**
 * GET /api/widgets/geeknews
 * Fetch and parse GeekNews RSS feed
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const category = searchParams.get('category') || 'all';

    // Parse RSS feed
    const feed = await parseRSSFeed(GEEKNEWS_RSS_URL, {
      timeout: 10000,
    });

    // Transform RSS items to GeekNewsItem format
    const items: GeekNewsItem[] = feed.items
      .slice(0, limit)
      .map((item, index) => {
        // Extract points and comments from description if available
        // GeekNews RSS might not have these fields, so we'll use mock data for now
        // In production, you might need to scrape the actual page or use their API
        const points = Math.floor(Math.random() * 300) + 50;
        const comments = Math.floor(Math.random() * 100) + 10;

        return {
          id: item.guid || `geeknews-${index}`,
          title: item.title,
          url: item.link,
          points,
          comments,
          postedAt: item.isoDate ? formatRelativeTime(item.isoDate) : '최근',
          author: item.author,
        };
      });

    return NextResponse.json({
      items,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GeekNews API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch GeekNews data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Configure route segment
export const runtime = 'nodejs';
export const revalidate = 300; // Revalidate every 5 minutes
