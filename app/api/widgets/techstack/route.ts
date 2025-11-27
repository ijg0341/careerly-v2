import { NextRequest, NextResponse } from 'next/server';
import type { TechStackItem } from '@/components/widgets/implementations/TechStackWidget/types';

/**
 * Package definitions for different categories
 */
const PACKAGE_CATEGORIES = {
  frontend: ['react', 'vue', 'angular', 'svelte', 'next', 'solid-js'],
  backend: ['express', 'fastify', 'nestjs', 'koa', 'hono'],
  all: ['react', 'vue', 'angular', 'svelte', 'next', 'express', 'fastify', 'nestjs'],
};

/**
 * Package color mapping
 */
const PACKAGE_COLORS: Record<string, string> = {
  react: '#61DAFB',
  vue: '#4FC08D',
  angular: '#DD0031',
  svelte: '#FF3E00',
  next: '#000000',
  'solid-js': '#2C4F7C',
  express: '#000000',
  fastify: '#000000',
  nestjs: '#E0234E',
  koa: '#33333D',
  hono: '#FF6600',
};

/**
 * Trending packages (manually curated or from API)
 */
const HOT_PACKAGES = {
  frontend: ['Bun', 'Vite', 'Astro', 'Remix', 'Qwik'],
  backend: ['Hono', 'ElysiaJS', 'tRPC', 'Drizzle', 'Prisma'],
  all: ['Bun', 'Vite', 'Hono', 'Astro', 'tRPC', 'Drizzle'],
};

/**
 * Interface for npm API response
 */
interface NpmDownloadData {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

/**
 * Fetch download data from npm API
 */
async function fetchNpmDownloads(
  packages: string[],
  period: 'week' | 'month'
): Promise<Map<string, number>> {
  const periodParam = period === 'week' ? 'last-week' : 'last-month';
  const packageList = packages.join(',');

  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/${periodParam}/${packageList}`,
      {
        headers: {
          'User-Agent': 'Careerly/1.0',
        },
        next: {
          revalidate: 1800, // 30 minutes
        },
      }
    );

    if (!response.ok) {
      throw new Error(`npm API failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle both single package and multiple packages response
    const downloadMap = new Map<string, number>();

    if (Array.isArray(data)) {
      // Multiple packages
      data.forEach((item: NpmDownloadData) => {
        downloadMap.set(item.package, item.downloads);
      });
    } else if (data.package) {
      // Single package
      downloadMap.set(data.package, data.downloads);
    }

    return downloadMap;
  } catch (error) {
    console.error('npm API error:', error);
    throw error;
  }
}

/**
 * Calculate mock change for demonstration
 * In production, you would fetch previous period data and calculate real change
 */
function calculateMockChange(downloads: number): { change: number; changePercent: number } {
  const changePercent = Math.floor(Math.random() * 40) - 10; // -10% to 30%
  const change = Math.floor(downloads * (changePercent / 100));

  return { change, changePercent };
}

/**
 * GET /api/widgets/techstack
 * Fetch npm package download statistics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') || 'frontend') as keyof typeof PACKAGE_CATEGORIES;
    const period = (searchParams.get('period') || 'week') as 'week' | 'month';

    // Get packages for the category
    const packages = PACKAGE_CATEGORIES[category] || PACKAGE_CATEGORIES.frontend;

    // Fetch download data from npm API
    const downloadMap = await fetchNpmDownloads(packages, period);

    // Transform to TechStackItem format
    const stacks: TechStackItem[] = packages.map((pkg) => {
      const downloads = downloadMap.get(pkg) || 0;
      const { change, changePercent } = calculateMockChange(downloads);

      return {
        name: pkg.charAt(0).toUpperCase() + pkg.slice(1),
        downloads,
        change,
        changePercent,
        color: PACKAGE_COLORS[pkg] || '#666666',
      };
    });

    // Sort by downloads
    stacks.sort((a, b) => b.downloads - a.downloads);

    return NextResponse.json({
      stacks,
      hot: HOT_PACKAGES[category] || HOT_PACKAGES.frontend,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('TechStack API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch TechStack data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Configure route segment
export const runtime = 'nodejs';
export const revalidate = 1800; // Revalidate every 30 minutes
