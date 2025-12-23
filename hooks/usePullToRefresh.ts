'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  /** 새로고침을 트리거할 최소 당김 거리 (px) */
  threshold?: number;
  /** 최대 당김 거리 (px) */
  maxPullDistance?: number;
  /** 당김 저항값 (0~1, 낮을수록 더 많은 당김 필요) */
  resistance?: number;
  /** 새로고침 콜백 함수 */
  onRefresh: () => Promise<void>;
  /** 비활성화 여부 */
  disabled?: boolean;
}

interface UsePullToRefreshReturn {
  /** 현재 당김 거리 (px) */
  pullDistance: number;
  /** 새로고침 트리거 가능 여부 */
  isReadyToRefresh: boolean;
  /** 새로고침 중 여부 */
  isRefreshing: boolean;
  /** 터치 핸들러 props */
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  /** 컨테이너 ref */
  containerRef: React.RefObject<HTMLDivElement>;
}

export function usePullToRefresh({
  threshold = 80,
  maxPullDistance = 150,
  resistance = 0.4,
  onRefresh,
  disabled = false,
}: UsePullToRefreshOptions): UsePullToRefreshReturn {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const isPullingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isReadyToRefresh = pullDistance >= threshold;

  const canPull = useCallback(() => {
    if (disabled || isRefreshing) return false;
    // 스크롤이 최상단인지 확인
    return window.scrollY <= 0;
  }, [disabled, isRefreshing]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!canPull()) return;
      startYRef.current = e.touches[0].clientY;
      currentYRef.current = e.touches[0].clientY;
      isPullingRef.current = false;
    },
    [canPull]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!canPull()) {
        // 새로고침 중이거나 스크롤이 최상단이 아니면 당김 리셋
        if (pullDistance > 0) {
          setPullDistance(0);
          isPullingRef.current = false;
        }
        return;
      }

      currentYRef.current = e.touches[0].clientY;
      const delta = currentYRef.current - startYRef.current;

      // 아래로 당기는 경우만 처리
      if (delta > 0) {
        // 처음 당기기 시작할 때
        if (!isPullingRef.current && delta > 10) {
          isPullingRef.current = true;
        }

        if (isPullingRef.current) {
          // 저항값 적용하여 당김 거리 계산
          const adjustedDelta = delta * resistance;
          const newPullDistance = Math.min(adjustedDelta, maxPullDistance);
          setPullDistance(newPullDistance);

          // 스크롤 방지 (당기는 동안)
          if (newPullDistance > 5) {
            e.preventDefault();
          }
        }
      }
    },
    [canPull, maxPullDistance, resistance, pullDistance]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPullingRef.current) return;

    if (isReadyToRefresh && !isRefreshing) {
      setIsRefreshing(true);
      // 새로고침 위치로 고정
      setPullDistance(threshold);

      try {
        await onRefresh();
      } catch (error) {
        console.error('Pull to refresh error:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      // 임계값 미달시 원위치
      setPullDistance(0);
    }

    isPullingRef.current = false;
  }, [isReadyToRefresh, isRefreshing, onRefresh, threshold]);

  // 키보드로 새로고침 (접근성)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || isRefreshing) return;
      // Ctrl+R 또는 Cmd+R은 브라우저 기본 동작 사용
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, isRefreshing]);

  return {
    pullDistance,
    isReadyToRefresh,
    isRefreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    containerRef,
  };
}
