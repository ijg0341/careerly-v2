# AI 트렌드 위젯

AI 생태계의 최신 트렌드를 한눈에 볼 수 있는 통합 위젯입니다.

## 개요

여러 AI 관련 소스를 통합하여 보여주는 위젯으로, 다음과 같은 데이터를 제공합니다:

1. **Hugging Face 트렌딩 모델** - 최신 인기 AI 모델
2. **GitHub 트렌딩** - AI 관련 오픈소스 프로젝트
3. **AI 뉴스** - GeekNews에서 AI 태그가 달린 최신 기사

## 기능

- **탭 기반 UI**: 세 가지 소스를 탭으로 구분하여 표시
- **실시간 통계**: 다운로드, 스타, 포인트 등 주요 지표 표시
- **태그 시스템**: 각 항목의 카테고리/기술 태그 표시
- **자동 갱신**: 15분마다 자동으로 데이터 갱신
- **외부 링크**: 각 항목 클릭 시 원본 페이지로 이동

## 구성 옵션

```typescript
interface AITrendWidgetConfig {
  sources?: AITrendSource[];        // 표시할 소스 (기본: 모두)
  limit?: number;                   // 소스별 표시 개수 (기본: 5)
  period?: AITrendPeriod;           // 기간 (기본: 'daily')
  githubLanguage?: string;          // GitHub 언어 필터 (기본: 'python')
  showTabs?: boolean;               // 탭 표시 여부 (기본: true)
}

type AITrendSource = 'huggingface' | 'github' | 'news';
type AITrendPeriod = 'daily' | 'weekly' | 'monthly';
```

## 사용 예시

### 기본 사용

```tsx
<AITrendWidget
  config={{
    id: 'ai-trend-1',
    type: 'ai-trend',
    title: 'AI 트렌드',
    size: 'large',
    order: 0,
    enabled: true,
    config: {
      sources: ['huggingface', 'github', 'news'],
      limit: 5,
      period: 'daily',
      showTabs: true,
    },
  }}
  onRemove={(id) => console.log('Remove', id)}
/>
```

### Hugging Face 모델만 표시

```tsx
config: {
  sources: ['huggingface'],
  limit: 10,
  showTabs: false,
}
```

### GitHub 트렌딩 (TypeScript)

```tsx
config: {
  sources: ['github'],
  limit: 8,
  githubLanguage: 'typescript',
  period: 'weekly',
}
```

## 데이터 구조

### Hugging Face 모델

```typescript
interface HuggingFaceModel {
  id: string;                // 모델 ID (예: "meta-llama/Llama-3.3-70B-Instruct")
  name: string;              // 모델 이름
  author: string;            // 작성자
  downloads: number;         // 다운로드 수
  likes: number;             // 좋아요 수
  tags: string[];            // 태그 (예: ['text-generation', 'llm'])
  description?: string;      // 설명
  url: string;               // Hugging Face 페이지 URL
  lastModified: string;      // 마지막 수정 시간
}
```

### GitHub 저장소

```typescript
interface AIGitHubRepo {
  id: string;                // 저장소 ID
  name: string;              // 저장소 이름
  owner: string;             // 소유자
  description: string;       // 설명
  stars: number;             // 전체 스타 수
  language: string;          // 주 언어
  url: string;               // GitHub 페이지 URL
  todayStars: number;        // 오늘 받은 스타 수
}
```

### AI 뉴스

```typescript
interface AINewsItem {
  id: string;                // 뉴스 ID
  title: string;             // 제목
  url: string;               // 원본 URL
  points: number;            // 포인트
  comments: number;          // 댓글 수
  postedAt: string;          // 게시 시간
  tags: string[];            // 태그
}
```

## API 엔드포인트

```
GET /api/widgets/ai-trend?limit=5&period=daily&sources=huggingface,github,news&githubLanguage=python
```

### 쿼리 파라미터

- `limit`: 소스별 표시 개수 (기본: 5)
- `period`: 기간 - daily, weekly, monthly (기본: daily)
- `sources`: 쉼표로 구분된 소스 목록 (기본: 모두)
- `githubLanguage`: GitHub 언어 필터 (기본: python)

### 응답 예시

```json
{
  "huggingface": [
    {
      "id": "meta-llama/Llama-3.3-70B-Instruct",
      "name": "Llama-3.3-70B-Instruct",
      "author": "meta-llama",
      "downloads": 1250000,
      "likes": 4823,
      "tags": ["text-generation", "llm", "instruct"],
      "description": "Meta's latest Llama 3.3 70B instruction-tuned model",
      "url": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
      "lastModified": "2025-01-25T10:30:00Z"
    }
  ],
  "github": [...],
  "news": [...],
  "lastUpdated": "2025-01-27T12:00:00Z"
}
```

## 현재 구현 상태

### ✅ 완료

- 기본 UI 구조 및 탭 시스템
- Mock 데이터 제공
- React Query 통합
- 자동 갱신 및 캐싱
- 반응형 레이아웃
- 다크 모드 지원

### 🚧 진행 중 (Mock 데이터 사용)

- Hugging Face API 통합 (`https://huggingface.co/api/trending`)
- GitHub 트렌딩 스크래핑
- GeekNews RSS 파싱 및 AI 태그 필터링

### 📋 향후 계획

1. **실제 API 통합**
   - Hugging Face Trending API
   - GitHub Trending 스크래퍼 (puppeteer/cheerio)
   - GeekNews RSS 파서 (xml2js)

2. **기능 추가**
   - 북마크/즐겨찾기 기능
   - 항목별 상세 정보 모달
   - 검색 및 필터링
   - 개인화된 추천

3. **성능 최적화**
   - SSR 캐싱 전략
   - Incremental Static Regeneration
   - 이미지 최적화

## 파일 구조

```
components/widgets/implementations/AITrendWidget/
├── types.ts                 # TypeScript 타입 정의
├── useAITrendData.ts        # React Query 훅
├── AITrendWidget.tsx        # 위젯 컴포넌트
└── README.md                # 문서 (현재 파일)

lib/api/services/widgets/
└── ai-trend.ts              # API 클라이언트 서비스

app/api/widgets/ai-trend/
└── route.ts                 # Next.js API Route
```

## 개발 가이드

### 새로운 데이터 소스 추가

1. `types.ts`에 타입 정의 추가
2. `route.ts`에 데이터 fetching 함수 추가
3. `AITrendWidget.tsx`에 UI 렌더링 로직 추가
4. 탭 배열에 새 탭 추가

### API Route 수정

`app/api/widgets/ai-trend/route.ts`에서 각 `fetchXxx` 함수를 수정하여 실제 API를 호출하도록 변경할 수 있습니다.

```typescript
async function fetchHuggingFaceTrending(limit: number): Promise<HuggingFaceModel[]> {
  const response = await fetch('https://huggingface.co/api/trending');
  const data = await response.json();
  // 데이터 변환 로직
  return data.slice(0, limit);
}
```

## 관련 문서

- [위젯 시스템 개요](../../README.md)
- [GeekNews 위젯](../GeekNewsWidget/README.md)
- [GitHub 트렌딩 위젯](../GitHubTrendingWidget/README.md)
- [Hugging Face API](https://huggingface.co/docs/hub/api)
