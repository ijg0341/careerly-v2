# Discover 페이지 API 요청서

> 작성일: 2024-12-09
> 요청자: Careerly Frontend
> 대상: Somoon Backend

---

## 페이지 개요

Discover 페이지는 4개 탭(채용공고, 블로그, 도서, 강의)으로 구성되어 있으며, AI가 콘텐츠를 자동 분류하여 보여줍니다.

---

## 1. 채용공고 탭

### 1-1. 날짜별 채용공고 목록

**화면 설명**
- 상단에 최근 7일 날짜 탭 (오늘, 어제, 12/7, 12/6...)
- 선택한 날짜의 채용공고를 AI 카테고리별로 그룹화하여 표시
  - AI 직무: 제목에 AI/ML 명시된 포지션
  - AI 활용: 자격요건에 AI 도구 활용이 있는 포지션
  - 일반: AI 무관 포지션

**필요 API**
```
GET /api/v1/jobs/daily/?date=2024-12-09
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `date` | string | 조회할 날짜 (YYYY-MM-DD) |
| `page` | int | 페이지 번호 |
| `page_size` | int | 페이지당 항목 수 |

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": 123,
      "title": "AI Engineer",
      "url": "https://...",
      "company": "토스",
      "company_info": {
        "name": "토스",
        "logo_url": "https://..."
      },
      "analysis": {
        "ai_category": "ai-core",  // ⭐ 신규 필요: ai-core | ai-enabled | traditional
        "ai_score": 95,            // ⭐ 신규 필요: AI 관련도 점수
        "요약": "..."
      },
      "created_at": "2024-12-09T00:00:00Z"
    }
  ]
}
```

---

### 1-2. 일일 요약 카드

**화면 설명**
- 해당 날짜의 채용 현황 요약
- "오늘 32개 기업에서 45개 채용공고가 등록되었습니다"
- AI 브리핑 텍스트 (예: "AI 직무 채용이 전일 대비 20% 증가")

**필요 API** (신규)
```
GET /api/v1/stats/daily/?date=2024-12-09
```

**응답에 필요한 필드**
```json
{
  "date": "2024-12-09",
  "jobs": {
    "total": 45,
    "by_ai_category": {
      "ai-core": 12,
      "ai-enabled": 18,
      "traditional": 15
    },
    "company_count": 32
  },
  "ai_briefing": "오늘 AI 직무 채용이 전일 대비 20% 증가했습니다."
}
```

---

### 1-3. 주간 트렌드 차트

**화면 설명**
- 일일 요약 카드 내 미니 차트
- 최근 7일간 일별 채용공고 수 추이

**필요 API** (신규 또는 1-2와 통합)
```
GET /api/v1/stats/weekly/
```

**응답에 필요한 필드**
```json
{
  "daily_jobs": [
    { "date": "2024-12-03", "count": 38 },
    { "date": "2024-12-04", "count": 42 },
    { "date": "2024-12-05", "count": 35 },
    { "date": "2024-12-06", "count": 48 },
    { "date": "2024-12-07", "count": 41 },
    { "date": "2024-12-08", "count": 39 },
    { "date": "2024-12-09", "count": 45 }
  ]
}
```

---

## 2. 블로그 탭

### 2-1. AI 카테고리별 블로그 목록

**화면 설명**
- 상단에 AI 카테고리 필터 버튼 5개
  - AI & Dev: AI/ML 개발 기술
  - AI & Design: AI 활용 디자인 (Midjourney 등)
  - AI & Biz: AI 비즈니스/전략
  - AI 일반: 기타 AI 관련
  - 기타: AI 무관
- 선택한 카테고리의 블로그를 날짜별로 그룹화하여 표시

**필요 API**
```
GET /api/v1/contents/daily/?content_type=blog&ai_category=ai-dev
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `content_type` | string | ⭐ 신규 필요: `blog` 고정 |
| `ai_category` | string | ⭐ 신규 필요: `ai-dev`, `ai-design`, `ai-biz`, `ai-general`, `other` |
| `page` | int | 페이지 번호 |
| `page_size` | int | 페이지당 항목 수 |

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": 456,
      "title": "LangChain으로 RAG 구현하기",
      "url": "https://...",
      "content_type": "blog",
      "company": "카카오",
      "company_info": {
        "name": "카카오",
        "logo_url": "https://..."
      },
      "additional_info": {
        "image_url": "https://...",      // 블로그 썸네일
        "published_date": "2024-12-09"
      },
      "analysis": {
        "ai_category": "ai-dev",  // ⭐ 신규 필요
        "ai_score": 88,           // ⭐ 신규 필요
        "요약": "LangChain을 활용한 RAG 시스템 구현 가이드..."
      },
      "created_at": "2024-12-09T00:00:00Z"
    }
  ]
}
```

