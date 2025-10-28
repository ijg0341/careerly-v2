# Careerly v2 - AI 커리어 검색 플랫폼

Perplexity 스타일의 AI 기반 커리어 검색 및 정보 제공 플랫폼입니다.

## 🚀 주요 기능

- **AI 검색**: 자연어 기반 커리어 정보 검색
- **SSE 스트리밍**: 실시간 답변 생성 및 표시
- **인용 출처**: 신뢰할 수 있는 정보 출처 제공
- **검색 히스토리**: 과거 검색 기록 관리
- **북마크**: 유용한 정보 저장 및 재방문
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원

## 🛠 기술 스택

### Core
- **Next.js 14** (App Router)
- **TypeScript** 5.6+
- **React 18**

### Styling
- **Tailwind CSS v4** (@tailwindcss/postcss)
- **Design Tokens** (CSS Variables)
- **Framer Motion** (Animations)

### State Management
- **Zustand** (Global State)
- **React Query** (Server State)

### UI Components
- **shadcn/ui** (준비 완료)
- **Lucide React** (Icons)

### Forms & Validation
- **React Hook Form**
- **Zod**

### Content Rendering
- **React Markdown** (Markdown 렌더링)
- **Remark GFM** (GitHub Flavored Markdown)
- **Rehype Raw** (Raw HTML 지원)
- **Shiki** (코드 하이라이팅)

## 📁 프로젝트 구조

```
careerly-v2/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈페이지 (검색 인풋)
│   ├── globals.css             # 디자인 토큰 & 스타일
│   ├── search/
│   │   └── page.tsx            # 검색 결과 페이지
│   ├── history/
│   │   └── page.tsx            # 검색 히스토리
│   ├── bookmarks/
│   │   └── page.tsx            # 북마크
│   ├── profile/
│   │   └── page.tsx            # 프로필
│   └── api/
│       └── mock-stream/
│           └── route.ts        # SSE Mock API
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 헤더 (로고, 검색, 네비)
│   │   ├── Footer.tsx          # 푸터
│   │   └── Main.tsx            # 메인 래퍼
│   ├── common/
│   │   ├── Markdown.tsx        # 마크다운 렌더러
│   │   └── CitationList.tsx    # 출처 리스트
│   ├── providers/
│   │   └── ReactQueryProvider.tsx
│   └── types/
│       └── index.ts            # 디자인 시스템 타입
├── hooks/
│   ├── useSSE.ts               # SSE 스트리밍 훅
│   └── useStore.ts             # Zustand 스토어
├── lib/
│   ├── api/
│   │   └── search.ts           # 검색 API
│   ├── mock/
│   │   └── search.mock.json    # 목업 데이터
│   └── utils/
│       └── cn.ts               # 클래스 유틸리티
├── postcss.config.mjs          # PostCSS 설정
├── tailwind.config.ts          # Tailwind 설정
├── tsconfig.json               # TypeScript 설정
├── next.config.mjs             # Next.js 설정
└── package.json
```

## 🎨 디자인 시스템

### 컬러 팔레트

#### Primary Colors
- **Teal** (Primary): `#14b8a6` (teal-500)
- **Purple** (Accent): `#9333ea` (purple-600)

#### Semantic Colors
- **Success**: Green (`#16a34a`)
- **Warning**: Yellow (`#ca8a04`)
- **Error**: Red (`#dc2626`)
- **Info**: Blue (`#2563eb`)

#### Neutral Colors
- **Slate**: 50~900 (텍스트, 배경, 테두리)

### 타이포그래피
- **Font Family**: Pretendard Variable (한글), Geist (영문)
- **Font Scale**: text-xs ~ text-4xl

### Shadows
```css
--shadow-sm:  0px 2px 4px rgba(100, 116, 139, 0.1)
--shadow-md:  0px 4px 6px rgba(100, 116, 139, 0.12)
--shadow-lg:  0px 8px 12px rgba(100, 116, 139, 0.14)
--shadow-xl:  0px 16px 20px rgba(100, 116, 139, 0.16)
--shadow-2xl: 0px 25px 50px rgba(100, 116, 139, 0.24)
```

