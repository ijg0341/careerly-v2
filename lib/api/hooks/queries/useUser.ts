/**
 * 사용자 관련 React Query 훅
 */

'use client';

import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getUserProfile,
  getMyProfile,
  searchUsers,
  getFollowers,
  getFollowing,
  getMySavedPosts,
} from '../../services/user.service';
import { getCurrentUser } from '../../services/auth.service';
import type { User } from '../../types/rest.types';
import type { PaginatedPostResponse } from '../../types/posts.types';

/**
 * 사용자 쿼리 키
 */
export const userKeys = {
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.all, 'me'] as const,
  search: (query: string) => [...userKeys.all, 'search', query] as const,
  followers: (userId: string) => [...userKeys.detail(userId), 'followers'] as const,
  following: (userId: string) => [...userKeys.detail(userId), 'following'] as const,
  savedPosts: (page?: number) => [...userKeys.all, 'savedPosts', page] as const,
};

/**
 * 현재 사용자 정보 조회 훅
 */
export function useCurrentUser(
  options?: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User, Error>({
    queryKey: userKeys.me(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1, // 인증 에러 시 한 번만 재시도
    ...options,
  });
}

/**
 * 내 프로필 조회 훅
 */
export function useMyProfile(
  options?: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User, Error>({
    queryKey: userKeys.me(),
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * 사용자 프로필 조회 훅
 */
export function useUserProfile(
  userId: string,
  options?: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User, Error>({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    staleTime: 3 * 60 * 1000, // 3분
    ...options,
  });
}

/**
 * 사용자 검색 훅
 */
export function useSearchUsers(
  query: string,
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User[], Error>({
    queryKey: userKeys.search(query),
    queryFn: () => searchUsers(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2분
    ...options,
  });
}

/**
 * 팔로워 목록 조회 훅
 */
export function useFollowers(
  userId: string,
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User[], Error>({
    queryKey: userKeys.followers(userId),
    queryFn: () => getFollowers(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * 팔로잉 목록 조회 훅
 */
export function useFollowing(
  userId: string,
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<User[], Error>({
    queryKey: userKeys.following(userId),
    queryFn: () => getFollowing(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * 내가 저장한 포스트 목록 훅
 */
export function useMySavedPosts(page?: number) {
  return useQuery<PaginatedPostResponse, Error>({
    queryKey: userKeys.savedPosts(page),
    queryFn: () => getMySavedPosts(page),
  });
}

/**
 * 무한 스크롤용 훅
 */
export function useInfiniteMySavedPosts() {
  return useInfiniteQuery<PaginatedPostResponse, Error>({
    queryKey: [...userKeys.all, 'savedPosts', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getMySavedPosts(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return Number(url.searchParams.get('page'));
      }
      return undefined;
    },
  });
}
