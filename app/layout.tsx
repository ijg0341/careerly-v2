import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

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
    <html lang="ko" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="antialiased font-sans">
        <ReactQueryProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
