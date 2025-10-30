import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Careerly - AI 커리어 검색',
  description: 'Perplexity 스타일의 AI 커리어 검색 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ReactQueryProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
