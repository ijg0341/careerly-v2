'use client';

import * as React from 'react';

export interface BookCardData {
  id: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  publisherName: string;
  publisherLogo?: string;
  url?: string;
}

export interface BookCardProps {
  book: BookCardData;
  onClick?: () => void;
}

function BookPlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-3">
      <span className="text-2xl mb-2">📚</span>
      <span className="text-[10px] text-teal-700 font-medium text-center line-clamp-3 leading-tight">
        {title}
      </span>
    </div>
  );
}

export function BookCard({ book, onClick }: BookCardProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="aspect-[2/3] rounded-md overflow-hidden bg-slate-100 shadow-md group-hover:shadow-lg transition-shadow mb-2 relative">
        {book.imageUrl && !imageError ? (
          <img
            src={book.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <BookPlaceholder title={book.title} />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <h4 className="font-medium text-slate-900 text-xs line-clamp-2 group-hover:text-teal-700 transition-colors mb-1">
        {book.title}
      </h4>
      <div className="flex items-center gap-2 mt-1.5">
        {book.publisherLogo && (
          <img
            src={book.publisherLogo}
            alt=""
            className="w-5 h-5 rounded object-contain flex-shrink-0 border border-slate-100"
          />
        )}
        <p className="text-xs text-slate-600 truncate font-medium">{book.publisherName}</p>
      </div>
    </div>
  );
}
