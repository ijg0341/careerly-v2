import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 앱 WebView 환경인지 확인
 */
export function isInApp(): boolean {
  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
}

/**
 * 앱에 메시지 전송
 */
export function postMessageToApp(message: { type: string; [key: string]: unknown }): void {
  if (isInApp()) {
    window.ReactNativeWebView!.postMessage(JSON.stringify(message));
  }
}

export * from './utils/date';
