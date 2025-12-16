'use client';

import { ChevronLeft, Mail, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const FAQ_ITEMS = [
  {
    question: '계정을 탈퇴하고 싶어요',
    answer: '설정 > 계정 탈퇴 메뉴에서 탈퇴할 수 있습니다. 탈퇴 시 계정이 비활성화되며 복구할 수 없습니다.',
  },
  {
    question: '비밀번호를 잊어버렸어요',
    answer: '로그인 화면에서 "비밀번호 찾기"를 클릭하시면 가입하신 이메일로 비밀번호 재설정 링크를 받으실 수 있습니다.',
  },
  {
    question: '프로필 정보를 수정하고 싶어요',
    answer: '프로필 페이지에서 "편집" 버튼을 클릭하시면 프로필 정보를 수정할 수 있습니다.',
  },
  {
    question: '게시글/댓글을 삭제하고 싶어요',
    answer: '본인이 작성한 게시글이나 댓글의 더보기 메뉴(...)에서 삭제할 수 있습니다.',
  },
  {
    question: '특정 사용자를 차단하고 싶어요',
    answer: '해당 사용자의 프로필에서 더보기 메뉴(...)를 눌러 차단할 수 있습니다. 차단된 사용자의 콘텐츠는 더 이상 표시되지 않습니다.',
  },
  {
    question: '부적절한 콘텐츠를 신고하고 싶어요',
    answer: '해당 게시글이나 댓글의 더보기 메뉴(...)에서 "신고하기"를 선택해주세요. 검토 후 조치하겠습니다.',
  },
];

export default function SupportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1 -ml-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-slate-700" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">고객센터</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Contact Section */}
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-4">문의하기</h2>
            <p className="text-sm text-slate-600 mb-6">
              서비스 이용 중 궁금한 점이나 불편한 점이 있으시면 아래 방법으로 문의해주세요.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:support@careerly.co.kr"
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">이메일 문의</p>
                  <p className="text-sm text-slate-500">support@careerly.co.kr</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">응답 시간</p>
                  <p className="text-sm text-slate-500">평일 10:00 ~ 18:00</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              문의 시 회원 정보(이메일)와 문의 내용을 상세히 작성해 주시면 더 빠른 답변이 가능합니다.
            </p>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-medium text-slate-900 mb-1">Q. {item.question}</h3>
                  <p className="text-sm text-slate-600">A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-4">관련 링크</h2>
            <div className="space-y-2">
              <Link
                href="/terms"
                className="block text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
              >
                개인정보 처리방침
              </Link>
            </div>
          </section>

          {/* Company Info */}
          <section className="text-xs text-slate-400 space-y-1">
            <p>(주) 퍼블리 | 대표이사: 박병규</p>
            <p>사업자 등록번호: 198-81-00096</p>
            <p>서울특별시 성동구 왕십리로2길 20, 3층 (04779)</p>
          </section>
        </div>

        {/* Footer spacing */}
        <div className="h-16" />
      </main>
    </div>
  );
}
