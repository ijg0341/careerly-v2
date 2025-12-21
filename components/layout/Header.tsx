'use client';

import Link from 'next/link';
import { Search, BookmarkIcon, History, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Careerly</span>
        </Link>

        {/* Center Search CTA */}
        {pathname !== '/chat' && (
          <Link
            href="/chat"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">새로운 검색...</span>
          </Link>
        )}

        {/* Right Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/design-guide"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="디자인 가이드"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <span>가이드</span>
          </Link>
          <Link
            href="/history"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="검색 히스토리"
          >
            <History className="w-5 h-5 text-slate-600" />
          </Link>
          <Link
            href="/bookmarks"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="북마크"
          >
            <BookmarkIcon className="w-5 h-5 text-slate-600" />
          </Link>
          <Link
            href="/profile"
            className="ml-2"
            title="프로필"
          >
            <div className="tw-profile-image w-8 h-8 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
              <User className="w-4 h-4 text-white" />
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
