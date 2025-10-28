import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Design Guide - Careerly',
};

export default function DesignGuideLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 이 layout은 Root layout의 Main 안에 들어가므로
  // Header/Footer는 Root에서 이미 렌더링됨
  // 완전히 제거하려면 Root layout을 수정하거나 Route Group을 사용해야 함
  return <>{children}</>;
}
