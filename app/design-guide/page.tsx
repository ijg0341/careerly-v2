'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DesignGuidePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/design-guide/colors');
  }, [router]);

  return null;
}
