# Widget API Services

위젯 시스템을 위한 API 서비스 레이어입니다. Next.js API Routes를 통해 서버사이드에서 데이터를 가져오고, React Query를 통해 클라이언트에서 캐싱 및 관리합니다.

## 디렉토리 구조

```
lib/api/services/widgets/
├── types.ts              # 공통 타입 정의
├── geeknews.ts          # GeekNews API 서비스
├── techstack.ts         # TechStack (npm) API 서비스
├── bigtech-blog.ts      # BigTech Blog API 서비스
├── github-trending.ts   # GitHub Trending API 서비스
├── it-news.ts           # IT News API 서비스
└── index.ts             # 통합 export

lib/utils/
└── rss-parser.ts        # RSS 파싱 유틸리티

app/api/widgets/
├── geeknews/route.ts    # GeekNews API Route
├── techstack/route.ts   # TechStack API Route
├── bigtech-blog/route.ts
├── github-trending/route.ts
└── it-news/route.ts

components/widgets/implementations/
├── GeekNewsWidget/
│   ├── useGeekNewsData.ts    # React Query 훅
│   └── ...
└── ...
```

## 아키텍처

### 3-Layer 구조

```
┌─────────────────────────────────────┐
│  Widget Components (Client)         │
│  - useGeekNewsData()                │
│  - useTechStackData()               │
└─────────────────┬───────────────────┘
                  │ React Query
┌─────────────────▼───────────────────┐
│  API Service Layer (Client)         │
│  - fetchGeekNewsData()              │
│  - fetchTechStackData()             │
└─────────────────┬───────────────────┘
                  │ fetch()
┌─────────────────▼───────────────────┐
│  Next.js API Routes (Server)        │
│  - /api/widgets/geeknews            │
│  - /api/widgets/techstack           │
│  - RSS Parsing, External API Calls  │
└─────────────────────────────────────┘
```

### 데이터 흐름

1. **위젯 컴포넌트**: `useGeekNewsData()` 호출
2. **React Query**: 캐시 확인 및 `fetchGeekNewsData()` 실행
3. **API Service**: `/api/widgets/geeknews` 엔드포인트 호출
4. **API Route**: RSS 파싱 또는 외부 API 호출
5. **응답**: 데이터 변환 및 반환
6. **React Query**: 캐싱 및 자동 재검증

## 사용법

### 1. 위젯 컴포넌트에서 사용

```typescript
import { useGeekNewsData } from './useGeekNewsData';

function GeekNewsWidget() {
  const { data, isLoading, isError, refetch } = useGeekNewsData({
    limit: 5,
    category: 'news',
  });

  if (isLoading) return <WidgetSkeleton />;
  if (isError) return <WidgetError onRetry={refetch} />;

  return (
    <div>
      {data?.map((item) => (
        <NewsItem key={item.id} {...item} />
      ))}
    </div>
  );
}
```

### 2. 직접 API 서비스 호출 (Server Component)

```typescript
import { fetchGeekNewsData } from '@/lib/api/services/widgets';

export default async function ServerPage() {
  const news = await fetchGeekNewsData({ limit: 10 });

  return (
    <div>
      {news.map((item) => (
        <NewsItem key={item.id} {...item} />
      ))}
    </div>
  );
}
```

## API 엔드포인트

### GeekNews

**URL**: `/api/widgets/geeknews`

**Parameters**:
- `limit` (number): 가져올 아이템 수 (기본: 5)
- `category` (string): 카테고리 필터 (기본: 'all')

**Data Source**: https://news.hada.io/rss/news

**Cache**: 5분 (300초)

---

### TechStack (npm Downloads)

**URL**: `/api/widgets/techstack`

**Parameters**:
- `category` (string): 'frontend' | 'backend' | 'all' (기본: 'frontend')
- `period` (string): 'week' | 'month' (기본: 'week')

**Data Source**: https://api.npmjs.org/downloads/point/

**Cache**: 30분 (1800초)

**Packages**:
- Frontend: react, vue, angular, svelte, next, solid-js
- Backend: express, fastify, nestjs, koa, hono

---

### BigTech Blog

**URL**: `/api/widgets/bigtech-blog`

**Parameters**:
- `companies` (string): 쉼표로 구분된 회사 목록 (기본: 'kakao,naver,toss,line,woowa')
- `limit` (number): 가져올 포스트 수 (기본: 10)

**Data Sources**:
- Kakao: https://tech.kakao.com/feed/
- NAVER: https://d2.naver.com/d2.atom
- Toss: https://toss.tech/rss.xml
- LINE: https://engineering.linecorp.com/ko/feed/
- Woowa: https://techblog.woowahan.com/feed/

**Cache**: 10분 (600초)

---

### GitHub Trending

**URL**: `/api/widgets/github-trending`

**Parameters**:
- `language` (string): 프로그래밍 언어 (기본: 'typescript')
- `since` (string): 'daily' | 'weekly' | 'monthly' (기본: 'daily')
- `limit` (number): 가져올 리포지토리 수 (기본: 10)

**Data Source**:
- GitHub GraphQL API (GITHUB_TOKEN 환경 변수 필요)
- Fallback: Mock 데이터

**Cache**: 30분 (1800초)

**환경 변수**:
```bash
GITHUB_TOKEN=your_github_token_here
```

---

### IT News

**URL**: `/api/widgets/it-news`

