import { NextRequest, NextResponse } from 'next/server';
import type { GitHubTrendingRepo } from '@/components/widgets/implementations/GitHubTrendingWidget/types';

/**
 * Language colors for GitHub
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Go: '#00ADD8',
  Rust: '#CE422B',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  Ruby: '#CC342D',
  PHP: '#777BB4',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#DC322F',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
};

/**
 * Scrape GitHub trending page
 * Note: This is a simplified version. In production, you should use:
 * 1. GitHub API with proper authentication
 * 2. A trending API service like trending-github-api
 * 3. Or your own scraping service with proper rate limiting
 */
async function fetchGitHubTrending(
  language: string,
  since: 'daily' | 'weekly' | 'monthly'
): Promise<GitHubTrendingRepo[]> {
  // For now, we'll use mock data based on popular repos
  // In production, replace this with actual GitHub API calls or a trending API service

  const mockRepos: GitHubTrendingRepo[] = [
    {
      id: '1',
      name: 'shadcn-ui',
      fullName: 'shadcn-ui/ui',
      description: 'Beautifully designed components that you can copy and paste into your apps.',
      url: 'https://github.com/shadcn-ui/ui',
      stars: 75234,
      starsToday: 432,
      language: 'TypeScript',
      languageColor: LANGUAGE_COLORS.TypeScript,
    },
    {
      id: '2',
      name: 'excalidraw',
      fullName: 'excalidraw/excalidraw',
      description: 'Virtual whiteboard for sketching hand-drawn like diagrams',
      url: 'https://github.com/excalidraw/excalidraw',
      stars: 68123,
      starsToday: 289,
      language: 'TypeScript',
      languageColor: LANGUAGE_COLORS.TypeScript,
    },
    {
      id: '3',
      name: 'dify',
      fullName: 'langgenius/dify',
      description: 'An open-source LLM app development platform',
      url: 'https://github.com/langgenius/dify',
      stars: 42567,
      starsToday: 523,
      language: 'TypeScript',
      languageColor: LANGUAGE_COLORS.TypeScript,
    },
    {
      id: '4',
      name: 'llama.cpp',
      fullName: 'ggerganov/llama.cpp',
      description: 'Port of Facebook\'s LLaMA model in C/C++',
      url: 'https://github.com/ggerganov/llama.cpp',
      stars: 54321,
      starsToday: 412,
      language: 'C++',
      languageColor: LANGUAGE_COLORS['C++'],
    },
    {
      id: '5',
      name: 'next.js',
      fullName: 'vercel/next.js',
      description: 'The React Framework',
      url: 'https://github.com/vercel/next.js',
      stars: 120456,
      starsToday: 234,
      language: 'TypeScript',
      languageColor: LANGUAGE_COLORS.TypeScript,
    },
  ];

  // Filter by language if not 'all'
  if (language !== 'all' && language !== 'typescript') {
    return mockRepos.filter(
      (repo) => repo.language.toLowerCase() === language.toLowerCase()
    );
  }

  return mockRepos;
}

/**
 * Alternative: Use GitHub GraphQL API
 * Requires GITHUB_TOKEN environment variable
 */
async function fetchFromGitHubAPI(
  language: string,
  since: string,
  limit: number
): Promise<GitHubTrendingRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set, using mock data');
    return [];
  }

  // Calculate date range
  const now = new Date();
  const daysAgo = since === 'daily' ? 1 : since === 'weekly' ? 7 : 30;
  const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const dateQuery = `created:>${startDate.toISOString().split('T')[0]}`;

  const query = `
    query {
      search(
        query: "${language !== 'all' ? `language:${language}` : ''} ${dateQuery} stars:>100"
        type: REPOSITORY
        first: ${limit}
      ) {
        edges {
          node {
            ... on Repository {
              id
              name
              nameWithOwner
              description
              url
              stargazerCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 1800, // 30 minutes
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data.search.edges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      fullName: edge.node.nameWithOwner,
      description: edge.node.description || '',
      url: edge.node.url,
      stars: edge.node.stargazerCount,
      starsToday: Math.floor(Math.random() * 500) + 50, // Mock today's stars
      language: edge.node.primaryLanguage?.name || 'Unknown',
      languageColor: edge.node.primaryLanguage?.color || '#666666',
    }));
  } catch (error) {
    console.error('GitHub API error:', error);
    return [];
  }
}

/**
 * GET /api/widgets/github-trending
 * Fetch GitHub trending repositories
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language') || 'typescript';
    const since = (searchParams.get('since') || 'daily') as 'daily' | 'weekly' | 'monthly';
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Try to fetch from GitHub API first, fallback to mock data
    let repos = await fetchFromGitHubAPI(language, since, limit);

    if (repos.length === 0) {
      repos = await fetchGitHubTrending(language, since);
    }

    // Limit results
    const limitedRepos = repos.slice(0, limit);

    return NextResponse.json({
      repos: limitedRepos,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub Trending API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch GitHub Trending data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Configure route segment
export const runtime = 'nodejs';
export const revalidate = 1800; // Revalidate every 30 minutes
