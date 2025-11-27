/**
 * Posts API 서비스
 */

import { publicClient, authClient, handleApiError } from '../clients/rest-client';
import type {
  Post,
  PostCreateRequest,
  PostUpdateRequest,
  PaginatedPostResponse,
} from '../types/posts.types';

/**
 * 게시물 목록 조회 (페이징)
 */
export async function getPosts(page?: number): Promise<PaginatedPostResponse> {
  try {
    const params = page ? { page } : {};
    const response = await publicClient.get<PaginatedPostResponse>('/api/v1/posts/', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 인기 게시물 조회 (좋아요 순)
 */
export async function getPopularPosts(limit: number = 5): Promise<PaginatedPostResponse> {
  try {
    const params = { ordering: '-like_count', page_size: limit };
    const response = await publicClient.get<PaginatedPostResponse>('/api/v1/posts/', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 상세 조회
 */
export async function getPost(id: number): Promise<Post> {
  try {
    const response = await publicClient.get<Post>(`/api/v1/posts/${id}/`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 생성
 * 인증 필요
 */
export async function createPost(data: PostCreateRequest): Promise<Post> {
  try {
    const response = await authClient.post<Post>('/api/v1/posts/', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 수정
 * 인증 필요, 작성자만 가능
 */
export async function updatePost(id: number, data: PostUpdateRequest): Promise<Post> {
  try {
    const response = await authClient.put<Post>(`/api/v1/posts/${id}/`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 부분 수정
 * 인증 필요, 작성자만 가능
 */
export async function patchPost(id: number, data: Partial<PostUpdateRequest>): Promise<Post> {
  try {
    const response = await authClient.patch<Post>(`/api/v1/posts/${id}/`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 삭제 (Soft Delete)
 * 인증 필요, 작성자만 가능
 */
export async function deletePost(id: number): Promise<void> {
  try {
    await authClient.delete(`/api/v1/posts/${id}/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 좋아요
 * 인증 필요
 */
export async function likePost(postId: number): Promise<void> {
  try {
    await authClient.post(`/api/v1/posts/${postId}/like/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 좋아요 취소
 * 인증 필요
 */
export async function unlikePost(postId: number): Promise<void> {
  try {
    await authClient.post(`/api/v1/posts/${postId}/unlike/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 좋아요 여부 확인
 * 인증 필요
 */
export async function isPostLiked(postId: number): Promise<boolean> {
  try {
    const response = await authClient.get<{ is_liked: boolean }>(`/api/v1/posts/${postId}/is-liked/`);
    return response.data.is_liked;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 북마크 (저장)
 * 인증 필요
 */
export async function savePost(postId: number): Promise<void> {
  try {
    await authClient.post(`/api/v1/posts/${postId}/save/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 북마크 취소
 * 인증 필요
 */
export async function unsavePost(postId: number): Promise<void> {
  try {
    await authClient.post(`/api/v1/posts/${postId}/unsave/`);
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 북마크 여부 확인
 * 인증 필요
 */
export async function isPostSaved(postId: number): Promise<boolean> {
  try {
    const response = await authClient.get<{ is_saved: boolean }>(`/api/v1/posts/${postId}/is-saved/`);
    return response.data.is_saved;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * 게시물 조회수 증가
 * 인증 필요
 */
export async function viewPost(postId: number): Promise<void> {
  try {
    await authClient.post(`/api/v1/posts/${postId}/view/`);
  } catch (error) {
    throw handleApiError(error);
  }
}
