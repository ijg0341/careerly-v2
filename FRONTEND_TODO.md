# Careerly V2 프론트엔드 TODO 리스트

> 오픈 스펙 준비를 위한 미비사항 체크리스트
> 작성일: 2025-12-02

---

## 🔴 CRITICAL (런칭 전 필수)

### 0. 인증 시스템 - SNS 로그인 및 비밀번호 관련
- [ ] Apple 로그인 API 라우트 구현 (`/api/auth/oauth/apple/login`)
- [ ] Apple 콜백 API 라우트 구현 (`/api/auth/oauth/apple/callback`)
- [ ] Kakao 로그인 API 라우트 구현 (`/api/auth/oauth/kakao/login`)
- [ ] Kakao 콜백 API 라우트 구현 (`/api/auth/oauth/kakao/callback`)
- [ ] OAuth 콜백 페이지 완성 (`app/auth/callback/page.tsx`)
- [ ] 비밀번호 찾기/재설정 API 구현
- [ ] 비밀번호 찾기 UI 구현

**현재 상태:**
- UI 버튼은 있지만 API 라우트 없음 (`/app/api/auth/oauth/` 폴더 자체가 없음)
- `auth.service.ts:168` TODO 주석: "Next.js API Route로 마이그레이션 필요"
- `auth.service.ts:151-163` 비밀번호 재설정: `console.warn` 만 실행

**필요 작업 (백엔드):**
- Django에서 Apple/Kakao OAuth 엔드포인트 구현 필요
- 또는 Next.js API Route에서 직접 OAuth 처리

---

### 1. 프로필 페이지 - 경력/학력 추가 기능
- [ ] 경력 추가 폼 구현
- [ ] 경력 수정 폼 구현
- [ ] 학력 추가 폼 구현
- [ ] 학력 수정 폼 구현

**파일:** `app/profile/page.tsx` (Line 432-504)
**현재 상태:** "곧 제공될 예정입니다" placeholder 메시지만 표시

---

### 2. 커뮤니티 페이지 - 상호작용 기능 구현
- [ ] 댓글 달기 (Reply) 기능
- [ ] 리포스트 (Repost) 기능
- [ ] 공유하기 (Share) 기능
- [ ] 더보기 메뉴 (More) 기능
- [ ] Q&A 좋아요/싫어요 연동
- [ ] 팔로우/언팔로우 연동
- [ ] 답변 제출 기능
- [ ] 답변 채택 기능

**파일:** `app/community/page.tsx` (Line 1022-1195)
**현재 상태:** 모든 핸들러가 `console.log()` 만 실행

---

### 3. 커뮤니티 페이지 - Mock 데이터 제거/교체
- [ ] `mockFeedDataBackup` 제거 → 실제 API 사용 (Line 24-361)
- [ ] `mockQnaDataBackup` 제거 → 실제 API 사용 (Line 363-424)
- [ ] `mockPromotionData` 제거 또는 CMS 연동 (Line 427-467)
- [ ] `mockRecommendedPosts` 제거 → 실제 API 사용 (Line 470-521)
- [ ] `mockRecommendedFollowers` 제거 → 실제 API 사용 (Line 524-565)
- [ ] `mockTodayJobs` 제거 → 실제 API 사용 (Line 567-619)
- [ ] `mockJobMarketTrends` 제거 → 실제 API 사용 (Line 621-658)

**파일:** `app/community/page.tsx`
**현재 상태:** ~600줄의 하드코딩된 Mock 데이터

---

## 🟠 HIGH (런칭 전 수정 권장)

### 4. 검색 페이지 - 스레드 액션 구현
- [ ] 쿼리 수정 (Edit) 기능
- [ ] 공유하기 (Share) 기능
- [ ] 내보내기 (Export) 기능

**파일:** `app/search/page.tsx` (Line 357-377)
**현재 상태:** `console.log()` placeholder

---

### 5. 검색 페이지 - 관련 검색어 동적화
- [ ] `MOCK_RELATED_QUERIES` 제거
- [ ] 실제 API 또는 AI 기반 관련 검색어 연동

**파일:** `app/search/page.tsx` (Line 225-241)
**현재 상태:** 3개의 하드코딩된 관련 검색어

---

### 6. Discover Mock 데이터 정리
- [ ] `mockDiscoverResponse` 정리 (채용 4, 블로그 3, 책 4, 코스 3)
- [ ] `mockTrendingCompanies` 정리 (Apple, Google, Microsoft, Tesla)
- [ ] `mockJobMarketTrends` 정리
- [ ] `mockWeatherForecast` 정리
- [ ] `mockTodayJobs` 정리
- [ ] 가짜 통계 생성 로직 제거 (`views: 100 + (index * 123)`)

