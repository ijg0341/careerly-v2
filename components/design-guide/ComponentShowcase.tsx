'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  usageContext: string;
  children: React.ReactNode;
  id?: string;
}

export function ComponentShowcase({ title, description, usageContext, children, id }: ComponentShowcaseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(title);
      setCopied(true);
      toast.success(`"${title}" copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Generate ID from title if not provided
  const sectionId = id || title.toLowerCase().replace(/\s+/g, '-').replace(/[\/]/g, '-');

  return (
    <div id={sectionId} className="border border-slate-200 rounded-lg bg-white shadow-sm scroll-mt-24">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 text-left hover:text-coral-500 transition-colors min-w-0 flex-1"
          >
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-coral-500 shrink-0">{title}</h3>
            <span className="text-sm text-slate-600 truncate">{description}</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-1.5">
          <span className="font-semibold">사용처:</span> {usageContext}
        </p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
