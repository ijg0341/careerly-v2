import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Mock streaming response for SSE
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const tokens = [
        '프론트엔드',
        ' 개발자가',
        ' 되기',
        ' 위해서는',
        ' 다음과',
        ' 같은',
        ' 단계를',
        ' 거치는',
        ' 것이',
        ' 좋습니다:\n\n',
        '## 1. 기초 학습\n',
        'HTML, CSS, JavaScript의 기본 문법과 개념을 탄탄히 다져야 합니다.',
      ];

      // Send tokens with delay to simulate streaming
      for (const token of tokens) {
        const data = {
          type: 'token',
          content: token,
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
        // Simulate typing delay
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Send citations
      const citation = {
        type: 'citation',
        content: JSON.stringify({
          id: '1',
          title: '프론트엔드 개발자 로드맵 2024',
          url: 'https://example.com/roadmap',
          snippet: 'HTML, CSS, JavaScript 기초부터...',
        }),
      };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(citation)}\n\n`)
      );

      // Send completion
      const complete = {
        type: 'complete',
        content: 'done',
      };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(complete)}\n\n`)
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
