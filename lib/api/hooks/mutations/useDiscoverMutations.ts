/**
 * 발견(Discover) 관련 React Query Mutation 훅
 */

'use client';

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createDiscoverBookmark,
  deleteDiscoverBookmark,
  DiscoverBookmarkData,
  DiscoverBookmark,
} from '../../services/discover.service';
import { discoverKeys } from '../queries/useDiscover';

/**
 * 피드 북마크 추가 mutation
 */
export function useCreateDiscoverBookmark(
  options?: Omit<UseMutationOptions<DiscoverBookmark, Error, DiscoverBookmarkData>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<DiscoverBookmark, Error, DiscoverBookmarkData>({
    mutationFn: createDiscoverBookmark,
    onSuccess: () => {
      // 북마크 목록 무효화
      queryClient.invalidateQueries({ queryKey: discoverKeys.bookmarks() });
      toast.success('북마크에 추가했습니다.');
    },
    onError: (error) => {
      // 409 Conflict는 이미 북마크된 상태
      if (error.message?.includes('409')) {
        toast.info('이미 북마크된 콘텐츠입니다.');
      } else {
        toast.error(error.message || '북마크에 실패했습니다.');
      }
    },
    ...options,
  });
}

/**
 * 피드 북마크 삭제 mutation
 */
export function useDeleteDiscoverBookmark(
  options?: Omit<UseMutationOptions<void, Error, string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteDiscoverBookmark,
    onSuccess: () => {
      // 북마크 목록 무효화
      queryClient.invalidateQueries({ queryKey: discoverKeys.bookmarks() });
      toast.success('북마크를 취소했습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '북마크 취소에 실패했습니다.');
    },
    ...options,
  });
}

/**
 * 북마크 토글 훅 (추가/삭제 통합)
 */
export function useToggleDiscoverBookmark() {
  const createMutation = useCreateDiscoverBookmark({
    onSuccess: undefined, // 기본 토스트 무시
    onError: undefined,
  });

  const deleteMutation = useDeleteDiscoverBookmark({
    onSuccess: undefined,
    onError: undefined,
  });

  const queryClient = useQueryClient();

  const toggle = async (
    data: DiscoverBookmarkData,
    isCurrentlyBookmarked: boolean
  ): Promise<boolean> => {
    try {
      if (isCurrentlyBookmarked) {
        await deleteMutation.mutateAsync(data.external_id);
        toast.success('북마크를 취소했습니다.');
        queryClient.invalidateQueries({ queryKey: discoverKeys.bookmarks() });
        return false;
      } else {
        await createMutation.mutateAsync(data);
        toast.success('북마크에 추가했습니다.');
        queryClient.invalidateQueries({ queryKey: discoverKeys.bookmarks() });
        return true;
      }
    } catch (error) {
      if (error instanceof Error && error.message?.includes('409')) {
        // 이미 북마크된 상태 - 성공으로 처리
        return true;
      }
      toast.error('북마크 처리에 실패했습니다.');
      throw error;
    }
  };

  return {
    toggle,
    isLoading: createMutation.isPending || deleteMutation.isPending,
  };
}
