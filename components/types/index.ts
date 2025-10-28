export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type StatusVariant = 'idle' | 'loading' | 'success' | 'error';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export const defaultTheme: ThemeColors = {
  primary: '#14b8a6', // teal-500
  secondary: '#9333ea', // purple-600
  background: '#ffffff',
  surface: '#f8fafc', // slate-50
  text: '#1e293b', // slate-800
  textMuted: '#64748b', // slate-500
  border: '#e2e8f0', // slate-200
  error: '#dc2626', // red-600
  warning: '#ca8a04', // yellow-600
  success: '#16a34a', // green-600
  info: '#2563eb', // blue-600
};
