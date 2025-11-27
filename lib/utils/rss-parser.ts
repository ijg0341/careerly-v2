import Parser from 'rss-parser';

/**
 * RSS Feed Item Interface
 */
export interface RSSFeedItem {
  title: string;
  link: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  categories?: string[];
  author?: string;
  isoDate?: string;
}

/**
 * RSS Feed Response Interface
 */
export interface RSSFeedResponse {
  title?: string;
  description?: string;
  link?: string;
  items: RSSFeedItem[];
}

/**
 * RSS Parser Configuration
 */
export interface RSSParserConfig {
  timeout?: number;
  maxRedirects?: number;
  headers?: Record<string, string>;
}

/**
 * Create a configured RSS parser instance
 */
function createRSSParser(config?: RSSParserConfig): Parser {
  return new Parser({
    timeout: config?.timeout || 10000,
    maxRedirects: config?.maxRedirects || 5,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Careerly/1.0)',
      ...config?.headers,
    },
  });
}

/**
 * Parse RSS feed from URL
 */
export async function parseRSSFeed(
  url: string,
  config?: RSSParserConfig
): Promise<RSSFeedResponse> {
  const parser = createRSSParser(config);

  try {
    const feed = await parser.parseURL(url);

    return {
      title: feed.title,
      description: feed.description,
      link: feed.link,
      items: feed.items.map((item) => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate,
        content: item.content,
        contentSnippet: item.contentSnippet,
        guid: item.guid,
        categories: item.categories,
        author: item.creator || item.author,
        isoDate: item.isoDate,
      })),
    };
  } catch (error) {
    console.error(`Failed to parse RSS feed from ${url}:`, error);
    throw new Error(`RSS parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse multiple RSS feeds in parallel
 */
export async function parseMultipleRSSFeeds(
  urls: string[],
  config?: RSSParserConfig
): Promise<RSSFeedResponse[]> {
  const results = await Promise.allSettled(
    urls.map((url) => parseRSSFeed(url, config))
  );

  return results
    .filter((result): result is PromiseFulfilledResult<RSSFeedResponse> =>
      result.status === 'fulfilled'
    )
    .map((result) => result.value);
}

/**
 * Extract text content from HTML
 */
export function extractTextFromHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Format relative time (e.g., "3시간 전")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}
