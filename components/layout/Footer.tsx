'use client';

import Link from 'next/link';

const CONSUMER_LAWS_URL = 'https://www.law.go.kr/법령/소비자기본법';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 w-full">
      <div className="max-w-3xl mx-auto py-9 px-4 flex flex-col gap-5 items-start md:items-center">
        {/* Links */}
        <div className="flex flex-wrap gap-2 gap-y-1 items-center md:justify-center">
          <Link
            href="/support"
            className="text-xs text-slate-400 hover:text-slate-500 underline underline-offset-2"
          >
            고객센터
          </Link>
          <Link
            href="/terms"
            className="text-xs text-slate-400 hover:text-slate-500 underline underline-offset-2"
          >
            이용약관
          </Link>
          <div className="h-3 w-px bg-slate-300" />
          <Link
            href="/privacy"
            className="text-xs text-slate-400 hover:text-slate-500 font-bold underline underline-offset-2"
          >
            개인정보 처리방침
          </Link>
        </div>

        {/* Company Info */}
        <div className="flex flex-wrap text-xs text-slate-400 gap-2 gap-y-1 items-center md:justify-center">
          <span>(주) 퍼블리</span>
          <div className="h-3 w-px bg-slate-300" />
          <span>대표이사: 박병규</span>
          <div className="h-3 w-px bg-slate-300" />
          <span>사업자 등록번호: 198-81-00096</span>
          <div className="h-3 w-px bg-slate-300" />
          <span>서울특별시 성동구 왕십리로2길 20, 3층 (04779)</span>
          <div className="h-3 w-px bg-slate-300" />
          <span>통신 판매업: 2020-서울강남-02648</span>
          <div className="h-3 w-px bg-slate-300" />
          <span>직업 정보: J1200020230004</span>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-slate-400 md:text-center">
          커리어리 서비스에서 제공하는 상품 정보에 대하여 (주)퍼블리는 통신판매중개자이며 통신판매의
          당사자가 아닙니다.
          <br />
          따라서 (주)퍼블리는 상품, 거래 정보 및 가격에 대하여 어떠한 의무와 책임도 부담하지
          않습니다.&nbsp;
          <a
            href={CONSUMER_LAWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-slate-500 underline underline-offset-2"
          >
            소비자분쟁해결기준
          </a>
        </div>
      </div>
    </footer>
  );
}
