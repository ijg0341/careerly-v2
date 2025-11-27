/**
 * Common Widget API Types
 */

export interface WidgetAPIResponse<T> {
  data: T;
  cached?: boolean;
  timestamp: string;
}

export interface WidgetAPIError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Cache Configuration
 */
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate?: boolean;
}

/**
 * API Service Configuration
 */
export interface APIServiceConfig {
  cache?: CacheConfig;
  timeout?: number;
  retries?: number;
}
