'use client';

import * as React from 'react';
import { TabNav } from '@/components/design-guide/TabNav';
import { ComponentTabNav } from '@/components/design-guide/ComponentTabNav';
import { ComponentShowcase } from '@/components/design-guide/ComponentShowcase';
import { QuickNav } from '@/components/design-guide/QuickNav';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Share2, Filter, SortAsc, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { KeyboardShortcutsHelp } from '@/components/ui/keyboard-shortcuts-help';

export default function OverlaysComponentsPage() {
  const navItems = [
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'popover', label: 'Popover' },
    { id: 'dropdown-menu', label: 'DropdownMenu' },
    { id: 'toast', label: 'Toast (Sonner)' },
    { id: 'keyboard-shortcuts', label: 'KeyboardShortcutsHelp' },
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
          <h2 className="text-2xl font-bold text-slate-900">Overlays</h2>
          <p className="text-slate-600 mt-1">
            오버레이 컴포넌트 - 툴팁, 팝오버, 드롭다운 메뉴 등
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Tooltip */}
            <ComponentShowcase
              title="Tooltip"
              description="마우스오버 설명 컴포넌트"
              usageContext="아이콘 버튼, 정렬/필터 아이콘"
            >
              <TooltipProvider delayDuration={200}>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconButton variant="ghost" aria-label="Like">
                        <Heart className="h-5 w-5" />
                      </IconButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>좋아요</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconButton variant="ghost" aria-label="Share">
                        <Share2 className="h-5 w-5" />
                      </IconButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>공유하기</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>더 많은 정보를 보려면 클릭하세요</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </ComponentShowcase>

            {/* Popover */}
            <ComponentShowcase
              title="Popover"
              description="경량 오버레이 컴포넌트"
              usageContext="퀵필터, 소팅 옵션"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    필터
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" sideOffset={8}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">필터 옵션</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter1" />
                          <label htmlFor="filter1" className="text-sm">
                            카테고리 1
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter2" />
                          <label htmlFor="filter2" className="text-sm">
                            카테고리 2
                          </label>
                        </div>
                      </div>
                    </div>
                    <PopoverClose asChild>
                      <Button className="w-full">적용</Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
              <p className="text-xs text-slate-500 mt-2">
                💡 Popover는 외부 클릭이나 ESC 키로 닫을 수 있습니다
              </p>
            </ComponentShowcase>

            {/* DropdownMenu */}
            <ComponentShowcase
              title="DropdownMenu"
              description="다중 옵션 선택 메뉴"
              usageContext="정렬(인기/최신), 공유 메뉴"
            >
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <SortAsc className="mr-2 h-4 w-4" />
                      정렬
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>인기순</DropdownMenuItem>
                    <DropdownMenuItem>최신순</DropdownMenuItem>
                    <DropdownMenuItem>오래된순</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton variant="ghost" aria-label="Share">
                      <Share2 className="h-5 w-5" />
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Twitter에 공유</DropdownMenuItem>
                    <DropdownMenuItem>Facebook에 공유</DropdownMenuItem>
                    <DropdownMenuItem>링크 복사</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </ComponentShowcase>

            {/* Toast (Sonner) */}
            <ComponentShowcase
              title="Toast (Sonner)"
              description="토스트 알림 컴포넌트"
              usageContext="전역"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Toast Types</p>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => toast.success('성공적으로 저장되었습니다!')} variant="outline" size="sm">
                      Success Toast
                    </Button>
                    <Button onClick={() => toast.error('오류가 발생했습니다.')} variant="outline" size="sm">
                      Error Toast
                    </Button>
                    <Button onClick={() => toast.info('새로운 업데이트가 있습니다.')} variant="outline" size="sm">
                      Info Toast
                    </Button>
                    <Button onClick={() => toast.warning('주의가 필요합니다.')} variant="outline" size="sm">
                      Warning Toast
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">💡 Sonner 라이브러리를 사용하여 토스트를 표시합니다</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">With Action</p>
                  <Button
                    onClick={() =>
                      toast('이벤트가 생성되었습니다', {
                        action: {
                          label: '실행 취소',
                          onClick: () => toast.info('실행 취소되었습니다'),
                        },
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    Toast with Action
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">With Description</p>
                  <Button
                    onClick={() =>
                      toast.success('작업 완료', {
                        description: '모든 변경사항이 저장되었습니다.',
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    Toast with Description
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Promise Toast</p>
                  <Button
                    onClick={() => {
                      const promise = new Promise((resolve) => setTimeout(resolve, 2000));
                      toast.promise(promise, {
                        loading: '데이터를 불러오는 중...',
                        success: '데이터 로드 완료!',
                        error: '데이터 로드 실패',
                      });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Promise Toast
                  </Button>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
                  <p className="text-xs font-mono text-slate-700">
                    <strong>사용법:</strong>
                  </p>
                  <code className="text-xs block">
                    {`import { toast } from 'sonner';`}
                    <br />
                    <br />
                    {`// 기본 사용`}
                    <br />
                    {`toast.success('저장 완료');`}
                    <br />
                    {`toast.error('오류 발생');`}
                    <br />
                    <br />
                    {`// 옵션과 함께`}
                    <br />
                    {`toast('메시지', {`}
                    <br />
                    {`  description: '설명',`}
                    <br />
                    {`  action: { label: '실행 취소', onClick: () => {} }`}
                    <br />
                    {`});`}
                  </code>
                </div>
              </div>
            </ComponentShowcase>

            {/* KeyboardShortcutsHelp */}
            <ComponentShowcase
              title="KeyboardShortcutsHelp"
              description="키보드 단축키 도움말"
              usageContext="툴팁/팝오버/모달 내부"
            >
              <div className="max-w-md">
                <KeyboardShortcutsHelp
                  items={[
                    { keys: ['⌘', 'K'], description: '검색 열기' },
                    { keys: ['⌘', 'B'], description: '북마크 추가' },
                    { keys: ['⌘', 'S'], description: '저장' },
                    { keys: ['Esc'], description: '닫기' },
                    { keys: ['↑', '↓'], description: '항목 이동' },
                    { keys: ['Enter'], description: '선택' },
                  ]}
                />
              </div>
            </ComponentShowcase>

            <div className="mt-12 p-6 bg-white border border-slate-200 rounded-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Overlays 가이드</h2>
              <div className="space-y-3 text-sm text-slate-700">
                <p>• Tooltip은 짧은 설명에, Popover는 더 많은 콘텐츠에 사용합니다.</p>
                <p>• DropdownMenu는 선택 가능한 옵션 목록을 제공합니다.</p>
                <p>• Toast는 Sonner 라이브러리를 사용하여 간편하게 알림을 표시합니다.</p>
                <p>• 모든 오버레이는 ESC 키와 외부 클릭으로 닫을 수 있습니다.</p>
                <p>• 키보드 네비게이션을 지원하여 접근성을 보장합니다.</p>
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
