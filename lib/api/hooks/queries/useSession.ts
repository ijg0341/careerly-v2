/**
 * Chat Session Query 훅
 * 세션 데이터 조회 및 캐싱
 */

'use client';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import {
  getChatSession,
  getPublicChatSession,
  getChatSessionWithFallback,
  getSharePageSession,
  getChatSessions,
  getTrendingSessions,
} from '../../services/chat.service';
import type { ChatSession, ChatSessionListResponse, ChatSessionListItem, TrendingSessionsResponse } from '../../types/chat.types';

/**
 * 세션 쿼리 키
 */
export const sessionKeys = {
  all: ['chatSessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...sessionKeys.lists(), { page, pageSize }] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

/**
 * 세션 조회 훅 (인증 필요, 본인 세션만)
 * @param sessionId - 조회할 세션 ID
 * @param options - React Query 옵션
 */
export function useChatSession(
  sessionId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<ChatSession, Error, ChatSession, [string, string]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ChatSession, Error, ChatSession, [string, string]>({
    queryKey: ['chatSession', sessionId || ''],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      return getChatSession(sessionId);
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    retry: 1,
    ...options,
  });
}

/**
 * 공개 세션 조회 훅 (인증 불필요)
 * @param sessionId - 조회할 세션 ID
 * @param options - React Query 옵션
 */
export function usePublicChatSession(
  sessionId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<ChatSession, Error, ChatSession, [string, string]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ChatSession, Error, ChatSession, [string, string]>({
    queryKey: ['publicChatSession', sessionId || ''],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      return getPublicChatSession(sessionId);
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    retry: 1,
    ...options,
  });
}

/**
 * 세션 조회 훅 (인증 API 먼저 시도 → 실패 시 공개 API fallback)
 * 로그인 여부와 관계없이 사용 가능
 * @param sessionId - 조회할 세션 ID
 * @param options - React Query 옵션
 */
export function useChatSessionWithFallback(
  sessionId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<ChatSession, Error, ChatSession, [string, string]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ChatSession, Error, ChatSession, [string, string]>({
    queryKey: ['chatSessionFallback', sessionId || ''],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      return getChatSessionWithFallback(sessionId);
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    ...options,
  });
}

/**
 * 공유 페이지용 세션 조회 훅 (공개 API 먼저 시도 → 실패 시 인증 API fallback)
 * 로그인 없이도 공개 세션 조회 가능, 로그인한 경우 비공개 세션도 미리보기 가능
 * @param sessionId - 조회할 세션 ID
 * @param options - React Query 옵션
 */
export function useSharePageSession(
  sessionId: string | null | undefined,
  options?: Omit<
    UseQueryOptions<ChatSession, Error, ChatSession, [string, string]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ChatSession, Error, ChatSession, [string, string]>({
    queryKey: ['sharePageSession', sessionId || ''],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      return getSharePageSession(sessionId);
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false, // 공유 페이지에서는 재시도 안 함
    ...options,
  });
}

/**
 * 트렌딩 세션 조회 훅 (인증 불필요)
 * @param limit - 조회할 세션 개수 (기본값: 4)
 * @param options - React Query 옵션
 */
export function useTrendingSessions(
  limit: number = 4,
  options?: Omit<
    UseQueryOptions<TrendingSessionsResponse, Error, TrendingSessionsResponse, [string, number]>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<TrendingSessionsResponse, Error, TrendingSessionsResponse, [string, number]>({
    queryKey: ['trendingSessions', limit],
    queryFn: () => getTrendingSessions(limit),
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
    retry: 1,
    ...options,
  });
}

/**
 * 내 세션 목록 조회 훅 (인증 필요)
 * @param page - 페이지 번호 (1부터 시작)
 * @param pageSize - 페이지당 개수
 * @param options - React Query 옵션
 */
export function useChatSessions(
  page: number = 1,
  pageSize: number = 20,
  options?: Omit<
    UseQueryOptions<ChatSessionListResponse, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ChatSessionListResponse, Error>({
    queryKey: sessionKeys.list(page, pageSize),
    queryFn: () => getChatSessions(page, pageSize),
    staleTime: 1000 * 60 * 2, // 2분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
    retry: 1,
    ...options,
  });
}

/**
 * 내 세션 목록 무한 스크롤 조회 훅 (인증 필요)
 * @param pageSize - 페이지당 개수
 * @param options - React Query 옵션
 */
export function useInfiniteChatSessions(
  pageSize: number = 20,
  options?: Omit<
    UseInfiniteQueryOptions<
      ChatSessionListResponse,
      Error,
      InfiniteData<ChatSessionListResponse>,
      readonly unknown[],
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  return useInfiniteQuery<
    ChatSessionListResponse,
    Error,
    InfiniteData<ChatSessionListResponse>,
    readonly unknown[],
    number
  >({
    queryKey: ['chatSessions', 'list', { pageSize }] as const,
    queryFn: ({ pageParam }) => getChatSessions(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
}
