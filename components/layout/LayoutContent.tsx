'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Main } from '@/components/layout/Main';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesignGuide = pathname?.startsWith('/design-guide');

  if (isDesignGuide) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
