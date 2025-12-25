'use client';

import { useEffect } from 'react';
import { nativeAppleAuth, nativeKakaoAuth } from '@/lib/api';
import { isInApp } from '@/lib/utils';
import { toast } from 'sonner';
import type { AppleAuthData, KakaoAuthData } from '@/types/global';

/**
 * 앱 WebView 환경에서 네이티브 소셜 로그인 핸들러를 전역으로 등록하는 컴포넌트
 *
 * 앱에서 네이티브 SDK로 로그인 후 window.handleNativeAppleAuth / handleNativeKakaoAuth를 호출하면
 * 이 핸들러가 백엔드 API를 호출하고 로그인 처리를 완료합니다.
 */
export function NativeAuthHandler() {
  useEffect(() => {
    // 브라우저 환경 체크
    if (typeof window === 'undefined') return;

    console.log('[NativeAuthHandler] Registering handlers, isInApp:', isInApp());

    // 앱에서 호출하는 네이티브 애플 로그인 핸들러
    window.handleNativeAppleAuth = async (authData: AppleAuthData) => {
      console.log('[NativeAuthHandler] handleNativeAppleAuth called:', authData);
      console.log('[NativeAuthHandler] authData type:', typeof authData);
      console.log('[NativeAuthHandler] identityToken:', authData?.identityToken?.substring(0, 50) + '...');
      try {
        console.log('[NativeAuthHandler] Calling nativeAppleAuth API...');
        const result = await nativeAppleAuth(authData);
        console.log('[NativeAuthHandler] API success:', result);
        toast.success('로그인되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('[NativeAuthHandler] Native Apple auth failed:', error);
        console.error('[NativeAuthHandler] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        toast.error('애플 로그인에 실패했습니다.');
      }
    };

    // 앱에서 호출하는 네이티브 카카오 로그인 핸들러
    window.handleNativeKakaoAuth = async (authData: KakaoAuthData) => {
      console.log('[NativeAuthHandler] handleNativeKakaoAuth called:', authData);
      console.log('[NativeAuthHandler] authData type:', typeof authData);
      console.log('[NativeAuthHandler] accessToken:', authData?.accessToken?.substring(0, 20) + '...');
      try {
        console.log('[NativeAuthHandler] Calling nativeKakaoAuth API...');
        const result = await nativeKakaoAuth(authData);
        console.log('[NativeAuthHandler] API success:', result);
        toast.success('로그인되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('[NativeAuthHandler] Native Kakao auth failed:', error);
        console.error('[NativeAuthHandler] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        toast.error('카카오 로그인에 실패했습니다.');
      }
    };

    console.log('[NativeAuthHandler] Handlers registered:', {
      handleNativeAppleAuth: typeof window.handleNativeAppleAuth,
      handleNativeKakaoAuth: typeof window.handleNativeKakaoAuth,
    });

    return () => {
      // 핸들러 정리
      delete window.handleNativeAppleAuth;
      delete window.handleNativeKakaoAuth;
    };
  }, []);

  return null;
}
