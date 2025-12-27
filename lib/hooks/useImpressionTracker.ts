'use client';

import { useEffect, useRef, useCallback } from 'react';
import { checkAuth } from '../api/auth/token.client';
import { recordImpressionsBatch } from '../api/services/posts.service';
import { recordQuestionImpressionsBatch } from '../api/services/questions.service';
import { trackPostImpression, trackQuestionImpression } from '../analytics';

const FLUSH_INTERVAL = 3000;
const MAX_QUEUE_SIZE = 10;

interface ImpressionData {
  id: number;
  type: 'post' | 'question';
  authorId?: string;
  feedPosition: number;
}

export function useImpressionTracker() {
  const isAuthenticatedRef = useRef<boolean>(false);
  const impressedIds = useRef<Set<string>>(new Set()); // type:id 형식으로 저장
  const pendingPostQueue = useRef<number[]>([]);
  const pendingQuestionQueue = useRef<number[]>([]);
  const flushTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const feedPositionRef = useRef<number>(0);

  useEffect(() => {
    checkAuth().then((authenticated) => {
      isAuthenticatedRef.current = authenticated;
    });
  }, []);

  const flush = useCallback(async () => {
    // Post impressions
    if (pendingPostQueue.current.length > 0) {
      const postIds = [...pendingPostQueue.current];
      pendingPostQueue.current = [];
      try {
        await recordImpressionsBatch(postIds);
      } catch (error) {
        console.error('Failed to record post impressions:', error);
      }
    }

    // Question impressions
    if (pendingQuestionQueue.current.length > 0) {
      const questionIds = [...pendingQuestionQueue.current];
      pendingQuestionQueue.current = [];
      try {
        await recordQuestionImpressionsBatch(questionIds);
      } catch (error) {
        console.error('Failed to record question impressions:', error);
      }
    }
  }, []);

  const trackImpression = useCallback(
    (id: number, options?: { type?: 'post' | 'question'; authorId?: string }) => {
      const type = options?.type || 'post';
      const key = `${type}:${id}`;

      if (impressedIds.current.has(key)) return;

      impressedIds.current.add(key);
      feedPositionRef.current += 1;

      // GA4 이벤트 트래킹 (로그인 여부와 관계없이)
      if (type === 'post') {
        trackPostImpression(
          String(id),
          options?.authorId || '',
          feedPositionRef.current
        );
        pendingPostQueue.current.push(id);
      } else {
        trackQuestionImpression(String(id), feedPositionRef.current);
        pendingQuestionQueue.current.push(id);
      }

      // 큐가 차면 flush
      const totalPending = pendingPostQueue.current.length + pendingQuestionQueue.current.length;
      if (totalPending >= MAX_QUEUE_SIZE) {
        flush();
      }
    },
    [flush]
  );

  useEffect(() => {
    flushTimeoutRef.current = setInterval(flush, FLUSH_INTERVAL);
    return () => {
      if (flushTimeoutRef.current) clearInterval(flushTimeoutRef.current);
    };
  }, [flush]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Post impressions
      if (pendingPostQueue.current.length > 0) {
        navigator.sendBeacon(
          '/api/v1/posts/impressions/batch/',
          JSON.stringify({ post_ids: pendingPostQueue.current })
        );
      }
      // Question impressions
      if (pendingQuestionQueue.current.length > 0) {
        navigator.sendBeacon(
          '/api/v1/questions/impressions/batch/',
          JSON.stringify({ question_ids: pendingQuestionQueue.current })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return { trackImpression };
}
