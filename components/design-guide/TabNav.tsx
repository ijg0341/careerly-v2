'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TabNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Components', href: '/design-guide/components' },
    { name: 'Icons', href: '/design-guide/icons' },
    { name: 'Colors', href: '/design-guide/colors' },
  ];

  return (
    <div className="border-b border-slate-200 mb-8">
      <nav className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                px-1 py-4 text-sm font-medium border-b-2 transition-colors
                ${
                  isActive
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
