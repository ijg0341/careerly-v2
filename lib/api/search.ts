import mockData from '@/lib/mock/search.mock.json';

export interface Citation {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

export interface SearchResult {
  query: string;
  answer: string;
  citations: Citation[];
}

export async function searchCareer(query: string): Promise<SearchResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data for now
  return {
    ...mockData.sampleSearchResults,
    query,
  };
}

export function getTrendingKeywords(): string[] {
  return mockData.trendingKeywords;
}