**파일:** `lib/data/discover-mock.ts` (938줄)
**옵션:**
- 완전 삭제 후 실제 API만 사용
- 또는 `/lib/data/__tests__/` 로 이동하여 테스트용으로 보관

---

## 🟡 MEDIUM (선택적 수정)

### 7. Mock 스트리밍 API 정리
- [ ] 프로덕션 빌드에서 제외 또는 개발 환경에서만 사용하도록 설정

**파일:** `app/api/mock-stream/route.ts` (73줄)
**용도:** 개발/테스트용 SSE 엔드포인트

---

### 8. 팔로잉 상태 API 연동
- [ ] 팔로잉 상태 확인 API 구현 및 연동

**파일:** `app/community/page.tsx` (Line 900)
**현재 상태:** `// TODO: 팔로잉 상태 확인 API 필요` 주석

---

## 🟢 LOW (나중에 해도 됨)

### 9. 글쓰기 - 임시저장 기능
- [ ] 임시저장 버튼 클릭 핸들러 구현
- [ ] localStorage 또는 API 기반 임시저장

**파일:** `app/community/new/post/page.tsx` (Line 156)

---

### 10. 프로필 Empty State 개선
- [ ] 게시글 없을 때 CTA 버튼 추가 (글쓰기 유도)
- [ ] 질문 없을 때 CTA 버튼 추가 (질문하기 유도)

**파일:** `app/profile/page.tsx` (Line 546-562)

---

## 📊 요약 통계

| 심각도 | 항목 수 | 세부 태스크 |
|--------|---------|-------------|
| 🔴 CRITICAL | 4개 | 27개 |
| 🟠 HIGH | 3개 | 11개 |
| 🟡 MEDIUM | 2개 | 2개 |
| 🟢 LOW | 2개 | 4개 |
| **총계** | **11개** | **44개** |

---

## 🎯 권장 작업 순서

### Phase 0: 인증 (최우선)
0. **SNS 로그인 구현** (Apple, Kakao)
   - 백엔드 OAuth 엔드포인트 or Next.js API Route
1. **비밀번호 찾기/재설정** 기능

### Phase 1: 핵심 기능 (1주차)
2. 커뮤니티 좋아요/댓글 API 연동
3. 프로필 경력/학력 추가 폼 구현
4. 커뮤니티 Mock 데이터 → API 교체

### Phase 2: 보조 기능 (2주차)
5. 검색 페이지 공유/내보내기
6. Discover Mock 데이터 정리
7. 팔로우/언팔로우 연동

### Phase 3: 완성도 (3주차)
8. 임시저장 기능
9. Empty State CTA
10. 코드 정리 및 테스트

---

## 📁 관련 파일 목록

```
app/
├── auth/
│   └── callback/page.tsx     # OAuth 콜백 (미완성)
├── api/auth/
│   ├── login/route.ts        # ✅ 구현됨
│   ├── logout/route.ts       # ✅ 구현됨
│   ├── register/route.ts     # ✅ 구현됨
│   ├── me/route.ts           # ✅ 구현됨
│   ├── refresh/route.ts      # ✅ 구현됨
│   └── oauth/                # ❌ 폴더 없음 (구현 필요)
│       ├── apple/login/      # ❌ 없음
│       ├── apple/callback/   # ❌ 없음
│       ├── kakao/login/      # ❌ 없음
│       └── kakao/callback/   # ❌ 없음
├── community/
│   ├── page.tsx              # Mock 데이터 + 미구현 핸들러
│   └── new/post/page.tsx     # 임시저장 미구현
├── profile/
│   └── page.tsx              # 경력/학력 추가 미구현
├── search/
│   └── page.tsx              # 스레드 액션 + Mock 쿼리
├── discover/
│   └── page.tsx              # (API 연동 완료)
└── api/
    └── mock-stream/route.ts  # 테스트용 Mock API

components/auth/
├── login-modal.tsx           # SNS 버튼 있음 (API 연동 필요)
└── signup-modal.tsx          # SNS 버튼 있음 (API 연동 필요)

lib/
├── api/services/
│   └── auth.service.ts       # OAuth/비밀번호 재설정 TODO 있음
└── data/
    └── discover-mock.ts      # 938줄 Mock 데이터
```

---

> 마지막 업데이트: 2025-12-02
