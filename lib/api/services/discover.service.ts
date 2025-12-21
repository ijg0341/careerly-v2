/**
 * 발견(Discover) 피드 관련 API 서비스
 */

import { authClient, publicClient, handleApiError } from '../clients/rest-client';
import type { DiscoverFeed, DiscoverFeedResponse, PaginationParams } from '../types/rest.types';

/**
 * 발견 피드 목록 조회 (인증 선택)
 */
export async function getDiscoverFeeds(
  params?: PaginationParams,
  authenticated = false
): Promise<DiscoverFeedResponse> {
  try {
    const client = authenticated ? authClient : publicClient;
    const response = await client.get<{ data: DiscoverFeedResponse }>('/discover', {
      params,
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 발견 피드 상세 조회
 */
export async function getDiscoverFeed(feedId: string): Promise<DiscoverFeed> {
  try {
    const response = await publicClient.get<{ data: DiscoverFeed }>(`/discover/${feedId}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 카테고리별 피드 조회
 */
export async function getDiscoverFeedsByCategory(
  category: string,
  params?: PaginationParams
): Promise<DiscoverFeedResponse> {
  try {
    const response = await publicClient.get<{ data: DiscoverFeedResponse }>(
      `/discover/category/${category}`,
      { params }
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 인기 피드 조회
 */
export async function getTrendingFeeds(limit = 10): Promise<DiscoverFeed[]> {
  try {
    const response = await publicClient.get<{ data: DiscoverFeed[] }>('/discover/trending', {
      params: { limit },
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 추천 피드 조회 (인증 필요)
 */
export async function getRecommendedFeeds(params?: PaginationParams): Promise<DiscoverFeedResponse> {
  try {
    const response = await authClient.get<{ data: DiscoverFeedResponse }>('/discover/recommended', {
      params,
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// ========================================
// Discover Bookmark Types
// ========================================
export interface DiscoverBookmarkData {
  content_type: 'job' | 'blog' | 'book' | 'course';
  external_id: string;
  url: string;
  title: string;
  summary?: string;
  image_url?: string;
  company_name?: string;
  company_logo?: string;
}

export interface DiscoverBookmark extends DiscoverBookmarkData {
  id: string;
  created_at: string;
}

export interface DiscoverBookmarkListResponse {
  count: number;
  page: number;
  page_size: number;
  results: DiscoverBookmark[];
}

// ========================================
// Discover Bookmark API Functions
// ========================================

/**
 * 피드 북마크 생성
 */
export async function createDiscoverBookmark(data: DiscoverBookmarkData): Promise<DiscoverBookmark> {
  try {
    const response = await authClient.post<DiscoverBookmark>('/api/v1/discover/bookmarks/', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 피드 북마크 삭제 (external_id로)
 */
export async function deleteDiscoverBookmark(externalId: string): Promise<void> {
  try {
    await authClient.delete(`/api/v1/discover/bookmarks/by-external-id/${externalId}/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 북마크한 피드 목록 조회
 */
export async function getBookmarkedFeeds(params?: {
  content_type?: string;
  page?: number;
  page_size?: number;
}): Promise<DiscoverBookmarkListResponse> {
  try {
    const response = await authClient.get<DiscoverBookmarkListResponse>('/api/v1/discover/bookmarks/list/', {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 단일 콘텐츠 북마크 여부 확인
 */
export async function isDiscoverBookmarked(externalId: string): Promise<boolean> {
  try {
    const response = await authClient.get<{ is_bookmarked: boolean }>(
      `/api/v1/discover/bookmarks/${externalId}/is-bookmarked/`
    );
    return response.data.is_bookmarked;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 여러 콘텐츠의 북마크 여부 일괄 확인
 */
export async function checkDiscoverBookmarks(
  externalIds: string[]
): Promise<Record<string, boolean>> {
  try {
    const response = await authClient.post<Record<string, boolean>>('/api/v1/discover/bookmarks/check/', {
      external_ids: externalIds,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
