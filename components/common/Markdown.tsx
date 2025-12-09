'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
  className?: string;
}

// 마크다운 헤딩/리스트 전처리: ## 앞에 빈 줄이 없으면 추가
function preprocessMarkdown(text: string): string {
  // 줄바꿈 없이 바로 ## 또는 - 또는 * 또는 숫자. 가 오는 경우 앞에 줄바꿈 추가
  // 예: "텍스트## 헤딩" → "텍스트\n\n## 헤딩"
  return text
    // 헤딩 앞에 줄바꿈이 없는 경우 (줄 시작이 아닌 경우)
    .replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2')
    // 리스트 앞에 줄바꿈이 없는 경우
    .replace(/([^\n])(\n[-*]\s)/g, '$1\n$2')
    .replace(/([^\n])(\n\d+\.\s)/g, '$1\n$2');
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const processedContent = preprocessMarkdown(content);

  return (
    <div className={`markdown-content overflow-hidden ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom link handling
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline transition-colors break-words"
            />
          ),
          // Custom code block handling
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="bg-slate-100 text-teal-600 px-1.5 py-0.5 rounded text-sm font-mono break-words"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Pre tag (code blocks)
          pre: ({ node, ...props }) => (
            <pre className="overflow-x-auto max-w-full" {...props} />
          ),
          // Table wrapper
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto max-w-full">
              <table {...props} />
            </div>
          ),
          // Image handling
          img: ({ node, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="max-w-full h-auto" alt="" {...props} />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
