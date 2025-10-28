'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface QuickNavProps {
  items: Array<{ id: string; label: string }>;
}

export function QuickNav({ items }: QuickNavProps) {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-24 h-fit">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-slate-900">컴포넌트 목록</h3>
        <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                'block w-full rounded px-3 py-2 text-left text-sm transition-colors',
                activeId === id
                  ? 'bg-slate-700 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
