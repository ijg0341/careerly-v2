'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostsRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;

  useEffect(() => {
    if (postId) {
      router.replace(`/community?post=${postId}`);
    }
  }, [postId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500">이동 중...</div>
    </div>
  );
}
