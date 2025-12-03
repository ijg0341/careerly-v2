'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { Loader2, Search, Sparkles, Database, Globe, FileText, CheckCircle2, LogIn } from 'lucide-react';
import { streamChatMessage } from '@/lib/api/services/chat.service';
import type { SSEStatusStep, SSECompleteEvent, ChatCitation } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/useStore';

// 컴포넌트 import
import { SearchQueryHeader } from '@/components/ui/search-query-header';
import { ThreadActionBar } from '@/components/ui/thread-action-bar';
import { AnswerResponsePanel } from '@/components/ui/answer-response-panel';
import { CitationSourceList, type CitationSource } from '@/components/ui/citation-source-list';
import { RelatedQueriesSection, type RelatedQuery } from '@/components/ui/related-queries-section';
import { SuggestedFollowUpInput } from '@/components/ui/suggested-follow-up-input';
import { ViewModeToggle, type ViewMode } from '@/components/ui/view-mode-toggle';
import { SearchResultItem } from '@/components/ui/search-result-item';

// 상태 step에 따른 아이콘 매핑
const STATUS_ICONS: Record<SSEStatusStep, React.ReactNode> = {
  intent: <Sparkles className="h-4 w-4" />,
  searching: <Search className="h-4 w-4" />,
  generating: <Sparkles className="h-4 w-4" />,
};

// 상태 히스토리 아이템 타입
interface StatusHistoryItem {
  id: string;
  step: SSEStatusStep;
  message: string;
  timestamp: number;
}

// 에이전트 활동 표시 컴포넌트 Props
interface AgentActivityProps {
  statusHistory: StatusHistoryItem[];
  currentStatus: { step: SSEStatusStep; message: string } | null;
  sources: string[];
  isStreaming: boolean;
  isGenerating: boolean;
}