---

### 2-2. 블로그 탭 요약 카드

**화면 설명**
- "최근 1주일간 23개 블로그에서 156개 글이 발행되었습니다"

**필요 API** (1-2와 동일 API, 블로그 정보 포함)
```
GET /api/v1/stats/daily/?date=2024-12-09
```

**응답에 추가 필요한 필드**
```json
{
  "blogs": {
    "total": 28,
    "by_ai_category": {
      "ai-dev": 10,
      "ai-design": 4,
      "ai-biz": 6,
      "ai-general": 5,
      "other": 3
    },
    "source_count": 23
  }
}
```

---

## 3. 도서 탭

### 3-1. AI 카테고리별 도서 목록

**화면 설명**
- 상단에 카테고리 필터 (전체, AI&Dev, AI&Design, AI&Biz, AI일반, 기타)
- 도서 카드 형태로 표시 (표지 이미지, 제목, 저자, 출판사)

**필요 API**
```
GET /api/v1/contents/daily/?content_type=book&ai_category=ai-dev
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `content_type` | string | ⭐ 신규 필요: `book` 고정 |
| `ai_category` | string | ⭐ 신규 필요: 카테고리 (선택, 미지정시 전체) |

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": 789,
      "title": "프롬프트 엔지니어링의 정석",
      "url": "https://...",
      "content_type": "book",
      "additional_info": {
        "image_url": "https://...",      // 책 표지
        "author": "저자명",
        "publisher": "출판사",
        "published_date": "2024-11-15",
        "price": 28000
      },
      "analysis": {
        "ai_category": "ai-dev",
        "ai_score": 92,
        "요약": "..."
      }
    }
  ]
}
```

---

## 4. 강의 탭

### 4-1. AI 카테고리별 강의 목록

**화면 설명**
- 상단에 카테고리 필터 (전체, AI&Dev, AI&Design, AI&Biz, AI일반, 기타)
- 강의 카드 형태로 표시 (썸네일, 제목, 플랫폼)

**필요 API**
```
GET /api/v1/contents/daily/?content_type=lecture&ai_category=ai-dev
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `content_type` | string | ⭐ 신규 필요: `lecture` 고정 |
| `ai_category` | string | ⭐ 신규 필요: 카테고리 (선택) |

**응답 형식**: 도서와 동일 구조

---

## 5. 사이드바 - 수집 출처 (탭별로 다름)

> 사이드바는 선택된 탭에 따라 다른 출처 목록을 표시합니다.

---

### 5-1. 채용공고 탭 → 최근 업데이트 기업

**화면 설명**
- 최근 채용공고를 등록한 기업 목록 (10개)
- 기업 로고, 이름, 카테고리, 인증 여부
- 신규 등록 건수 (+3건), 전체 건수 (156건), 업데이트 시간 (2시간 전)

**필요 API** (기존 API 확장)
```
GET /api/v1/companies/recent/?limit=10
```

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": 1,
      "name": "토스",
      "sign": "toss",
      "logo_url": "https://...",
      "category": "Fintech",
      "is_premium": true,              // ⭐ 신규: 인증 기업 여부
      "updated_job_count": 3,          // ⭐ 신규: 최근 등록 건수
      "total_jobs": 156,               // ⭐ 신규: 전체 채용공고 수
      "updated_at": "2024-12-09T10:00:00Z"  // ⭐ 신규: 마지막 업데이트 시간
    }
  ]
}
```

---

### 5-2. 채용공고 탭 → 기업 검색

**화면 설명**
- 사이드바 상단 검색창
- 기업명 입력 시 자동완성 결과 표시
- 인증 기업은 클릭 가능, 미인증 기업은 잠금 표시

**필요 API** (신규 또는 기존 확장)
```
GET /api/v1/companies/search/?q=토스
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `q` | string | 검색어 |
| `limit` | int | 결과 제한 (기본 10) |

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": 1,
      "name": "토스",
      "sign": "toss",
      "logo_url": "https://...",
      "category": "Fintech",
      "is_premium": true,
      "total_jobs": 156
    }
  ]
}
```

