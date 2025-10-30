'use client';

import * as React from 'react';
import { TabNav } from '@/components/design-guide/TabNav';
import { ComponentTabNav } from '@/components/design-guide/ComponentTabNav';
import { ComponentShowcase } from '@/components/design-guide/ComponentShowcase';
import { QuickNav } from '@/components/design-guide/QuickNav';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorBanner } from '@/components/ui/error-banner';

export default function FeedbackComponentsPage() {
  const [progress, setProgress] = React.useState(13);
  const [showErrorBanner, setShowErrorBanner] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'spinner', label: 'Spinner' },
    { id: 'skeleton', label: 'Skeleton' },
    { id: 'progress', label: 'ProgressBar' },
    { id: 'empty-state', label: 'EmptyState' },
    { id: 'error-banner', label: 'ErrorBanner' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <TabNav />

        <div className="mt-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Components</h1>
          <p className="text-slate-600 mt-2">
            Careerly v2 디자인 시스템의 모든 컴포넌트입니다. 각 컴포넌트 제목을 클릭하면 이름이 복사됩니다.
          </p>
        </div>

        <ComponentTabNav />

        <div className="mt-6 mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Feedback & Loading</h2>
          <p className="text-slate-600 mt-1">
            사용자 피드백과 로딩 상태 표시 컴포넌트 - 스피너, 스켈레톤, 프로그레스 바 등
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Spinner */}
            <ComponentShowcase title="Spinner" description="진행 표시 로더" usageContext="버튼 로딩, 카드 로딩">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Sizes</p>
                  <div className="flex flex-wrap items-end gap-4">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Colors</p>
                  <div className="flex flex-wrap gap-4">
                    <Spinner color="default" />
                    <Spinner color="brand" />
                    <div className="bg-slate-900 p-4 rounded">
                      <Spinner color="white" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">In Button</p>
                  <Button disabled>
                    <Spinner size="sm" color="white" className="mr-2" />
                    Loading...
                  </Button>
                </div>
              </div>
            </ComponentShowcase>

            {/* Skeleton */}
            <ComponentShowcase
              title="Skeleton"
              description="콘텐츠 자리 표시자"
              usageContext="카드, 리스트 항목, 썸네일"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Text</p>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Card</p>
                  <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-40 w-full rounded" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Avatar + Text</p>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Progress */}
            <ComponentShowcase
              title="ProgressBar"
              description="진행률 표시 컴포넌트"
              usageContext="배치/페치 진행(옵션)"
            >
              <div className="max-w-md space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>진행률</Label>
                    <span className="text-sm text-slate-600">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>완료됨</Label>
                    <span className="text-sm text-slate-600">100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
            </ComponentShowcase>

            {/* EmptyState */}
            <ComponentShowcase
              title="EmptyState"
              description="결과 없음 상태 표시"
              usageContext="필터로 0건일 때"
            >
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Empty Results</p>
                  <EmptyState
                    variant="empty"
                    title="결과가 없습니다"
                    description="검색 결과를 찾을 수 없습니다. 다른 키워드로 다시 시도해보세요."
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">No Search Results</p>
                  <EmptyState
                    variant="search"
                    title="검색 결과가 없습니다"
                    description="검색어를 다시 확인하거나 다른 키워드를 입력해보세요."
                    actionLabel="검색 초기화"
                    onAction={() => console.log('Reset search')}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">No Filter Results</p>
                  <EmptyState
                    variant="filter"
                    title="필터와 일치하는 항목이 없습니다"
                    description="필터 조건을 변경하거나 초기화해보세요."
                    actionLabel="필터 초기화"
                    onAction={() => console.log('Reset filters')}
                  />
                </div>
              </div>
            </ComponentShowcase>

            {/* ErrorBanner */}
            <ComponentShowcase
              title="ErrorBanner"
              description="오류 안내 배너"
              usageContext="데이터 페치 실패"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Inline (Default)</p>
                  {showErrorBanner && (
                    <ErrorBanner
                      variant="inline"
                      message="데이터를 불러오는 중 오류가 발생했습니다."
                      onRetry={() => console.log('Retry')}
                      onDismiss={() => setShowErrorBanner(false)}
                    />
                  )}
                  {!showErrorBanner && (
                    <Button onClick={() => setShowErrorBanner(true)} size="sm" variant="outline">
                      에러 배너 다시 표시
                    </Button>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Without Dismiss</p>
                  <ErrorBanner
                    variant="inline"
                    message="네트워크 연결을 확인해주세요."
                    onRetry={() => console.log('Retry')}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Simple Error</p>
                  <ErrorBanner variant="inline" message="요청을 처리할 수 없습니다." />
                </div>
              </div>
            </ComponentShowcase>

            <div className="mt-12 p-6 bg-white border border-slate-200 rounded-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Feedback & Loading 가이드</h2>
              <div className="space-y-3 text-sm text-slate-700">
                <p>• 로딩 상태는 사용자에게 작업이 진행 중임을 알립니다.</p>
                <p>• Spinner는 짧은 로딩에, Skeleton은 콘텐츠 로딩 중에 사용합니다.</p>
                <p>• Progress는 명확한 진행률이 있는 작업에 적합합니다.</p>
                <p>• 로딩 시간이 1초 이상 예상될 때 로딩 인디케이터를 표시하세요.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <QuickNav items={navItems} />
          </aside>
        </div>
      </div>
    </div>
  );
}