**Parameters**:
- `sources` (string): 쉼표로 구분된 소스 목록 (기본: 'bloter,zdnet,itchosun,etnews')
- `limit` (number): 가져올 뉴스 수 (기본: 10)

**Data Sources**:
- Bloter: https://www.bloter.net/feed/
- ZDNet Korea: https://zdnet.co.kr/feed/
- IT조선: http://it.chosun.com/site/data/rss/rss.xml
- 전자신문: https://www.etnews.com/rss/0020.xml

**Cache**: 5분 (300초)

## 캐싱 전략

### React Query 캐싱

```typescript
{
  staleTime: 5 * 60 * 1000,      // 5분간 fresh 상태 유지
  refetchInterval: 10 * 60 * 1000, // 10분마다 백그라운드 재검증
}
```

### Next.js ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 300; // 5분마다 재생성
```

### 환경 변수로 캐시 TTL 제어

```bash
# .env
WIDGET_CACHE_TTL_GEEKNEWS=300
WIDGET_CACHE_TTL_TECHSTACK=1800
```

## 에러 핸들링

### API Route 레벨

```typescript
try {
  const feed = await parseRSSFeed(url);
  return NextResponse.json({ items: feed.items });
} catch (error) {
  console.error('RSS parsing error:', error);
  return NextResponse.json(
    { error: 'Failed to fetch data', message: error.message },
    { status: 500 }
  );
}
```

### React Query 레벨

```typescript
const { data, isError, error, refetch } = useGeekNewsData();

if (isError) {
  return <WidgetError error={error} onRetry={refetch} />;
}
```

## 확장 가능성

### 새로운 위젯 추가하기

1. **타입 정의** (`components/widgets/implementations/NewWidget/types.ts`)

```typescript
export interface NewWidgetItem {
  id: string;
  title: string;
  // ... 기타 필드
}

export interface NewWidgetConfig {
  limit?: number;
  // ... 기타 설정
}
```

2. **API Route 생성** (`app/api/widgets/new-widget/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 데이터 가져오기 로직
  return NextResponse.json({ items });
}

export const revalidate = 300;
```

3. **API Service 생성** (`lib/api/services/widgets/new-widget.ts`)

```typescript
export async function fetchNewWidgetData(
  config?: NewWidgetConfig
): Promise<NewWidgetItem[]> {
  const response = await fetch('/api/widgets/new-widget');
  return response.json();
}
```

4. **React Query 훅 생성** (`useNewWidgetData.ts`)

```typescript
import { fetchNewWidgetData } from '@/lib/api/services/widgets';

export function useNewWidgetData(config?: NewWidgetConfig) {
  return useQuery({
    queryKey: ['widget', 'new-widget', config],
    queryFn: () => fetchNewWidgetData(config),
    staleTime: 5 * 60 * 1000,
  });
}
```

5. **index.ts에 export 추가**

```typescript
export { fetchNewWidgetData } from './new-widget';
```

## RSS 파싱 유틸리티

### 기본 사용법

```typescript
import { parseRSSFeed } from '@/lib/utils/rss-parser';

const feed = await parseRSSFeed('https://example.com/feed.xml');
console.log(feed.items);
```

### 다중 RSS 피드 파싱

```typescript
import { parseMultipleRSSFeeds } from '@/lib/utils/rss-parser';

const feeds = await parseMultipleRSSFeeds([
  'https://feed1.com/rss',
  'https://feed2.com/rss',
]);
```

### 유틸리티 함수

- `formatRelativeTime(date)`: "3시간 전" 형식으로 변환
- `extractTextFromHTML(html)`: HTML에서 텍스트 추출
- `extractDomain(url)`: URL에서 도메인 추출

## 성능 최적화

1. **Server-Side Rendering**: RSS 파싱은 서버에서 처리
2. **React Query 캐싱**: 불필요한 재요청 방지
3. **ISR**: 정적 페이지 생성 + 백그라운드 재생성
4. **병렬 처리**: 여러 RSS 피드를 동시에 가져오기
5. **타임아웃 설정**: 느린 RSS 피드 처리

## 보안 고려사항

1. **CORS**: Next.js API Routes가 프록시 역할
2. **Rate Limiting**: 외부 API 호출 제한 (추후 구현 권장)
3. **환경 변수**: API 키는 서버사이드에서만 접근
4. **입력 검증**: 쿼리 파라미터 검증

## 트러블슈팅

### RSS 파싱 실패

```bash
# 타임아웃 증가
RSS_PARSER_TIMEOUT=20000
```

### npm API 실패

- npm API는 무료이지만 rate limit 있음
- 에러 발생 시 캐시된 데이터 사용 권장

### GitHub API Rate Limit

```bash
# Personal Access Token 설정
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

Rate limit:
- 인증 없음: 60 requests/hour
- 인증 있음: 5000 requests/hour

## 향후 개선 사항

1. **Redis 캐싱**: 서버사이드 캐싱 레이어 추가
2. **Rate Limiting**: API 호출 제한 구현
3. **Webhook**: RSS 피드 변경 시 자동 업데이트
4. **Analytics**: 위젯 사용 통계 수집
5. **A/B Testing**: 위젯 설정 최적화

## 참고 자료

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [React Query](https://tanstack.com/query/latest)
- [rss-parser](https://github.com/rbren/rss-parser)
- [npm API](https://github.com/npm/registry/blob/master/docs/download-counts.md)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
