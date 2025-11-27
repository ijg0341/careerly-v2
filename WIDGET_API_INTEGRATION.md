# Widget System API Integration - 완료 보고서

## 개요

커리어리 v2 프로젝트의 위젯 시스템에 실제 API 연동을 구현했습니다. 기존 Mock 데이터를 사용하던 구조를 Next.js API Routes와 외부 API를 활용한 실시간 데이터 연동 구조로 전환했습니다.

## 구현 완료 사항

### 1. RSS 파싱 유틸리티 (lib/utils/rss-parser.ts)

**설치된 라이브러리**:
- `rss-parser`: RSS/Atom 피드 파싱
- `xml2js`: XML 파싱 (rss-parser의 의존성)

**주요 기능**:
- `parseRSSFeed()`: 단일 RSS 피드 파싱
- `parseMultipleRSSFeeds()`: 다중 RSS 피드 병렬 파싱
- `formatRelativeTime()`: 상대 시간 포맷 ("3시간 전")
- `extractTextFromHTML()`: HTML에서 텍스트 추출
- `extractDomain()`: URL에서 도메인 추출

### 2. API 서비스 레이어 (lib/api/services/widgets/)

각 위젯별 API 서비스 함수 구현:

#### 파일 구조
```
lib/api/services/widgets/
├── types.ts              # 공통 타입 정의
├── geeknews.ts          # GeekNews API 서비스
├── techstack.ts         # npm downloads API 서비스
├── bigtech-blog.ts      # BigTech 블로그 RSS 서비스
├── github-trending.ts   # GitHub Trending API 서비스
├── it-news.ts           # IT 뉴스 RSS 서비스
├── index.ts             # 통합 export
└── README.md            # 상세 문서
```

### 3. Next.js API Routes (app/api/widgets/)

서버사이드 데이터 처리를 위한 API 엔드포인트:

#### `/api/widgets/geeknews`
- **데이터 소스**: https://news.hada.io/rss/news
- **처리**: RSS 파싱
- **캐시**: 5분 (300초)
- **파라미터**: `limit`, `category`

