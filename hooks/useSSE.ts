import { useState, useEffect, useCallback, useRef } from 'react';

export interface SSEMessage {
  type: 'token' | 'citation' | 'complete' | 'error';
  content: string;
  metadata?: Record<string, unknown>;
}

interface UseSSEOptions {
  url: string;
  enabled: boolean;
  onMessage?: (message: SSEMessage) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export function useSSE({
  url,
  enabled,
  onMessage,
  onComplete,
  onError,
}: UseSSEOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    if (!enabled || eventSourceRef.current) return;

    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          const message: SSEMessage = JSON.parse(event.data);
          setMessages((prev) => [...prev, message]);
          onMessage?.(message);

          if (message.type === 'complete') {
            onComplete?.();
            eventSource.close();
            eventSourceRef.current = null;
            setIsConnected(false);
          }
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      };

      eventSource.onerror = (err) => {
        const error = new Error('SSE connection error');
        setError(error);
        setIsConnected(false);
        onError?.(error);
        eventSource.close();
        eventSourceRef.current = null;
      };
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to connect to SSE');
      setError(error);
      onError?.(error);
    }
  }, [url, enabled, onMessage, onComplete, onError]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const reset = useCallback(() => {
    disconnect();
    setMessages([]);
    setError(null);
  }, [disconnect]);

  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return {
    isConnected,
    error,
    messages,
    connect,
    disconnect,
    reset,
  };
}