function AgentActivityIndicator({ statusHistory = [], currentStatus, sources = [], isStreaming, isGenerating }: AgentActivityProps) {
  if (!isStreaming && statusHistory.length === 0) return null;

  // URL에서 도메인 추출
  const extractDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
      {/* 상태 히스토리 - 누적식으로 표시 */}
      <div className="space-y-2">
        {statusHistory.map((item, index) => {
          const isLast = index === statusHistory.length - 1;
          const isCurrent = isLast && isStreaming && !isGenerating;

          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 py-2 px-3 rounded-lg transition-all",
                isCurrent ? "bg-teal-50 border border-teal-200" : "bg-slate-50"
              )}
            >
              {/* 아이콘 */}
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0",
                isCurrent ? "bg-teal-100 text-teal-600" : "bg-slate-200 text-slate-500"
              )}>
                {isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-teal-500" />
                )}
              </div>

              {/* 메시지 */}
              <p className={cn(
                "text-sm flex-1",
                isCurrent ? "text-teal-700 font-medium" : "text-slate-600"
              )}>
                {item.message}
              </p>

              {/* 시간 표시 (완료된 항목만) */}
              {!isCurrent && (
                <span className="text-xs text-slate-400 flex-shrink-0">완료</span>
              )}
            </div>
          );
        })}

        {/* 답변 생성 중 표시 */}
        {isGenerating && (
          <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-teal-50 border border-teal-200">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex-shrink-0">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <p className="text-sm text-teal-700 font-medium flex-1">
              답변을 작성하고 있어요
            </p>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* 실시간 소스 표시 */}
      {sources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">
            발견된 출처 ({sources.length}개)
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-full hover:border-teal-300 hover:bg-teal-50 transition-colors"
              >
                <Globe className="h-3 w-3 text-slate-400" />
                <span className="text-slate-600 max-w-[150px] truncate">
                  {extractDomain(source)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mock Related Queries
const MOCK_RELATED_QUERIES: RelatedQuery[] = [
  {
    id: 'rq1',
    queryText: '프론트엔드 개발자 경력별 평균 연봉과 연봉 협상 전략은?',
    href: '/search?q=프론트엔드+개발자+연봉+협상',
  },
  {
    id: 'rq2',
    queryText: 'React vs Vue.js 2024년 기준 어떤 프레임워크를 선택해야 할까요?',
    href: '/search?q=React+vs+Vue+2024',
  },
  {
    id: 'rq3',
    queryText: '채용 담당자가 주목하는 프론트엔드 포트폴리오 작성법',
    href: '/search?q=프론트엔드+포트폴리오+작성법',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const openLoginModal = useStore((state) => state.openLoginModal);

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('answer');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [followUpValue, setFollowUpValue] = useState('');

  // Streaming State
  const [streamingContent, setStreamingContent] = useState('');
  const [streamingSources, setStreamingSources] = useState<string[]>([]);
  const [streamStatus, setStreamStatus] = useState<{
    step: SSEStatusStep;
    message: string;
  } | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusHistoryItem[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  // 완료된 답변 저장
  const [completedAnswer, setCompletedAnswer] = useState<string>('');
  const [completedSources, setCompletedSources] = useState<string[]>([]);
  const [completedMetadata, setCompletedMetadata] = useState<SSECompleteEvent | null>(null);

  // Cleanup ref
  const cleanupRef = useRef<(() => void) | null>(null);
  // 이미 요청 중인 쿼리 추적 (중복 요청 방지)
  const currentQueryRef = useRef<string | null>(null);
  // isStreaming을 ref로도 추적 (useCallback 의존성 문제 해결)
  const isStreamingRef = useRef(false);

  // 스트리밍 시작 함수
  const startStreaming = useCallback((queryText: string, existingSessionId?: string | null) => {
    const trimmedQuery = queryText.trim();
    if (!trimmedQuery) return;

    // 중복 요청 방지 (같은 쿼리로 이미 요청 중인 경우)
    if (currentQueryRef.current === trimmedQuery && isStreamingRef.current) {
      return;
    }

    // 이전 스트림 정리
    cleanupRef.current?.();
    currentQueryRef.current = trimmedQuery;

    // 상태 초기화
    isStreamingRef.current = true;
    setIsStreaming(true);
    setStreamingContent('');
    setStreamingSources([]);
    setStreamStatus(null);
    setStatusHistory([]);
    setError(null);
    setCompletedAnswer('');
    setCompletedSources([]);
    setCompletedMetadata(null);

    // 스트림 시작
    const cleanup = streamChatMessage(queryText.trim(), existingSessionId ?? null, {
      onStatus: (step, message) => {
        setStreamStatus({ step, message });
        // 상태 히스토리에 추가 (중복 방지)
        setStatusHistory((prev) => {
          // 같은 step과 message가 이미 있으면 추가하지 않음
          const exists = prev.some(item => item.step === step && item.message === message);
          if (exists) return prev;
          return [...prev, {
            id: `${step}-${Date.now()}`,
            step,
            message,
            timestamp: Date.now(),
          }];
        });
      },
      onToken: (token) => {
        setStreamStatus(null);
        setStreamingContent((prev) => prev + token);
      },
      onSources: (sources) => {
        setStreamingSources(sources);
      },
      onComplete: (metadata: SSECompleteEvent) => {
        // 최종 답변 저장
        // 1. streamingContent가 있으면 그것을 사용 (token 스트리밍 방식)
        // 2. 없으면 metadata.answer 사용 (complete에서 전체 답변 전송 방식)
        setStreamingContent((currentContent) => {
          const finalAnswer = currentContent || metadata.answer || '';
          if (finalAnswer) {
            setCompletedAnswer(finalAnswer);
          }
          return '';
        });

        setCompletedSources(streamingSources);
        setCompletedMetadata(metadata);

        // 세션 ID 업데이트
        if (metadata.session_id) {
          setSessionId(metadata.session_id);
        }

        setStreamStatus(null);
        isStreamingRef.current = false;
        setIsStreaming(false);
        cleanupRef.current = null;
        currentQueryRef.current = null;
      },
      onError: (errorMsg, errorCode) => {
        console.error('Streaming error:', errorMsg, 'Code:', errorCode);

        // 401 에러 시 로그인 모달 열기
        if (errorCode === '401') {
          openLoginModal();
          setError({
            message: '로그인이 필요합니다. 로그인 후 다시 시도해주세요.',
            code: errorCode
          });
        } else {
          setError({ message: errorMsg, code: errorCode });
        }

        setStreamStatus(null);
        setStreamingContent('');
        isStreamingRef.current = false;
        setIsStreaming(false);
        cleanupRef.current = null;
        currentQueryRef.current = null;
      },
    });

    cleanupRef.current = cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openLoginModal]);

  // 쿼리 변경 시 스트리밍 시작
  useEffect(() => {
    if (!query || query.trim().length === 0) return;
    startStreaming(query);

    return () => {
      cleanupRef.current?.();
      // cleanup 시 상태 초기화 (React Strict Mode 대응)
      currentQueryRef.current = null;
      isStreamingRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // 핸들러들
  const handleEdit = () => {
    console.log('Edit query');
  };

  const handleShare = () => {
    console.log('Share thread');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleExport = () => {
    console.log('Export thread');
  };

  const handleRewrite = () => {
    if (query) {
      startStreaming(query, sessionId);
    }
  };

  const handleRetry = () => {
    if (query) {
      startStreaming(query, sessionId);
    }
  };

  const handleFollowUpSubmit = () => {
    if (!followUpValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(followUpValue.trim())}`);
    setFollowUpValue('');
  };

  const handleRelatedQueryClick = (relatedQuery: RelatedQuery) => {
    router.push(`/search?q=${encodeURIComponent(relatedQuery.queryText)}`);
  };

  // 표시할 답변 (스트리밍 중이면 스트리밍 컨텐츠, 아니면 완료된 답변)
  const displayAnswer = streamingContent || completedAnswer;
  const displaySources = streamingSources.length > 0 ? streamingSources : completedSources;

  // Citations 변환
  const citationSources: CitationSource[] = displaySources.map((url, index) => ({
    id: `citation-${index + 1}`,
    title: extractTitleFromUrl(url),
    href: url,
    faviconUrl: undefined,
  }));

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">검색어를 입력해주세요.</p>
      </div>
    );
  }

  const isLoading = isStreaming && !streamingContent;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* SearchQueryHeader */}
        <SearchQueryHeader
          queryText={query}
          onEdit={handleEdit}
          className="mb-3 border-b-0"
        />

        {/* 컨트롤 바 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            {/* 스트리밍 상태 표시 배지 */}
            {isStreaming && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-medium text-teal-700">AI 답변 생성 중</span>
              </div>
            )}
          </div>

          {/* 우측: ViewModeToggle + ThreadActionBar */}
          <div className="flex items-center gap-3">
            <ViewModeToggle
              mode={viewMode}
              onChange={setViewMode}
            />
            <ThreadActionBar
              onShare={handleShare}
              onBookmark={handleBookmark}
              onExport={handleExport}
              onRewrite={handleRewrite}
              isBookmarked={isBookmarked}
            />
          </div>
        </div>

        {/* 에이전트 활동 표시 */}
        <AgentActivityIndicator
          statusHistory={statusHistory}
          currentStatus={streamStatus}
          sources={displaySources}
          isStreaming={isStreaming}
          isGenerating={streamingContent.length > 0}
        />

        {/* 에러 표시 */}
        {error && (
          <div className={cn(
            "mb-6 p-4 rounded-lg border",
            error.code === '401'
              ? "bg-amber-50 border-amber-200"
              : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-start gap-3">
              {error.code === '401' && (
                <LogIn className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={cn(
                  "text-sm",
                  error.code === '401' ? "text-amber-700" : "text-red-700"
                )}>
                  {error.message}
                </p>
                <div className="mt-3 flex gap-2">
                  {error.code === '401' ? (
                    <button
                      onClick={openLoginModal}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      로그인
                    </button>
                  ) : (
                    <button
                      onClick={handleRetry}
                      className="text-sm text-red-600 hover:text-red-800 underline"
                    >
                      다시 시도
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 메인 컨텐츠 */}
        <div className="space-y-6">
          {viewMode === 'answer' && (
            <>
              {/* 스트리밍 중인 답변 또는 완료된 답변 */}
              {streamingContent ? (
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                    {streamingContent}
                    <span className="inline-block w-0.5 h-5 bg-teal-500 animate-pulse ml-0.5 align-text-bottom" />
                  </div>
                </div>
              ) : completedAnswer ? (
                <AnswerResponsePanel
                  answerHtml={completedAnswer}
                  loading={false}
                  error={undefined}
                  onRetry={handleRetry}
                  className="border-0 shadow-none bg-transparent p-0"
                />
              ) : isLoading ? (
                <div className="py-8 text-center text-slate-500">
                  {/* 로딩은 AgentActivityIndicator에서 처리 */}
                </div>
              ) : null}

              {/* CitationSourceList */}
              {!isStreaming && completedAnswer && citationSources.length > 0 && (
                <div className="py-4 border-t border-slate-200">
                  <CitationSourceList sources={citationSources} />
                </div>
              )}
            </>
          )}

          {/* Sources 모드 */}
          {viewMode === 'sources' && !isStreaming && completedAnswer && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">
                검색 결과 ({citationSources.length}개)
              </h2>
              {citationSources.map((source) => (
                <SearchResultItem
                  key={source.id}
                  title={source.title}
                  snippet=""
                  href={source.href}
                  faviconUrl={source.faviconUrl}
                />
              ))}
            </div>
          )}

          {/* RelatedQueriesSection */}
          {!isStreaming && completedAnswer && (
            <div className="py-6 border-t border-slate-200">
              <RelatedQueriesSection
                relatedQueries={MOCK_RELATED_QUERIES}
                onQueryClick={handleRelatedQueryClick}
              />
            </div>
          )}

          {/* SuggestedFollowUpInput */}
          {!isStreaming && completedAnswer && (
            <div className="py-6 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                추가 질문하기
              </h3>
              <SuggestedFollowUpInput
                value={followUpValue}
                onChange={(value) => setFollowUpValue(value)}
                onSubmit={handleFollowUpSubmit}
                placeholder="더 궁금한 점이 있으신가요?"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// URL에서 제목 추출 헬퍼 함수
function extractTitleFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');

    if (hostname.includes('careerly')) {
      return 'Careerly 아티클';
    }

    return hostname
      .split('.')
      .slice(0, -1)
      .join('.')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Reference';
  } catch {
    return 'Reference';
  }
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-500" />
          <p className="text-slate-500">검색 중...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
