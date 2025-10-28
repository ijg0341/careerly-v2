import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-lg font-bold text-slate-900">
              Careerly
            </Link>
            <p className="text-sm text-slate-500">
              © 2025 Careerly. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              소개
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/contact"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              문의
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