---

### 5-3. 블로그 탭 → 최근 업데이트 블로그

**화면 설명**
- 최근 글을 발행한 기술 블로그 목록 (10개)
- 블로그 로고, 이름, 업데이트 시점, 신규 발행 수

**필요 API** (신규)
```
GET /api/v1/sources/recent/?type=blog&limit=10
```

**필요 파라미터**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `type` | string | 출처 타입: `blog` |
| `limit` | int | 결과 제한 |

**응답에 필요한 필드**
```json
{
  "results": [
    {
      "id": "blog-1",
      "name": "토스 기술 블로그",
      "logo_url": "https://...",
      "category": "Tech",
      "recent_count": 5,          // 최근 발행 글 수
      "total_count": 234,         // 전체 글 수
      "updated_at": "2024-12-09T10:00:00Z"
    }
  ]
}
```

---

### 5-4. 도서 탭 → 최근 업데이트 출판사

**화면 설명**
- 최근 도서를 등록한 출판사 목록 (10개)
- 출판사 로고, 이름, 신규 등록 수

**필요 API** (신규)
```
GET /api/v1/sources/recent/?type=book&limit=10
```

**응답 형식**: 5-3과 동일

---

### 5-5. 강의 탭 → 최근 업데이트 플랫폼

**화면 설명**
- 최근 강의를 등록한 교육 플랫폼 목록 (10개)
- 플랫폼 로고, 이름, 신규 등록 수

**필요 API** (신규)
```
GET /api/v1/sources/recent/?type=lecture&limit=10
```

**응답 형식**: 5-3과 동일

---

## 6. 콘텐츠 상세 Drawer

### 6-1. 콘텐츠 상세 정보

**화면 설명**
- 목록에서 항목 클릭 시 우측에서 Drawer가 열림
- 제목, 요약, 회사 정보, 원문 링크 표시

**필요 API** (기존 API 활용)
```
GET /api/v1/contents/{id}/
GET /api/v1/jobs/{id}/
```

---

## 요약: 신규/수정 필요 사항

### 기존 API 수정

| API | 추가할 파라미터 |
|-----|----------------|
| `GET /api/v1/contents/daily/` | `content_type`, `ai_category`, `date` |
| `GET /api/v1/jobs/daily/` | `date`, `ai_category` |

### 응답 필드 추가

| 위치 | 추가 필드 |
|------|----------|
| `analysis` | `ai_category` (string), `ai_score` (int 0-100) |

### 신규 API

| API | 용도 |
|-----|------|
| `GET /api/v1/stats/daily/` | 일일 통계 (탭별 요약 카드용) |
| `GET /api/v1/stats/weekly/` | 주간 통계 (트렌드 차트용) |
| `GET /api/v1/companies/search/` | 기업 검색 |
| `GET /api/v1/sources/recent/` | 수집 출처 목록 (블로그/출판사/플랫폼) |

### 기존 API 응답 확장

| API | 추가 필드 |
|-----|----------|
| `GET /api/v1/companies/recent/` | `is_premium`, `updated_job_count`, `total_jobs`, `updated_at` |

---

## AI 카테고리 분류 기준

### 채용공고용 (ai_category)
| 값 | 라벨 | 분류 기준 |
|----|------|----------|
| `ai-core` | AI 직무 | 제목에 AI, ML, 머신러닝, 딥러닝, LLM 등 포함 |
| `ai-enabled` | AI 활용 | 자격요건/업무에 AI 도구 활용 키워드 포함 |
| `traditional` | 일반 | 위 조건 해당 없음 |

### 콘텐츠용 (블로그/도서/강의)
| 값 | 라벨 | 분류 기준 |
|----|------|----------|
| `ai-dev` | AI & Dev | AI/ML 개발, 모델 학습, 프롬프트 엔지니어링 등 |
| `ai-design` | AI & Design | Midjourney, DALL-E, AI 디자인 툴 관련 |
| `ai-biz` | AI & Biz | AI 비즈니스, 전략, 도입 사례 |
| `ai-general` | AI 일반 | 기타 AI 관련 콘텐츠 |
| `other` | 기타 | AI 무관 |

---

## 문의

추가 논의 필요시 연락 부탁드립니다.
