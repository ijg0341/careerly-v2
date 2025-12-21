'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function QnasRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const qnaId = params.qnaId as string;

  useEffect(() => {
    if (qnaId) {
      router.replace(`/community?qna=${qnaId}`);
    }
  }, [qnaId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500">이동 중...</div>
    </div>
  );
}
