'use client';

import Link from 'next/link';

/**
 * 사이드바 하단에 표시되는 간소화된 푸터
 * - discover 페이지 사이드메뉴
 * - community 페이지 사이드메뉴
 */
export function SidebarFooter() {
  return (
    <div className="pt-6 border-t border-slate-100">
      {/* Links */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
        <Link
          href="/support"
          className="hover:text-slate-600 underline-offset-2 hover:underline"
        >
          고객센터
        </Link>
        <Link
          href="/terms"
          className="hover:text-slate-600 underline-offset-2 hover:underline"
        >
          이용약관
        </Link>
        <Link
          href="/privacy"
          className="hover:text-slate-600 font-semibold underline-offset-2 hover:underline"
        >
          개인정보 처리방침
        </Link>
      </div>

      {/* Company Info */}
      <div className="text-[10px] text-slate-300 leading-relaxed space-y-1">
        <div className="flex flex-wrap gap-x-1">
          <span>(주) 퍼블리</span>
          <span>·</span>
          <span>대표이사: 박병규</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span>사업자 등록번호: 198-81-00096</span>
        </div>
        <div className="flex flex-wrap gap-x-1">
          <span>통신 판매업: 2020-서울강남-02648</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-3 text-[10px] text-slate-300">
        © 2025 Careerly
      </div>
    </div>
  );
}
