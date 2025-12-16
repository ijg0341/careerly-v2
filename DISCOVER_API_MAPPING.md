# Discover 페이지 API 매핑 문서

> **작성일:** 2024-12-16
> **API 서버:** http://recruits.somoon.ai:8000
> **인증:** Token 1bae88703703c96b74fb26da3b0a7c75d7ee9057

---

## 목차

1. [API 엔드포인트 개요](#1-api-엔드포인트-개요)
2. [화면별 API 매핑](#2-화면별-api-매핑)
   - [채용 탭 (Jobs)](#21-채용-탭-jobs)
   - [블로그 탭 (Blog)](#22-블로그-탭-blog)
   - [도서 탭 (Books)](#23-도서-탭-books)
   - [강의 탭 (Courses)](#24-강의-탭-courses)
   - [사이드바 소스 목록](#25-사이드바-소스-목록)
3. [데이터 가용성 요약](#3-데이터-가용성-요약)
4. [UI 조정 계획](#4-ui-조정-계획)
5. [API 호출 예시](#5-api-호출-예시)

---

## 1. API 엔드포인트 개요

| 엔드포인트 | 메서드 | 용도 | 상태 |
|-----------|--------|------|------|
| `/data/contents/main` | GET | 블로그/도서/강의 콘텐츠 조회 | ✅ 정상 |
| `/data/search/companies` | GET | 회사별 채용공고 검색 | ✅ 정상 |
| `/data/company/info` | GET | 회사 정보 조회 | ✅ 정상 |
| `/data/trend-report` | GET | 트렌드 리포트 조회 | ⚠️ 별도 생성 필요 |

### 인증 방식

모든 API 요청에 아래 헤더 필요:
```
Authorization: Token 1bae88703703c96b74fb26da3b0a7c75d7ee9057
```

---

## 2. 화면별 API 매핑

### 2.1 채용 탭 (Jobs)

#### API 정보
- **Endpoint:** `GET /data/search/companies`
- **Query Params:** `company_signs` (콤마 구분)
- **예시:** `/data/search/companies?company_signs=toss,kakao,naver`

#### API 응답 샘플
```json
{
  "toss": [
    {
      "id": 123,
      "title": "백엔드 개발자 (파이썬)",
      "url": "https://toss.im/career/...",
      "created_at": "2024-12-16",
      "updated_at": "2024-12-16",
      "company_title": "토스",
      "company_sign": "toss",
      "company_image": "https://...",
      "summary": null,
      "job_category": null
    }
  ]
}
```

#### UI 필드 매핑

| UI 요소 | API 필드 | 상태 | 비고 |
|---------|----------|------|------|
| 채용공고 제목 | `title` | ✅ 가능 | |
| 회사명 | `company_title` | ✅ 가능 | |
| 회사 로고 | `company_image` | ✅ 가능 | |
| 채용공고 URL | `url` | ✅ 가능 | 외부 링크 |
| 게시일 | `created_at` | ✅ 가능 | |
| 수정일 | `updated_at` | ✅ 가능 | |
| AI 카테고리 | `job_category` | ❌ null | UI에서 제거 |
| 요약 설명 | `summary` | ❌ null | UI에서 제거 |

#### 현재 UI vs API 차이점

**현재 UI (목업):**
- AI 카테고리별 섹션 분류 (AI & Dev, AI & Design, AI & Biz 등)
- 각 채용공고에 요약 설명 표시

**API 현실:**
- `job_category`, `summary` 모두 null
- 카테고리 분류 불가

---

### 2.2 블로그 탭 (Blog)

#### API 정보
- **Endpoint:** `GET /data/contents/main`
- **Query Params:** `content_type=blog`
- **예시:** `/data/contents/main?content_type=blog`

#### API 응답 샘플
```json
[
  {
    "id": 456,
    "title": "AI 프롬프트 엔지니어링 완벽 가이드",
    "summary": "이 글에서는 프롬프트 엔지니어링의 핵심 개념과...",
    "company_sign": "toss",
    "company_title": "토스",
    "company_image": "https://...",
    "created_at": "2024-12-15",
    "url": "https://toss.tech/article/..."
  }
]
```

#### UI 필드 매핑

| UI 요소 | API 필드 | 상태 | 비고 |
|---------|----------|------|------|
| 블로그 제목 | `title` | ✅ 가능 | |
| 요약/설명 | `summary` | ✅ 가능 | |
| 회사명 | `company_title` | ✅ 가능 | |
| 회사 로고 | `company_image` | ✅ 가능 | |
| 게시일 | `created_at` | ✅ 가능 | |
| 블로그 URL | `url` | ✅ 가능 | 외부 링크 |
| AI 카테고리 배지 | - | ❌ 없음 | UI에서 제거 |
| 대표 이미지 (OG) | - | ❌ 없음 | UI에서 제거 |

#### 현재 UI vs API 차이점

**현재 UI (목업):**
- AI 카테고리 필터 (AI & Dev, AI & Design 등)
- 각 블로그에 AI 카테고리 배지 표시
- 대표 이미지 (메타 이미지) 표시

**API 현실:**
- AI 카테고리 정보 없음
- 대표 이미지 없음 (OG 이미지 크롤링 필요)

---

### 2.3 도서 탭 (Books)

#### API 정보
- **Endpoint:** `GET /data/contents/main`
- **Query Params:** `content_type=book`
- **예시:** `/data/contents/main?content_type=book`

#### API 응답 샘플
```json
[
  {
    "id": 789,
    "title": "실전! AI 프로젝트",
    "summary": "AI 프로젝트를 처음부터 끝까지...",
    "company_sign": "yes24",
    "company_title": "예스24",
    "company_image": "https://...",
    "created_at": "2024-12-10",
    "url": "https://yes24.com/product/..."
  }
]
```

#### UI 필드 매핑

| UI 요소 | API 필드 | 상태 | 비고 |
|---------|----------|------|------|
| 도서 제목 | `title` | ✅ 가능 | |
| 요약/설명 | `summary` | ✅ 가능 | |
| 출판사/판매처 | `company_title` | ✅ 가능 | |
| 게시일 | `created_at` | ✅ 가능 | |
| 도서 URL | `url` | ✅ 가능 | 외부 링크 |
| 표지 이미지 | - | ❌ 없음 | |
| 저자 | - | ❌ 없음 | |
| 가격 | - | ❌ 없음 | |
| 평점/별점 | - | ❌ 없음 | |

#### 현재 UI vs API 차이점

**현재 UI (목업):**
- 도서 표지 이미지 크게 표시
- 저자명, 가격, 평점 정보

**API 현실:**
- 기본 정보(제목, 요약, URL)만 제공
- 표지, 저자, 가격, 평점 없음

---

### 2.4 강의 탭 (Courses)

#### API 정보
- **Endpoint:** `GET /data/contents/main`
- **Query Params:** `content_type=lecture`
- **예시:** `/data/contents/main?content_type=lecture`

#### API 응답 샘플
```json
[
  {
    "id": 101,
    "title": "Claude AI 마스터 클래스",
    "summary": "Claude AI를 활용한 업무 자동화...",
    "company_sign": "udemy",
    "company_title": "Udemy",
    "company_image": "https://...",
    "created_at": "2024-12-12",
    "url": "https://udemy.com/course/..."
  }
]
```

#### UI 필드 매핑

| UI 요소 | API 필드 | 상태 | 비고 |
|---------|----------|------|------|
| 강의 제목 | `title` | ✅ 가능 | |
| 요약/설명 | `summary` | ✅ 가능 | |
| 플랫폼명 | `company_title` | ✅ 가능 | |
| 플랫폼 로고 | `company_image` | ✅ 가능 | |
| 게시일 | `created_at` | ✅ 가능 | |
| 강의 URL | `url` | ✅ 가능 | 외부 링크 |
| 썸네일 이미지 | - | ❌ 없음 | |
| 강사명 | - | ❌ 없음 | |
| 가격 | - | ❌ 없음 | |
| 평점/별점 | - | ❌ 없음 | |
| 수강생 수 | - | ❌ 없음 | |

#### 현재 UI vs API 차이점

**현재 UI (목업):**
- 강의 썸네일 이미지
- 강사명, 가격, 평점, 수강생 수

**API 현실:**
- 기본 정보(제목, 요약, URL)만 제공
- 썸네일, 강사, 가격, 평점 없음

---

### 2.5 사이드바 소스 목록

#### API 정보
- **Endpoint:** `GET /data/company/info`
- **Query Params:** `signs` (콤마 구분)
- **예시:** `/data/company/info?signs=toss,kakao,naver`

#### API 응답 샘플
```json
[
  {
    "sign": "toss",
    "name": "토스",
    "thumbnail_image": "https://...",
    "company_type": "tech",
    "interest_by_admin": true
  }
]
```

#### UI 필드 매핑

| UI 요소 | API 필드 | 상태 | 비고 |
|---------|----------|------|------|
| 회사명 | `name` | ✅ 가능 | |
| 회사 로고 | `thumbnail_image` | ✅ 가능 | |
| 회사 식별자 | `sign` | ✅ 가능 | API 호출용 |
| 회사 유형 | `company_type` | ✅ 가능 | 필터링용 |
| 업데이트 라벨 | - | ❌ 없음 | 프론트 계산 필요 |
| 신규 콘텐츠 수 | - | ❌ 없음 | 프론트 계산 필요 |

---

## 3. 데이터 가용성 요약

### ✅ API에서 제공하는 데이터

| 데이터 | 채용 | 블로그 | 도서 | 강의 | 회사정보 |
|--------|------|--------|------|------|----------|
| 제목 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 요약 | ❌ | ✅ | ✅ | ✅ | - |
| URL | ✅ | ✅ | ✅ | ✅ | - |
| 날짜 | ✅ | ✅ | ✅ | ✅ | - |
| 회사명 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 회사 로고 | ✅ | ✅ | ✅ | ✅ | ✅ |

### ❌ API에서 제공하지 않는 데이터

| 데이터 | 영향받는 탭 | 대안 |
|--------|-------------|------|
| AI 카테고리 | 채용, 블로그 | 제거 또는 키워드 기반 분류 |
| 이미지 (표지/썸네일/OG) | 블로그, 도서, 강의 | 기본 이미지 또는 제거 |
| 저자/강사명 | 도서, 강의 | 제거 |
| 가격 | 도서, 강의 | 제거 |
| 평점/별점 | 도서, 강의 | 제거 |
| 수강생 수 | 강의 | 제거 |

---

## 4. UI 조정 계획

> **방침:** 백엔드 수정 없이 API에서 제공하는 데이터에 맞춰 UI를 조정

### 4.1 채용 탭

| 항목 | 변경 전 (목업) | 변경 후 |
|------|----------------|---------|
| 레이아웃 | AI 카테고리별 3개 섹션 | 회사별 또는 날짜별 단일 리스트 |
| 요약 설명 | 각 공고에 표시 | **제거** |
| AI 카테고리 배지 | 표시 | **제거** |
| 회사 로고 | 표시 | 유지 |
| 채용공고 제목 | 표시 | 유지 |
| 외부 링크 | 표시 | 유지 |

### 4.2 블로그 탭

| 항목 | 변경 전 (목업) | 변경 후 |
|------|----------------|---------|
| 카테고리 필터 | AI 카테고리 5개 필터 버튼 | **제거** 또는 회사별 필터로 대체 |
| AI 카테고리 배지 | 각 블로그에 표시 | **제거** |
| 대표 이미지 | OG 이미지 표시 | **제거** (회사 로고로 대체) |
| 제목/요약 | 표시 | 유지 |
| 회사 정보 | 표시 | 유지 |
| 날짜 | 표시 | 유지 |

### 4.3 도서 탭

| 항목 | 변경 전 (목업) | 변경 후 |
|------|----------------|---------|
| 레이아웃 | 카드 (표지 이미지 강조) | 리스트 형태로 단순화 |
| 표지 이미지 | 크게 표시 | **제거** (플랫폼 로고로 대체) |
| 저자 | 표시 | **제거** |
| 가격 | 표시 | **제거** |
| 평점/별점 | 표시 | **제거** |
| 제목/요약 | 표시 | 유지 |
| 출판사/판매처 | 표시 | 유지 |

### 4.4 강의 탭

| 항목 | 변경 전 (목업) | 변경 후 |
|------|----------------|---------|
| 레이아웃 | 카드 (썸네일 강조) | 리스트 형태로 단순화 |
| 썸네일 이미지 | 크게 표시 | **제거** (플랫폼 로고로 대체) |
| 강사명 | 표시 | **제거** |
| 가격 | 표시 | **제거** |
| 평점/별점 | 표시 | **제거** |
| 수강생 수 | 표시 | **제거** |
| 제목/요약 | 표시 | 유지 |
| 플랫폼 정보 | 표시 | 유지 |

### 4.5 사이드바 소스 목록

| 항목 | 변경 전 (목업) | 변경 후 |
|------|----------------|---------|
| 회사명 | 표시 | 유지 |
| 회사 로고 | 표시 | 유지 |
| 업데이트 라벨 | "오늘 업데이트" 등 | **제거** 또는 프론트 계산 |
| 신규 콘텐츠 수 | "+3" 등 | **제거** 또는 프론트 계산 |

### 4.6 공통 유지 사항

- ✅ 날짜별/주간별 그룹화 (API `created_at` 활용)
- ✅ 외부 링크 연결 (API `url` 활용)
- ✅ 회사/플랫폼 로고 표시 (API `company_image` 활용)

---

## 5. API 호출 예시

### curl 예시

```bash
# 블로그 목록 조회
curl -H "Authorization: Token 1bae88703703c96b74fb26da3b0a7c75d7ee9057" \
  "http://recruits.somoon.ai:8000/data/contents/main?content_type=blog"

# 채용공고 검색
curl -H "Authorization: Token 1bae88703703c96b74fb26da3b0a7c75d7ee9057" \
  "http://recruits.somoon.ai:8000/data/search/companies?company_signs=toss,kakao"

# 회사 정보 조회
curl -H "Authorization: Token 1bae88703703c96b74fb26da3b0a7c75d7ee9057" \
  "http://recruits.somoon.ai:8000/data/company/info?signs=toss,kakao,naver"
```

### TypeScript 서비스 함수

```typescript
// lib/api/services/somoon-recruits.service.ts 참조

import { recruitsService } from '@/lib/api';

// 블로그 조회
const blogs = await recruitsService.getRecruitsContents('blog');

// 채용공고 조회
const jobs = await recruitsService.searchCompaniesJobs(['toss', 'kakao']);

// 회사 정보 조회
const companies = await recruitsService.getCompanyInfo(['toss', 'kakao']);
```

### React Query 훅

```typescript
// lib/api/hooks/queries/useSomoonRecruits.ts 참조

import { useRecruitsContents, useCompaniesJobs } from '@/lib/api';

// 블로그 훅
const { data: blogs, isLoading } = useRecruitsContents('blog');

// 채용공고 훅
const { data: jobs } = useCompaniesJobs(['toss', 'kakao']);
```
