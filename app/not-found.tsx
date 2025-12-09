import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center space-y-6">
        {/* 아이콘 */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-slate-400" />
          </div>
        </div>

        {/* 메시지 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-slate-600">
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <Button asChild variant="solid" className="w-full">
            <Link href="/">
              <Home className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
