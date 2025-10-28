'use client';

import { Markdown } from '@/components/common/Markdown';
import { CitationList } from '@/components/common/CitationList';
import {
  Search,
  BookmarkIcon,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';

export default function DesignGuidePage() {
  const sampleCitations = [
    {
      id: '1',
      title: '프론트엔드 개발자 로드맵 2024',
      url: 'https://example.com/frontend-roadmap',
      snippet: 'HTML, CSS, JavaScript 기초부터 React, TypeScript까지...',
    },
    {
      id: '2',
      title: '주니어 개발자 포트폴리오 작성 가이드',
      url: 'https://example.com/portfolio-guide',
      snippet: '채용 담당자가 주목하는 포트폴리오 작성법...',
    },
  ];

  const sampleMarkdown = `# 마크다운 렌더링 테스트

## 제목 레벨 2
### 제목 레벨 3
#### 제목 레벨 4

일반 **강조** 텍스트와 *이탤릭* 텍스트입니다.

### 리스트
- 항목 1
- 항목 2
- 항목 3

1. 번호 항목 1
2. 번호 항목 2
3. 번호 항목 3

### 인용문
> 이것은 인용문입니다. Teal 테두리로 강조됩니다.

### 코드
인라인 코드는 \`const example = 'code'\` 이렇게 표시됩니다.

코드 블록:
\`\`\`javascript
function example() {
  console.log('Hello, Careerly!');
  return true;
}
\`\`\`

### 링크
[링크 텍스트](https://example.com)는 보라색으로 표시됩니다.

---

구분선도 테스트합니다.`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Careerly Design System Guide
          </h1>
          <p className="text-slate-600 mt-2">
            DESIGN_TOKENS.md 기반 디자인 시스템 리뷰
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            1. 컬러 팔레트
          </h2>

          {/* Slate - Neutral */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Slate (중립 그레이)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (weight) => (
                  <div key={weight} className="space-y-2">
                    <div
                      className={`w-full h-20 rounded-lg bg-slate-${weight} border border-slate-200`}
                    />
                    <p className="text-sm font-medium text-slate-700">
                      slate-{weight}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Teal - Primary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Teal (Primary Color)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (weight) => (
                  <div key={weight} className="space-y-2">
                    <div
                      className={`w-full h-20 rounded-lg bg-teal-${weight} border border-slate-200`}
                    />
                    <p className="text-sm font-medium text-slate-700">
                      teal-{weight}
                    </p>
                    {weight === 500 && (
                      <span className="text-xs text-teal-600 font-semibold">
                        Primary
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Purple - Accent */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Purple (Accent Color)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (weight) => (
                  <div key={weight} className="space-y-2">
                    <div
                      className={`w-full h-20 rounded-lg bg-purple-${weight} border border-slate-200`}
                    />
                    <p className="text-sm font-medium text-slate-700">
                      purple-{weight}
                    </p>
                    {weight === 600 && (
                      <span className="text-xs text-purple-600 font-semibold">
                        Accent
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Semantic Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-20 rounded-lg bg-red-500 flex items-center justify-center text-white font-semibold">
                  Error
                </div>
                <p className="text-sm font-medium text-slate-700">red-500</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-20 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-semibold">
                  Warning
                </div>
                <p className="text-sm font-medium text-slate-700">yellow-500</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-20 rounded-lg bg-green-500 flex items-center justify-center text-white font-semibold">
                  Success
                </div>
                <p className="text-sm font-medium text-slate-700">green-500</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-20 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                  Info
                </div>
                <p className="text-sm font-medium text-slate-700">blue-500</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            2. 타이포그래피
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">text-xs (12px)</p>
              <p className="text-xs text-slate-700">
                캡션이나 레이블에 사용되는 가장 작은 텍스트
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-sm (14px)</p>
              <p className="text-sm text-slate-700">작은 본문 텍스트</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-base (16px)</p>
              <p className="text-base text-slate-700">기본 본문 텍스트</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-lg (18px)</p>
              <p className="text-lg text-slate-700">큰 본문 텍스트</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-xl (20px)</p>
              <p className="text-xl text-slate-700">부제목</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-2xl (24px)</p>
              <p className="text-2xl text-slate-900 font-bold">제목</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-3xl (30px)</p>
              <p className="text-3xl text-slate-900 font-bold">큰 제목</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">text-4xl (36px)</p>
              <p className="text-4xl text-slate-900 font-bold">메인 제목</p>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            3. 그림자 (Shadows)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="font-semibold text-slate-900 mb-2">shadow-sm</p>
              <p className="text-sm text-slate-600">
                미세한 그림자 (카드 hover)
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="font-semibold text-slate-900 mb-2">shadow-md</p>
              <p className="text-sm text-slate-600">기본 그림자 (카드)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="font-semibold text-slate-900 mb-2">shadow-lg</p>
              <p className="text-sm text-slate-600">강한 그림자 (모달)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <p className="font-semibold text-slate-900 mb-2">shadow-xl</p>
              <p className="text-sm text-slate-600">매우 강한 그림자 (팝업)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-2xl">
              <p className="font-semibold text-slate-900 mb-2">shadow-2xl</p>
              <p className="text-sm text-slate-600">극대 그림자 (드롭다운)</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            4. 버튼 스타일
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-2">Primary Button</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                  Primary
                </button>
                <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-lg">
                  Large Primary
                </button>
                <button className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm">
                  Small Primary
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-2">Secondary Button</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Secondary
                </button>
                <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  Outline Secondary
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-2">Semantic Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  Danger
                </button>
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                  Warning
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  Success
                </button>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Info
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-2">Neutral Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  Neutral
                </button>
                <button className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors">
                  Outline
                </button>
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  Ghost
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600 mb-2">Icon Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="p-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
                  <BookmarkIcon className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Component Classes */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            5. 컴포넌트 클래스
          </h2>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              태그 (.tw-tag-sm)
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex flex-wrap gap-2">
                <span className="tw-tag-sm">기본 태그</span>
                <span className="tw-tag-sm hover:bg-teal-100 hover:text-teal-700 transition-colors">
                  호버 가능 태그
                </span>
                <span className="inline-block px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded font-medium">
                  Teal 태그
                </span>
                <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded font-medium">
                  Purple 태그
                </span>
                <span className="inline-block px-2 py-1 text-xs bg-coral-100 text-coral-600 rounded font-medium">
                  Coral 태그
                </span>
              </div>
            </div>
          </div>

          {/* Profile Images */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              프로필 이미지 (.tw-profile-image)
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="tw-profile-image w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
                  <span className="text-white text-xs font-semibold">S</span>
                </div>
                <div className="tw-profile-image w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
                  <span className="text-white text-sm font-semibold">M</span>
                </div>
                <div className="tw-profile-image w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
                  <span className="text-white font-semibold">L</span>
                </div>
                <div className="tw-profile-image w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
                  <span className="text-white text-lg font-semibold">XL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            6. 카드 스타일
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                기본 카드
              </h3>
              <p className="text-slate-600">
                border + rounded-xl 스타일의 기본 카드
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                그림자 카드
              </h3>
              <p className="text-slate-600">shadow-md가 추가된 카드</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                호버 카드
              </h3>
              <p className="text-slate-600">
                호버 시 테두리 색상과 그림자가 변경됩니다
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                배경색 카드
              </h3>
              <p className="text-slate-600">bg-slate-50 배경의 카드</p>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            7. 알림 & 상태
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-none mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">에러</p>
                <p className="text-sm text-red-700">
                  에러 메시지가 여기 표시됩니다.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-none mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">경고</p>
                <p className="text-sm text-yellow-700">
                  경고 메시지가 여기 표시됩니다.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-none mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">성공</p>
                <p className="text-sm text-green-700">
                  성공 메시지가 여기 표시됩니다.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-none mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">정보</p>
                <p className="text-sm text-blue-700">
                  정보 메시지가 여기 표시됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            8. 애니메이션
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Fade In Up
              </h3>
              <div className="animate-fade-in-up bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-teal-900">
                  페이드인 + 슬라이드업 애니메이션 (0.6s)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                순차 애니메이션
              </h3>
              <div className="space-y-3">
                <div className="animate-fade-in-up bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-900">첫 번째 (delay: 0s)</p>
                </div>
                <div className="animate-fade-in-up animation-delay-200 bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-900">두 번째 (delay: 0.2s)</p>
                </div>
                <div className="animate-fade-in-up animation-delay-400 bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-900">세 번째 (delay: 0.4s)</p>
                </div>
                <div className="animate-fade-in-up animation-delay-600 bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-900">네 번째 (delay: 0.6s)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            9. 폼 요소
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                텍스트 인풋
              </label>
              <input
                type="text"
                placeholder="입력하세요..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                검색 인풋
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                텍스트 영역
              </label>
              <textarea
                placeholder="내용을 입력하세요..."
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="checkbox1"
                className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="checkbox1" className="text-sm text-slate-700">
                체크박스
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="radio1"
                name="radio"
                className="w-4 h-4 text-teal-500 border-slate-300 focus:ring-teal-500"
              />
              <label htmlFor="radio1" className="text-sm text-slate-700">
                라디오 버튼
              </label>
            </div>
          </div>
        </section>

        {/* Markdown Content */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            10. 마크다운 컨텐츠 (.markdown-content)
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <Markdown content={sampleMarkdown} />
          </div>
        </section>

        {/* Citation List */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            11. 인용 리스트 컴포넌트
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <CitationList citations={sampleCitations} />
          </div>
        </section>

        {/* Spacing & Layout */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            12. 간격 & 레이아웃
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                간격 (8px 단위)
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-8 bg-teal-100 rounded" />
                  <span className="text-sm text-slate-600">gap-2 (8px)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-8 bg-teal-100 rounded" />
                  <span className="text-sm text-slate-600">gap-4 (16px)</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-8 bg-teal-100 rounded" />
                  <span className="text-sm text-slate-600">gap-6 (24px)</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="w-20 h-8 bg-teal-100 rounded" />
                  <span className="text-sm text-slate-600">gap-8 (32px)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                라운딩
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 bg-purple-100 rounded" />
                  <p className="text-sm text-slate-600">rounded (4px)</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-purple-100 rounded-lg" />
                  <p className="text-sm text-slate-600">rounded-lg (8px)</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-purple-100 rounded-xl" />
                  <p className="text-sm text-slate-600">rounded-xl (12px)</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-purple-100 rounded-full" />
                  <p className="text-sm text-slate-600">rounded-full</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Utilities */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            13. 유틸리티 클래스
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Scrollbar Hide
              </h3>
              <div className="h-32 overflow-auto scrollbar-hide border border-slate-200 rounded-lg p-4 bg-slate-50">
                <p className="text-slate-700">
                  이 영역은 스크롤이 가능하지만 스크롤바가 숨겨져 있습니다.
                  <br />
                  <br />
                  내용이 더 있습니다...
                  <br />
                  <br />
                  내용이 더 있습니다...
                  <br />
                  <br />
                  내용이 더 있습니다...
                  <br />
                  <br />
                  내용이 더 있습니다...
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Gradient Backgrounds
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-20 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">
                    Teal to Purple
                  </span>
                </div>
                <div className="h-20 bg-gradient-to-br from-teal-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">
                    Diagonal Gradient
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            14. 링크 스타일
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <a
              href="#"
              className="text-purple-600 hover:text-purple-800 underline transition-colors"
            >
              기본 링크 (보라색, 밑줄)
            </a>
            <br />
            <a
              href="#"
              className="text-teal-600 hover:text-teal-800 transition-colors"
            >
              Teal 링크 (밑줄 없음)
            </a>
            <br />
            <a
              href="#"
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              중립 링크
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-slate-600">
            이 페이지는{' '}
            <code className="px-2 py-1 bg-slate-100 text-teal-600 rounded text-sm">
              docs/DESIGN_TOKENS.md
            </code>{' '}
            의 디자인 토큰을 기반으로 생성되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