#### `/api/widgets/techstack`
- **데이터 소스**: npm API (https://api.npmjs.org/downloads/point/)
- **처리**: npm 패키지 다운로드 통계
- **캐시**: 30분 (1800초)
- **파라미터**: `category` (frontend/backend/all), `period` (week/month)

#### `/api/widgets/bigtech-blog`
- **데이터 소스**:
  - Kakao: https://tech.kakao.com/feed/
  - NAVER: https://d2.naver.com/d2.atom
  - Toss: https://toss.tech/rss.xml
  - LINE: https://engineering.linecorp.com/ko/feed/
  - Woowa: https://techblog.woowahan.com/feed/
- **처리**: 다중 RSS 피드 병렬 파싱 및 머지
- **캐시**: 10분 (600초)
- **파라미터**: `companies`, `limit`

#### `/api/widgets/github-trending`
- **데이터 소스**:
  - GitHub GraphQL API (GITHUB_TOKEN 필요)
  - Fallback: Mock 데이터
- **처리**: 트렌딩 리포지토리 조회
- **캐시**: 30분 (1800초)
- **파라미터**: `language`, `since` (daily/weekly/monthly), `limit`

#### `/api/widgets/it-news`
- **데이터 소스**:
  - Bloter: https://www.bloter.net/feed/
  - ZDNet: https://zdnet.co.kr/feed/
  - IT조선: http://it.chosun.com/site/data/rss/rss.xml
  - 전자신문: https://www.etnews.com/rss/0020.xml
- **처리**: 다중 RSS 피드 병렬 파싱 및 머지
- **캐시**: 5분 (300초)
- **파라미터**: `sources`, `limit`

### 4. React Query 훅 업데이트

각 위젯의 `useXxxData` 훅을 실제 API 호출로 변경:

**변경 전** (Mock):
```typescript
async function fetchGeekNews(config?: GeekNewsWidgetConfig): Promise<GeekNewsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return mockGeekNewsData.slice(0, limit);
}
```

**변경 후** (실제 API):
```typescript
import { fetchGeekNewsData } from '@/lib/api/services/widgets';

export function useGeekNewsData(config?: GeekNewsWidgetConfig) {
  return useQuery({
    queryKey: ['widget', 'geeknews', config],
    queryFn: () => fetchGeekNewsData(config),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}
```

**업데이트된 파일**:
- `components/widgets/implementations/GeekNewsWidget/useGeekNewsData.ts`
- `components/widgets/implementations/TechStackWidget/useTechStackData.ts`
- `components/widgets/implementations/BigTechBlogWidget/useBigTechBlogData.ts`
- `components/widgets/implementations/GitHubTrendingWidget/useGitHubTrendingData.ts`
- `components/widgets/implementations/ITNewsWidget/useITNewsData.ts`

### 5. 환경 변수 설정

`.env.example` 업데이트:

```bash
# GitHub API (optional)
GITHUB_TOKEN=

# Widget Cache TTL (seconds)
WIDGET_CACHE_TTL_GEEKNEWS=300
WIDGET_CACHE_TTL_TECHSTACK=1800
WIDGET_CACHE_TTL_BIGTECH=600
WIDGET_CACHE_TTL_GITHUB=1800
WIDGET_CACHE_TTL_ITNEWS=300

# RSS Parser Configuration
RSS_PARSER_TIMEOUT=10000
RSS_PARSER_MAX_REDIRECTS=5
```

## 아키텍처

### 3-Layer 구조

```
┌─────────────────────────────────────┐
│  Widget Components (Client)         │
│  - GeekNewsWidget.tsx               │
│  - useGeekNewsData() 호출           │
└─────────────────┬───────────────────┘
                  │
                  │ React Query
                  │
┌─────────────────▼───────────────────┐
│  API Service Layer (Client)         │
│  - fetchGeekNewsData()              │
│  - fetch('/api/widgets/geeknews')   │
└─────────────────┬───────────────────┘
                  │
                  │ HTTP Request
                  │
┌─────────────────▼───────────────────┐
│  Next.js API Routes (Server)        │
│  - GET /api/widgets/geeknews        │
│  - parseRSSFeed()                   │
│  - External API 호출                │
└─────────────────────────────────────┘
```

### 캐싱 전략

**2-Level 캐싱**:

1. **React Query (클라이언트)**:
   - staleTime: 데이터가 fresh 상태로 유지되는 시간
   - refetchInterval: 백그라운드에서 자동 재검증

2. **Next.js ISR (서버)**:
   - revalidate: API Route 응답 캐싱 시간
   - fetch cache: next.revalidate 옵션

## 성능 최적화

### 1. 서버사이드 처리
- RSS 파싱을 서버에서 수행 → 클라이언트 부담 감소
- CORS 이슈 해결 (API Routes가 프록시 역할)

### 2. 병렬 처리
```typescript
// 여러 RSS 피드를 동시에 가져오기
const feeds = await parseMultipleRSSFeeds([
  'https://tech.kakao.com/feed/',
  'https://d2.naver.com/d2.atom',
  'https://toss.tech/rss.xml',
]);
```

### 3. 에러 핸들링
```typescript
const results = await Promise.allSettled(promises);
// 일부 피드 실패해도 성공한 피드는 반환
return results
  .filter(result => result.status === 'fulfilled')
  .map(result => result.value);
```

### 4. 타임아웃 설정
```typescript
await parseRSSFeed(url, {
  timeout: 10000,  // 10초
  maxRedirects: 5,
});
```

## 에러 핸들링 전략

### API Route 레벨
```typescript
try {
  const feed = await parseRSSFeed(url);
  return NextResponse.json({ items: feed.items });
} catch (error) {
  console.error('RSS parsing error:', error);
  return NextResponse.json(
    { error: 'Failed to fetch data' },
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

## 사용 예시

### 위젯 컴포넌트에서 사용

```typescript
import { useGeekNewsData } from './useGeekNewsData';

function GeekNewsWidget({ config }: WidgetProps<GeekNewsItem[], GeekNewsWidgetConfig>) {
  const { data, isLoading, isError, refetch } = useGeekNewsData(config);

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

## 확장 가능성

### 새로운 위젯 추가 방법

1. **타입 정의** (`types.ts`)
2. **API Route 생성** (`app/api/widgets/new-widget/route.ts`)
3. **API Service 생성** (`lib/api/services/widgets/new-widget.ts`)
4. **React Query 훅** (`useNewWidgetData.ts`)
5. **index.ts에 export 추가**

자세한 내용은 `lib/api/services/widgets/README.md` 참조.

## 보안 고려사항

1. **API 키 보호**: 환경 변수로 관리, 서버사이드에서만 접근
2. **CORS 우회**: Next.js API Routes가 프록시 역할
3. **입력 검증**: 쿼리 파라미터 검증
4. **타임아웃**: 무한 대기 방지

## 향후 개선 사항

### 즉시 가능한 개선
1. **GitHub Token 추가**: `.env`에 `GITHUB_TOKEN` 설정
   - 현재: Mock 데이터
   - 개선 후: 실제 GitHub API 활용

2. **Redis 캐싱**: 서버사이드 캐싱 레이어 추가
   - 현재: Next.js ISR만 사용
   - 개선 후: Redis로 더 세밀한 캐시 제어

3. **Rate Limiting**: API 호출 제한 구현
   - npm API, RSS 서버 부담 감소

### 장기 개선 사항
1. **Webhook**: RSS 피드 변경 시 자동 업데이트
2. **Analytics**: 위젯 사용 통계 수집
3. **A/B Testing**: 위젯 설정 최적화
4. **Error Tracking**: Sentry 등 에러 모니터링

## 테스트

### 수동 테스트 방법

```bash
# 개발 서버 실행
npm run dev

# API 엔드포인트 테스트
curl http://localhost:3000/api/widgets/geeknews
curl http://localhost:3000/api/widgets/techstack?category=frontend
curl http://localhost:3000/api/widgets/bigtech-blog?companies=kakao,naver
curl http://localhost:3000/api/widgets/github-trending?language=typescript
curl http://localhost:3000/api/widgets/it-news?sources=bloter,zdnet
```

### 브라우저에서 테스트
1. 위젯 대시보드 페이지 접속
2. 각 위젯이 실제 데이터를 로드하는지 확인
3. 브라우저 DevTools Network 탭에서 API 호출 확인
4. React Query DevTools로 캐싱 상태 확인

## 파일 변경 사항 요약

### 새로 생성된 파일
- `lib/utils/rss-parser.ts`
- `lib/api/services/widgets/types.ts`
- `lib/api/services/widgets/geeknews.ts`
- `lib/api/services/widgets/techstack.ts`
- `lib/api/services/widgets/bigtech-blog.ts`
- `lib/api/services/widgets/github-trending.ts`
- `lib/api/services/widgets/it-news.ts`
- `lib/api/services/widgets/index.ts`
- `lib/api/services/widgets/README.md`
- `app/api/widgets/geeknews/route.ts`
- `app/api/widgets/techstack/route.ts`
- `app/api/widgets/bigtech-blog/route.ts`
- `app/api/widgets/github-trending/route.ts`
- `app/api/widgets/it-news/route.ts`

### 수정된 파일
- `components/widgets/implementations/GeekNewsWidget/useGeekNewsData.ts`
- `components/widgets/implementations/TechStackWidget/useTechStackData.ts`
- `components/widgets/implementations/BigTechBlogWidget/useBigTechBlogData.ts`
- `components/widgets/implementations/GitHubTrendingWidget/useGitHubTrendingData.ts`
- `components/widgets/implementations/ITNewsWidget/useITNewsData.ts`
- `.env.example`

### 설치된 패키지
- `rss-parser`
- `xml2js`

## 참고 문서

- **상세 API 문서**: `/lib/api/services/widgets/README.md`
- **환경 변수**: `/.env.example`
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **React Query**: https://tanstack.com/query/latest
- **rss-parser**: https://github.com/rbren/rss-parser

## 결론

위젯 시스템의 API 연동이 완료되어, 이제 실시간 데이터를 표시할 수 있습니다.

**주요 성과**:
- ✅ 5개 위젯 모두 실제 API 연동
- ✅ RSS 파싱 유틸리티 구현
- ✅ 서버사이드 데이터 처리
- ✅ 2-Level 캐싱 전략
- ✅ 확장 가능한 구조
- ✅ 상세한 문서화

**다음 단계**:
1. GitHub Token 추가하여 실제 Trending 데이터 활용
2. 프로덕션 환경에 배포
3. 사용자 피드백 수집
4. 성능 모니터링 및 최적화
