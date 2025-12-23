'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  /** 자식 컴포넌트 */
  children: React.ReactNode;
  /** 새로고침 콜백 함수 */
  onRefresh: () => Promise<void>;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 스피너가 표시될 상단 오프셋 (헤더 높이 고려) */
  topOffset?: number;
  /** 추가 클래스 */
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  disabled = false,
  topOffset = 56, // 기본 헤더 높이 (h-14 = 56px)
  className,
}: PullToRefreshProps) {
  const { pullDistance, isRefreshing, handlers } =
    usePullToRefresh({
      onRefresh,
      disabled,
      threshold: 80,
      maxPullDistance: 150,
      resistance: 0.4,
    });

  // 스피너 투명도 (당김 시작 후 점진적 표시)
  const opacity = Math.min(pullDistance / 40, 1);

  return (
    <div
      {...handlers}
      className={cn('relative', className)}
      style={{ touchAction: pullDistance > 5 ? 'none' : 'auto' }}
    >
      {/* Pull to Refresh 스피너 */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
            style={{
              top: `calc(env(safe-area-inset-top) + ${topOffset}px)`,
            }}
          >
            <motion.div
              style={{
                opacity: isRefreshing ? 1 : opacity,
              }}
              animate={{
                y: isRefreshing ? 16 : Math.min(pullDistance * 0.5, 60),
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <Loader2
                className="w-6 h-6 text-slate-400 animate-spin"
                strokeWidth={2}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 컨텐츠 영역 */}
      <motion.div
        animate={{
          y: isRefreshing ? 20 : pullDistance > 0 ? pullDistance * 0.3 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
