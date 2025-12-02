# 프론트엔드 인증 시스템 리팩토링 완료 보고서

## 개요
프론트엔드에서 인증 프록시 API 라우트를 제거하고, 백엔드(api.careerly.com)를 직접 호출하도록 리팩토링 완료

## 작업 완료 일시
2025-12-02

## 주요 변경사항

### 1. lib/api/services/auth.service.ts
**변경 내용**: 모든 인증 관련 함수가 백엔드를 직접 호출하도록 수정

- `login()`: `/api/auth/login` → `${API_CONFIG.REST_BASE_URL}/api/v1/auth/login/`
- `logout()`: `/api/auth/logout` → `${API_CONFIG.REST_BASE_URL}/api/v1/auth/logout/`
- `refreshToken()`: `/api/auth/refresh` → `${API_CONFIG.REST_BASE_URL}/api/v1/auth/refresh-cookie/`
- `getCurrentUser()`: `/api/auth/me` → `${API_CONFIG.REST_BASE_URL}/api/v1/users/me/`
- `signup()`: `/api/auth/register` → `${API_CONFIG.REST_BASE_URL}/api/v1/auth/register/`

**주요 특징**:
- 모든 요청에 `credentials: 'include'` 추가 (쿠키 전송 허용)
- 백엔드에서 httpOnly 쿠키를 직접 설정
- 응답 형식이 Django 백엔드 형식으로 변경됨

### 2. lib/api/auth/interceptor.ts
**변경 내용**: 401 에러 시 토큰 갱신 로직을 백엔드 직접 호출로 변경

```typescript
// 이전: const response = await fetch('/api/auth/refresh', ...)
// 이후: const response = await fetch(`${API_CONFIG.REST_BASE_URL}/api/v1/auth/refresh-cookie/`, ...)
```

- 토큰 갱신 시 백엔드가 새로운 httpOnly 쿠키를 직접 설정
- 응답에서 `data.access` 사용 (이전: `data.accessToken`)

### 3. lib/api/auth/token.server.ts
**변경 내용**: 쿠키 설정 함수 제거, 읽기 전용으로 변경

**제거된 함수**:
- `setAuthCookies()` - 백엔드에서 쿠키 설정
- `clearAuthCookies()` - 불필요

**수정된 함수**:
- `refreshAccessToken()`: 백엔드 직접 호출로 변경, 쿠키 설정 로직 제거

**유지된 함수** (읽기 전용):
- `getAuthCookies()`
- `getAccessToken()`
- `getRefreshToken()`
- `isAuthenticated()`
- `getAuthHeader()`

### 4. lib/api/config.ts
**변경 내용**: 인증 엔드포인트를 백엔드 경로로 변경

```typescript
AUTH: {
  TOKEN_REFRESH_ENDPOINT: '/api/v1/auth/refresh-cookie/', // 이전: '/api/auth/refresh'
  LOGIN_ENDPOINT: '/api/v1/auth/login/',                  // 이전: '/api/auth/login'
  LOGOUT_ENDPOINT: '/api/v1/auth/logout/',                // 이전: '/api/auth/logout'
}
```

### 5. 프록시 API 라우트 제거
**삭제된 파일**:
- `app/api/auth/login/route.ts` ✅
- `app/api/auth/logout/route.ts` ✅
- `app/api/auth/refresh/route.ts` ✅
- `app/api/auth/register/route.ts` ✅
- `app/api/auth/me/route.ts` ✅

**유지된 라우트**:
- `app/api/auth/oauth/[provider]/login/route.ts` - OAuth 리다이렉트 처리 필요
- `app/api/auth/oauth/[provider]/callback/route.ts` - OAuth 콜백 처리 필요
- `app/api/auth/password-reset/request/route.ts` - 비밀번호 재설정
- `app/api/auth/password-reset/verify/route.ts` - 비밀번호 재설정 확인

## 변경되지 않은 파일

### lib/api/auth/token.client.ts
이미 백엔드를 직접 호출하도록 구현되어 있어 수정 불필요

### lib/api/hooks/mutations/useAuthMutations.ts
서비스 함수를 사용하므로 수정 불필요 (서비스 함수가 이미 백엔드 직접 호출)

### lib/api/clients/rest-client.ts
이미 `withCredentials: true` 설정되어 있어 수정 불필요

## 아키텍처 변경사항

### 이전 아키텍처
```
Browser → Next.js API Route (/api/auth/*) → Django Backend
                ↓ (httpOnly 쿠키 설정)
              Browser
```

### 현재 아키텍처
```
Browser → Django Backend (api.careerly.com)
            ↓ (httpOnly 쿠키 직접 설정)
          Browser
```

## 주요 이점

1. **단순화**: 불필요한 프록시 레이어 제거
2. **성능**: API 호출 레이턴시 감소
3. **보안**: 백엔드에서 직접 쿠키 관리로 일관성 향상
4. **유지보수**: 쿠키 설정 로직이 백엔드 한 곳에만 존재
5. **CORS 설정**: 백엔드에서 `api.careerly.com`이 `careerly.com`의 쿠키를 설정하도록 구성 필요

## 환경 변수 요구사항

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.careerly.com
```

백엔드에서 다음 설정 필요:
- CORS 설정: `careerly.com` 도메인 허용
- 쿠키 도메인: `.careerly.com` (서브도메인 간 공유)
- 쿠키 옵션: `httpOnly: true`, `secure: true`, `sameSite: 'lax'`

## 테스트 필요 항목

### 기본 인증 플로우
- [ ] 로그인 → 쿠키 설정 확인
- [ ] 로그아웃 → 쿠키 삭제 확인
- [ ] 회원가입 → 자동 로그인 확인

### 토큰 갱신
- [ ] 401 에러 시 자동 토큰 갱신
- [ ] 갱신 실패 시 로그인 페이지로 리다이렉트

### 쿠키 전송
- [ ] 모든 API 요청에 쿠키 자동 포함 확인
- [ ] SSR 시 쿠키 읽기 확인

### OAuth (기존 프록시 유지)
- [ ] Google 로그인
- [ ] Apple 로그인
- [ ] Kakao 로그인

## 빌드 결과

✅ 빌드 성공
- 타입 체크 통과
- ESLint 경고만 존재 (이미지 최적화 권장 등)
- 빌드 오류 없음

## 추가 작업 필요

### 백엔드 작업
1. CORS 설정 업데이트
   - Origin: `https://careerly.com` 허용
   - Credentials: `true` 설정

2. 쿠키 설정 확인
   - Domain: `.careerly.com`
   - SameSite: `Lax` 또는 `None` (HTTPS 필요)
   - Secure: `true` (프로덕션)

3. 엔드포인트 확인
   - `/api/v1/auth/login/`
   - `/api/v1/auth/logout/`
   - `/api/v1/auth/refresh-cookie/`
   - `/api/v1/auth/register/`
   - `/api/v1/users/me/`

### 프론트엔드 배포 전 확인
1. 환경변수 설정 (`NEXT_PUBLIC_API_BASE_URL`)
2. 도메인 설정 (careerly.com)
3. HTTPS 적용 확인

## 롤백 방법

만약 문제가 발생하면 다음 커밋으로 롤백:
```bash
git revert HEAD
```

또는 이전 커밋 체크아웃:
```bash
git checkout <이전_커밋_해시>
```

## 참고사항

- OAuth 및 비밀번호 재설정 API는 복잡한 리다이렉트 처리가 필요하므로 Next.js API Route 유지
- 기존 `lib/api` 패턴 그대로 유지
- 타입 안정성 유지
- SSR 케이스 고려됨 (쿠키 읽기 함수 유지)
