# 로컬 프로토타이핑 환경 안내

> **중요**: 이 프로젝트는 원본 careerly-v2를 기반으로 한 로컬 프로토타이핑 전용 작업 공간입니다.

## 📌 프로젝트 목적

- **원본**: https://github.com/ijg0341/careerly-v2
- **용도**: 새로운 기획 및 프로토타이핑 작업
- **환경**: 로컬 개발 환경 전용
- **단계**: 실험/기획 단계

## 🚨 중요 제약사항

### ❌ 절대 하지 말아야 할 것

1. **Git Push 금지**
   - 이 프로젝트는 로컬에서만 작업합니다
   - 원격 저장소에 푸시하지 않습니다
   - 실험적인 코드이므로 공유하지 않습니다

2. **백엔드 서버 불필요**
   - 외부 백엔드 API 연결 불필요
   - Mock 데이터/더미 데이터로 작업
   - 로컬 프론트엔드만 실행

### ✅ 작업 방식

1. **로컬 개발 서버만 사용**
   ```bash
   npm run dev
   # 서버 주소: http://localhost:3000 (또는 3001, 3002, 3003...)
   ```

2. **Mock 데이터 활용**
   - API 호출이 필요한 경우 Mock 데이터 사용
   - `lib/mock/` 디렉토리 활용
   - 또는 Next.js API Routes로 더미 응답 생성

3. **프로토타이핑 우선**
   - UI/UX 실험
   - 새로운 기능 기획
   - 사용자 플로우 테스트

## 🛠 개발 환경

### 현재 설정

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://staging-gateway.careerly.co.kr
NEXT_PUBLIC_AGENT_API_URL=https://seulchan--careerly-agent-poc-fastapi-app.modal.run
```

**주의**: 위 백엔드 API는 사용하지 않습니다. Mock 데이터로 대체합니다.

### 로컬 서버 실행

```bash
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 접속
# http://localhost:3000 (포트는 자동으로 변경될 수 있음)
```

## 📝 Mock 데이터 사용 방법

### 1. 기존 Mock 파일 활용
```typescript
// Discover 페이지 Mock 데이터
import {
  mockDiscoverResponse,
  transformJobsToContentCards,
  mockJobMarketTrends
} from '@/lib/data/discover-mock';

// Community 페이지 Mock 데이터
import {
  mockPostsData,
  mockQuestionsData,
  mockRecommendedPosts,
  mockRecommendedFollowers,
  mockPromotionData
} from '@/lib/data/community-mock';

// Search Mock 데이터
import mockData from '@/lib/mock/search.mock.json';
```

### 2. Next.js API Routes 활용
```typescript
// app/api/mock-stream/route.ts 참고
// 필요한 Mock API를 app/api/ 디렉토리에 추가
```

### 3. 컴포넌트에서 더미 데이터 직접 사용
```typescript
// 하드코딩된 더미 데이터로 UI 테스트
const dummyData = {
  title: "테스트 제목",
  content: "테스트 내용",
  // ...
};
```

## 📋 완료된 Mock 데이터 변환 작업

### ✅ Discover 페이지 (`app/discover/page.tsx`)
- **이전**: `useDiscoverFeeds`, `useRecommendedFeeds`, `useLikeFeed`, `useBookmarkFeed` 등 API 훅 사용
- **현재**: `lib/data/discover-mock.ts`의 Mock 데이터 사용
- **기능**: 로컬 state로 좋아요/북마크 관리, 페이지네이션 제거

### ✅ Community 페이지 (`app/community/page.tsx`)
- **이전**: `usePosts`, `useQuestions` API 훅 사용
- **현재**: `lib/data/community-mock.ts`의 Mock 데이터 사용
- **Mock 데이터 파일**: `lib/data/community-mock.ts`
  - `mockPostsData`: 커뮤니티 게시글 (8개)
  - `mockQuestionsData`: Q&A 질문 (5개)
  - `mockRecommendedPosts`: 추천 게시글 (5개)
  - `mockRecommendedFollowers`: 추천 팔로우 (5개)
  - `mockPromotionData`: 홍보 카드 (3개)

## 🎯 작업 플로우

1. **기획 단계**
   - 새로운 기능 아이디어 구상
   - UI/UX 스케치 및 디자인

2. **프로토타이핑**
   - 컴포넌트 작성
   - Mock 데이터로 기능 테스트
   - 사용자 플로우 검증

3. **로컬 테스트**
   - 개발 서버에서 확인
   - 다양한 시나리오 테스트
   - UI/UX 개선

4. **문서화** (선택사항)
   - 기획 내용 정리
   - 스크린샷 저장
   - 아이디어 노트 작성

## ⚠️ 주의사항

- **데이터 손실 주의**: 로컬 전용이므로 중요한 내용은 별도로 백업하세요
- **Git 관리**: 로컬 커밋은 자유롭게 하되, 원격 푸시는 하지 마세요
- **실험적 코드**: 프로덕션 수준의 코드 품질을 요구하지 않습니다
- **빠른 반복**: 빠르게 테스트하고 수정하는 것이 목표입니다

## 📚 참고 문서

- **CLAUDE.md**: API 클라이언트 사용 가이드 (참고용)
- **README.md**: 원본 프로젝트 문서
- **SETUP_SUMMARY.md**: 초기 설정 요약

---

**작성일**: 2025-11-15
**환경**: 로컬 프로토타이핑 전용
**목적**: 새로운 기획 실험 및 테스트