### Component Classes
- `.tw-profile-image`: 프로필 이미지
- `.tw-tag-sm`: 작은 태그
- `.markdown-content`: 마크다운 컨텐츠

### Animations
- `animate-fade-in-up`: 페이드인 + 슬라이드업
- `animate-slide-up`: 바텀시트 슬라이드업
- `animation-delay-{200,400,600}`: 순차 애니메이션

## 🚦 실행 방법

### 개발 서버 실행
```bash
pnpm install
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드
```bash
pnpm build
pnpm start
```

### 린트
```bash
pnpm lint
```

## 💡 주요 기능 사용법

### 1. 검색
홈페이지에서 검색어를 입력하면 AI가 답변을 생성합니다.

```typescript
// 검색 API 사용 예시
import { searchCareer } from '@/lib/api/search';

const result = await searchCareer('프론트엔드 개발자가 되려면?');
```

### 2. SSE 스트리밍
실시간 스트리밍 응답을 받을 수 있습니다.

```typescript
// SSE 훅 사용 예시
import { useSSE } from '@/hooks/useSSE';

const { messages, isConnected } = useSSE({
  url: '/api/mock-stream',
  enabled: true,
  onMessage: (msg) => console.log(msg),
});
```

### 3. 상태 관리
Zustand로 전역 상태를 관리합니다.

```typescript
// 스토어 사용 예시
import { useStore } from '@/hooks/useStore';

const { recentQueries, addRecentQuery } = useStore();
addRecentQuery('검색어');
```

## 🎯 라우트 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 (검색 인풋, 트렌드 키워드) |
| `/search?q=query` | 검색 결과 (AI 답변 + 출처) |
| `/history` | 검색 히스토리 |
| `/bookmarks` | 북마크한 검색 결과 |
| `/profile` | 사용자 프로필 |
| `/api/mock-stream` | SSE Mock 엔드포인트 |

## 🔧 환경 변수

현재는 목업 데이터를 사용하므로 환경 변수가 필요하지 않습니다.
향후 실제 API 연동 시 `.env.local` 파일을 생성하세요:

```env
NEXT_PUBLIC_API_URL=https://api.careerly.com
NEXT_PUBLIC_API_KEY=your-api-key
```

## 📝 코드 스니펫

### 마크다운 렌더링
```tsx
import { Markdown } from '@/components/common/Markdown';

<Markdown content="# 제목\n\n본문 내용..." />
```

### 인용 리스트
```tsx
import { CitationList } from '@/components/common/CitationList';

<CitationList citations={[
  { id: '1', title: '제목', url: 'https://...', snippet: '요약' }
]} />
```

### 커스텀 버튼
```tsx
<button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
  클릭
</button>
```

## 🎨 디자인 가이드라인

### 간격 (Spacing)
- 8px 단위 사용: `gap-2`, `gap-4`, `gap-6`, `p-2`, `p-4`, `p-6`

### 라운딩 (Border Radius)
- `rounded`: 4px
- `rounded-lg`: 8px
- `rounded-xl`: 12px

### 트랜지션
- 기본: `transition-colors duration-200`
- 복합: `transition-all`

### 접근성
- 포커스 링 자동 적용
- aria-label 제공
- 키보드 탐색 지원

## 🔜 향후 계획

- [ ] 실제 AI API 연동
- [ ] 사용자 인증 시스템
- [ ] 북마크 기능 구현
- [ ] 검색 필터 추가
- [ ] 다크 모드 지원
- [ ] PWA 전환
- [ ] SEO 최적화

## 📄 라이선스

MIT License

---

**작성일**: 2025-10-28
**버전**: v0.1.0
**Tailwind CSS**: v4.1.16
**Next.js**: v14.2.33
