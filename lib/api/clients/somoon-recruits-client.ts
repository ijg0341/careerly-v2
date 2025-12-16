/**
 * Somoon Recruits API 클라이언트
 * recruits.somoon.ai API와 통신합니다.
 * Token 인증 방식 사용
 */

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config';
import { setupRetryInterceptor } from '../interceptors/retry-handler';
import { setupLoggerInterceptor } from '../interceptors/logger';

/**
 * Somoon Recruits API 클라이언트
 * - Base URL: /api/somoon-recruits (Next.js proxy to recruits.somoon.ai:8000/data)
 * - Token 인증은 서버 프록시에서 처리 (CORS 우회)
 */
export const somoonRecruitsClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.SOMOON_RECRUITS_API_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 재시도 인터셉터
setupRetryInterceptor(somoonRecruitsClient);

// 로거 인터셉터 (개발 환경)
setupLoggerInterceptor(somoonRecruitsClient);

/**
 * 공통 에러 핸들러
 * 서비스 레이어에서 사용
 */
export { handleApiError } from '../interceptors/error-handler';
