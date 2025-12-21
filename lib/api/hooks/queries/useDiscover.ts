/**
 * 발견(Discover) 관련 React Query 훅
 */

'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getDiscoverFeeds,
  getDiscoverFeed,
  getDiscoverFeedsByCategory,
  getTrendingFeeds,
  getRecommendedFeeds,
  getBookmarkedFeeds,
  checkDiscoverBookmarks,
  DiscoverBookmarkListResponse,
} from '../../services/discover.service';
import type {
  DiscoverFeed,
  DiscoverFeedResponse,
  PaginationParams,
} from '../../types/rest.types';

/**
 * 발견 쿼리 키
 */
export const discoverKeys = {
  all: ['discover'] as const,
  lists: () => [...discoverKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...discoverKeys.lists(), params] as const,
  details: () => [...discoverKeys.all, 'detail'] as const,
  detail: (id: string) => [...discoverKeys.details(), id] as const,
  category: (category: string, params?: PaginationParams) =>
    [...discoverKeys.all, 'category', category, params] as const,
  trending: () => [...discoverKeys.all, 'trending'] as const,
  recommended: (params?: PaginationParams) =>
    [...discoverKeys.all, 'recommended', params] as const,
  bookmarks: (params?: PaginationParams) => [...discoverKeys.all, 'bookmarks', params] as const,
};

/**
 * 발견 피드 목록 조회 훅
 */
export function useDiscoverFeeds(
  params?: PaginationParams,
  authenticated = false,
  options?: Omit<UseQueryOptions<DiscoverFeedResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverFeedResponse, Error>({
    queryKey: discoverKeys.list(params),
    queryFn: () => getDiscoverFeeds(params, authenticated),
    staleTime: 3 * 60 * 1000, // 3분
    ...options,
  });
}

/**
 * 발견 피드 상세 조회 훅
 */
export function useDiscoverFeed(
  feedId: string,
  options?: Omit<UseQueryOptions<DiscoverFeed, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverFeed, Error>({
    queryKey: discoverKeys.detail(feedId),
    queryFn: () => getDiscoverFeed(feedId),
    enabled: !!feedId,
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
}

/**
 * 카테고리별 피드 조회 훅
 */
export function useDiscoverFeedsByCategory(
  category: string,
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<DiscoverFeedResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverFeedResponse, Error>({
    queryKey: discoverKeys.category(category, params),
    queryFn: () => getDiscoverFeedsByCategory(category, params),
    enabled: !!category,
    staleTime: 3 * 60 * 1000,
    ...options,
  });
}

/**
 * 인기 피드 조회 훅
 */
export function useTrendingFeeds(
  limit = 10,
  options?: Omit<UseQueryOptions<DiscoverFeed[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverFeed[], Error>({
    queryKey: [...discoverKeys.trending(), limit],
    queryFn: () => getTrendingFeeds(limit),
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
}

/**
 * 추천 피드 조회 훅 (인증 필요)
 */
export function useRecommendedFeeds(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<DiscoverFeedResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverFeedResponse, Error>({
    queryKey: discoverKeys.recommended(params),
    queryFn: () => getRecommendedFeeds(params),
    staleTime: 10 * 60 * 1000, // 10분
    ...options,
  });
}

/**
 * 북마크한 피드 목록 조회 훅
 */
export function useBookmarkedFeeds(
  params?: { content_type?: string; page?: number; page_size?: number },
  options?: Omit<UseQueryOptions<DiscoverBookmarkListResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DiscoverBookmarkListResponse, Error>({
    queryKey: discoverKeys.bookmarks(params),
    queryFn: () => getBookmarkedFeeds(params),
    staleTime: 2 * 60 * 1000, // 2분
    ...options,
  });
}

/**
 * 여러 콘텐츠의 북마크 여부 조회 훅
 */
export function useCheckDiscoverBookmarks(
  externalIds: string[],
  options?: Omit<UseQueryOptions<Record<string, boolean>, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Record<string, boolean>, Error>({
    queryKey: [...discoverKeys.all, 'check', externalIds] as const,
    queryFn: () => checkDiscoverBookmarks(externalIds),
    enabled: externalIds.length > 0,
    staleTime: 1 * 60 * 1000, // 1분
    ...options,
  });
}
