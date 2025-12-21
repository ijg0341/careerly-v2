'use client';

import * as React from 'react';
import { X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface TopAlertBannerProps {
  /** 표시 여부 */
  isVisible: boolean;
  /** 닫기 핸들러 */
  onClose?: () => void;
  /** 알림 타입 */
  variant?: AlertVariant;
  /** 알림 메시지 */
  message: React.ReactNode;
  /** 액션 버튼 텍스트 */
  actionText?: string;
  /** 액션 버튼 클릭 핸들러 */
  onAction?: () => void;
  /** 메시지 클릭 가능 여부 */
  messageClickable?: boolean;
  /** 닫기 버튼 표시 여부 */
  dismissible?: boolean;
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; text: string; icon: string; border: string }> = {
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    icon: 'text-blue-500',
    border: 'border-blue-200',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    icon: 'text-green-500',
    border: 'border-green-200',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    icon: 'text-amber-500',
    border: 'border-amber-200',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    icon: 'text-red-500',
    border: 'border-red-200',
  },
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export function TopAlertBanner({
  isVisible,
  onClose,
  variant = 'info',
  message,
  actionText,
  onAction,
  messageClickable = false,
  dismissible = true,
  showIcon = true,
  className,
}: TopAlertBannerProps) {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-[100] max-w-sm',
        // 모바일: 좌우 여백, 데스크탑: 사이드바 피해서 우측
        'left-4 md:left-auto md:right-6 md:bottom-6'
      )}
    >
      <div
        className={cn(
          'rounded-xl border shadow-lg p-4',
          'bg-white',
          styles.border,
          className
        )}
      >
        <div className="flex gap-3">
          {showIcon && (
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', styles.icon)} />
          )}
          <div className="flex-1 min-w-0">
            {messageClickable && onAction ? (
              <button
                onClick={onAction}
                className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors text-left"
              >
                {message}
              </button>
            ) : (
              <p className="text-sm font-medium text-slate-900">
                {message}
              </p>
            )}
            {actionText && onAction && (
              <button
                onClick={onAction}
                className={cn(
                  'block mt-2 text-sm font-semibold hover:underline transition-all',
                  styles.text
                )}
              >
                {actionText} →
              </button>
            )}
          </div>
          {dismissible && onClose && (
            <button
              onClick={onClose}
              className="p-1 -mt-1 -mr-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="알림 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Context for global alert state
interface TopAlertContextType {
  showAlert: (options: Omit<TopAlertBannerProps, 'isVisible'>) => void;
  hideAlert: () => void;
  alertProps: TopAlertBannerProps | null;
}

const TopAlertContext = React.createContext<TopAlertContextType | null>(null);

export function TopAlertProvider({ children }: { children: React.ReactNode }) {
  const [alertProps, setAlertProps] = React.useState<TopAlertBannerProps | null>(null);

  const showAlert = React.useCallback((options: Omit<TopAlertBannerProps, 'isVisible'>) => {
    setAlertProps({
      ...options,
      isVisible: true,
      onClose: () => {
        options.onClose?.();
        setAlertProps(null);
      },
    });
  }, []);

  const hideAlert = React.useCallback(() => {
    setAlertProps(null);
  }, []);

  return (
    <TopAlertContext.Provider value={{ showAlert, hideAlert, alertProps }}>
      {children}
    </TopAlertContext.Provider>
  );
}

export function useTopAlert() {
  const context = React.useContext(TopAlertContext);
  if (!context) {
    throw new Error('useTopAlert must be used within a TopAlertProvider');
  }
  return context;
}
