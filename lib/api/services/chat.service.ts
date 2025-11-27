/**
 * Careerly Chat API 서비스
 * Next.js API Route를 통한 Django Backend 프록시
 * CORS 우회 및 httpOnly 쿠키 기반 인증
 */

import axios from 'axios';
import { handleApiError } from '../clients/rest-client';
import type {
  ChatRequest,
  ChatResponse,
  ChatSearchResult,
  ChatCitation,
  ApiVersion,
  ChatComparisonResult,
} from '../types/chat.types';

/**
 * Chat API용 클라이언트 (Next.js 프록시 사용)
 */
const chatClient = axios.create({
  baseURL: '/api/chat',
  timeout: 300000, // 5분 (AI 응답 시간 고려)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // httpOnly 쿠키 전송
});

/**
 * Chat API 호출 (Next.js 프록시를 통해 Django Backend)
 * @param request - Chat 요청 객체
 * @returns Chat 응답
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    const response = await chatClient.post<ChatResponse>('', request);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Chat API 호출 (기존 SearchResult 형식으로 변환)
 * 기존 UI 컴포넌트와 호환되도록 변환
 * @param query - 사용자 질문
 * @param userId - 사용자 ID (사용 안 함, 인증 토큰에서 자동 추출)
 * @param sessionId - 세션 ID (선택사항)
 * @param version - API 버전 (향후 확장용, 현재 사용 안 함)
 * @returns 변환된 Chat 응답
 */
export async function chatSearch(
  query: string,
  userId?: string,
  sessionId?: string,
  version?: ApiVersion
): Promise<ChatSearchResult> {
  try {
    const request: ChatRequest = {
      content: query,
      session_id: sessionId,
    };

    const response = await sendChatMessage(request);

    // sources.all을 Citation 형식으로 변환
    const citations: ChatCitation[] = response.sources.all.map((url, index) => ({
      id: `citation-${index + 1}`,
      title: extractTitleFromUrl(url),
      url,
      snippet: '',
    }));

    return {
      query,
      answer: response.content,
      citations,
      session_id: response.session_id,
      metadata: {
        processing_time: response.latency_ms ? response.latency_ms / 1000 : 0,
        model: 'careerly-agent',
        intent: response.intent,
        agents_used: response.agents_used,
        persona_level: response.persona_level,
        confidence: response.confidence,
        p1_score: response.p1_score,
        p2_achieved: response.p2_achieved,
      },
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Health Check
 * Note: Django backend에는 별도 health check 엔드포인트 없음
 * 필요시 별도 구현 필요
 */
export async function checkAgentHealth(): Promise<{ status: string }> {
  // Placeholder - Django backend에 health check 엔드포인트 추가 필요
  return { status: 'healthy' };
}

/**
 * 3개 버전 API를 병렬로 호출하여 결과 비교
 * Note: 현재 Django backend는 단일 응답만 제공
 * UI 호환성을 위해 동일한 결과를 3개 버전으로 복제
 * @param query - 사용자 질문
 * @param userId - 사용자 ID (사용 안 함, 인증 토큰에서 자동 추출)
 * @param sessionId - 세션 ID (선택사항)
 * @returns 버전별 결과 객체 (현재는 모두 동일한 결과)
 */
export async function chatSearchAllVersions(
  query: string,
  userId?: string,
  sessionId?: string
): Promise<ChatComparisonResult> {
  try {
    // Django backend는 단일 응답만 제공하므로 한 번만 호출
    const result = await chatSearch(query, userId, sessionId);

    // UI 호환성을 위해 동일한 결과를 3개 버전으로 복제
    return {
      v1Result: result,
      v3Result: result,
      v4Result: result,
    };
  } catch (error) {
    console.error('Chat search error:', error);
    return {
      v1Result: null,
      v3Result: null,
      v4Result: null,
    };
  }
}

/**
 * URL에서 제목 추출 (간단한 파싱)
 */
function extractTitleFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');

    // careerly.co.kr 도메인인 경우
    if (hostname.includes('careerly')) {
      return 'Careerly 아티클';
    }

    // 도메인 이름을 제목으로 사용
    return hostname
      .split('.')
      .slice(0, -1)
      .join('.')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return 'Reference';
  }
}
