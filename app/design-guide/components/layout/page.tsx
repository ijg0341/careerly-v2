'use client';

import * as React from 'react';
import { TabNav } from '@/components/design-guide/TabNav';
import { ComponentTabNav } from '@/components/design-guide/ComponentTabNav';
import { ComponentShowcase } from '@/components/design-guide/ComponentShowcase';
import { QuickNav } from '@/components/design-guide/QuickNav';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { IconButton } from '@/components/ui/icon-button';
import { Play, Clock, Eye, Heart, Bookmark, Home, Settings, Users, Bell, HelpCircle, Plus, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarRail, NavItemButton, AccountButton, CTAButton } from '@/components/ui/sidebar-rail';
import { DiscoverFeedSection } from '@/components/ui/discover-feed-section';
import { DiscoverContentCardProps } from '@/components/ui/discover-content-card';

export default function LayoutComponentsPage() {
  const [activePath, setActivePath] = React.useState('/home');
  const [loadMoreHasMore, setLoadMoreHasMore] = React.useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = React.useState(false);

  const sampleFeedItems: DiscoverContentCardProps[] = [
    {
      title: 'React 19의 새로운 기능',
      summary: 'React 19에서 추가된 새로운 훅과 기능들을 소개합니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      sources: [{ name: 'React Blog', href: '#' }],
      postedAt: '2시간 전',
      stats: { likes: 245, views: 1200 },
      href: '#',
      badge: '인기',
    },
    {
      title: 'TypeScript 5.0 베타 출시',
      summary: 'TypeScript 5.0 베타 버전이 공개되었습니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
      sources: [{ name: 'TypeScript Team' }],
      postedAt: '5시간 전',
      stats: { likes: 189, views: 890 },
      href: '#',
    },
    {
      title: 'Next.js 14 Performance Guide',
      summary: 'Next.js 14에서 성능을 최적화하는 방법을 알아봅니다.',
      sources: [{ name: 'Vercel', href: '#' }],
      postedAt: '1일 전',
      stats: { likes: 567, views: 3200 },
      href: '#',
      badge: '추천',
      badgeTone: 'coral',
    },
  ];

  const navItems = [
    { id: 'sidebar-rail', label: 'SidebarRail' },
    { id: 'card', label: 'Card' },
    { id: 'discover-feed-section', label: 'DiscoverFeedSection' },
    { id: 'visually-hidden', label: 'VisuallyHidden' },
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
          <h2 className="text-2xl font-bold text-slate-900">Layout</h2>
          <p className="text-slate-600 mt-1">
            페이지 구조와 레이아웃 컴포넌트 - 컨테이너, 그리드, 스택, 구분선 등
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* SidebarRail */}
            <ComponentShowcase
              title="SidebarRail"
              description="통합 사이드메뉴 레이아웃"
              usageContext="모든 페이지"
            >
              <div className="space-y-6">
                {/* Complete Sidebar Example */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Collapsed Sidebar (Preview)</p>
                  <p className="text-xs text-slate-500 mb-3">
                    ⚠️ 서브메뉴는 실제 페이지에서 확인하세요. 여기서는 구조만 표시됩니다.
                  </p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 h-[600px] relative">
                    <SidebarRail
                      activePath={activePath}
                      sections={{
                        primary: [
                          {
                            label: 'Home',
                            path: '/home',
                            icon: Home,
                          },
                          {
                            label: 'Users',
                            path: '/users',
                            icon: Users,
                            badge: 12,
                          },
                          { label: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
                        ],
                        utilities: [
                          { label: 'Settings', path: '/settings', icon: Settings },
                          { label: 'Help', path: '/help', icon: HelpCircle },
                        ],
                        account: {
                          name: 'John Doe',
                          email: 'john@careerly.com',
                          fallback: 'JD',
                        },
                        ctas: [
                          { label: 'Upgrade', icon: Star, variant: 'coral' },
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Basic Example */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Basic Navigation</p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 h-[400px] relative">
                    <SidebarRail
                      activePath="/home"
                      sections={{
                        primary: [
                          { label: 'Home', path: '/home', icon: Home },
                          { label: 'Users', path: '/users', icon: Users },
                          { label: 'Settings', path: '/settings', icon: Settings },
                        ],
                        account: {
                          name: 'Jane Smith',
                          fallback: 'JS',
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Floating Variant */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Floating Variant</p>
                  <div className="bg-slate-100 rounded-lg h-[400px] relative">
                    <SidebarRail
                      variant="floating"
                      sections={{
                        primary: [
                          { label: 'Dashboard', path: '/dashboard', icon: Home },
                          { label: 'Team', path: '/team', icon: Users },
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Individual Components */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Individual Components (16px width)</p>
                  <div className="space-y-4 border border-slate-200 rounded-lg p-4 bg-white w-16">
                    {/* NavItemButton */}
                    <div>
                      <NavItemButton
                        label="Home"
                        icon={Home}
                        active={false}
                      />
                    </div>
                    <div>
                      <NavItemButton
                        label="Notifications"
                        icon={Bell}
                        badge={5}
                        active={true}
                      />
                    </div>
                    <div>
                      <NavItemButton
                        label="Settings"
                        icon={Settings}
                        disabled={true}
                      />
                    </div>

                    {/* AccountButton */}
                    <div className="pt-4 border-t border-slate-200">
                      <AccountButton
                        name="Alex Johnson"
                        email="alex@careerly.com"
                        fallback="AJ"
                      />
                    </div>

                    {/* CTAButton */}
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <CTAButton label="Upgrade Now" icon={Star} variant="coral" />
                      <CTAButton label="Add New" icon={Plus} variant="solid" />
                    </div>
                  </div>
                </div>

                {/* Props Documentation */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Props</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p><code className="bg-white px-2 py-1 rounded">activePath</code>: string - 현재 활성화된 경로</p>
                    <p><code className="bg-white px-2 py-1 rounded">variant</code>: &quot;default&quot; | &quot;floating&quot; | &quot;inset&quot; - 스타일 변형</p>
                    <p><code className="bg-white px-2 py-1 rounded">sections</code>: SidebarSections - primary/utilities/account/ctas 섹션 구성</p>
                    <p><code className="bg-white px-2 py-1 rounded">subItems</code>: SubNavItemConfig[] - 서브메뉴 아이템 (NavItemButton)</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">특징</p>
                    <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                      <li>기본 폭: 64px (w-16) - 항상 접힌 상태</li>
                      <li>각 메뉴 아이템 클릭 시 서브메뉴 팝업으로 표시</li>
                      <li>뱃지는 아이콘 우상단에 작게 표시</li>
                      <li>아이콘만 표시, 텍스트는 툴팁과 서브메뉴에서 확인</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Card */}
            <ComponentShowcase
              title="Card"
              description="공용 카드 래퍼 컴포넌트"
              usageContext="토픽/피드/업셀"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Basic Card</p>
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>This is a description of the card content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        카드 본문 내용이 여기에 표시됩니다. 여러 줄의 텍스트와 다른 컴포넌트를 포함할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Card with Footer</p>
                  <Card className="max-w-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge>Tech</Badge>
                        <span className="text-xs text-slate-500">2시간 전</span>
                      </div>
                      <CardTitle>React 19 릴리스 노트</CardTitle>
                      <CardDescription>새로운 기능과 개선사항을 확인하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          1.2k
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          342
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Bookmark className="h-4 w-4 mr-2" />
                        북마크
                      </Button>
                      <Button variant="coral" size="sm" className="flex-1">
                        자세히 보기
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Interactive Card</p>
                  <Card interactive className="max-w-md">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">TechCrunch</CardTitle>
                          <CardDescription className="text-xs">5분 전</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        인터랙티브 카드는 hover 효과가 있으며, 클릭 가능한 영역으로 사용할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Elevation Variants</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card elevation="sm">
                      <CardContent className="pt-6">
                        <p className="text-sm font-medium">Small Shadow</p>
                      </CardContent>
                    </Card>
                    <Card elevation="md">
                      <CardContent className="pt-6">
                        <p className="text-sm font-medium">Medium Shadow</p>
                      </CardContent>
                    </Card>
                    <Card elevation="lg">
                      <CardContent className="pt-6">
                        <p className="text-sm font-medium">Large Shadow</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </ComponentShowcase>

            {/* DiscoverFeedSection */}
            <ComponentShowcase
              title="DiscoverFeedSection"
              description="콘텐츠 피드 섹션 레이아웃"
              usageContext="Discover 페이지 메인 콘텐츠 영역"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Grid Layout (Default)</p>
                  <DiscoverFeedSection
                    items={sampleFeedItems}
                    layout="grid"
                    pagination={{
                      hasMore: loadMoreHasMore,
                      loading: loadMoreLoading,
                      onLoadMore: () => {
                        setLoadMoreLoading(true);
                        setTimeout(() => {
                          setLoadMoreLoading(false);
                          setLoadMoreHasMore(false);
                        }, 2000);
                      },
                    }}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">List Layout</p>
                  <DiscoverFeedSection
                    items={sampleFeedItems.slice(0, 2)}
                    layout="list"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Empty State</p>
                  <DiscoverFeedSection
                    items={[]}
                    emptyMessage="아직 표시할 콘텐츠가 없습니다."
                  />
                </div>
              </div>
            </ComponentShowcase>

            {/* VisuallyHidden */}
            <ComponentShowcase
              title="VisuallyHidden"
              description="시각적으로 숨겨진 접근성 텍스트"
              usageContext="아이콘 버튼 대체 라벨, 스크린리더 지원"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-3">
                    이 컴포넌트는 스크린리더에는 읽히지만 시각적으로는 표시되지 않습니다.
                  </p>
                  <IconButton aria-label="Play video">
                    <VisuallyHidden>Play video</VisuallyHidden>
                    <Play className="h-5 w-5" />
                  </IconButton>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <code className="text-xs">
                    {`<IconButton>
  <VisuallyHidden>Play video</VisuallyHidden>
  <Play />
</IconButton>`}
                  </code>
                </div>
              </div>
            </ComponentShowcase>

            <div className="mt-12 p-6 bg-white border border-slate-200 rounded-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Layout 가이드</h2>
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  • VisuallyHidden은 시각적으로는 숨기되 스크린리더에는 노출하여 접근성을 향상시킵니다.
                </p>
                <p>
                  • 레이아웃 구성은 Tailwind CSS의 유틸리티 클래스(flex, grid 등)를 직접 사용하세요.
                </p>
                <p>
                  • 추가 레이아웃 컴포넌트가 필요한 경우 구현 후 이 섹션에 추가될 예정입니다.
                </p>
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
