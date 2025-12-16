'use client';

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

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="aspect-[2/3] rounded-md overflow-hidden bg-slate-100 shadow-md group-hover:shadow-lg transition-shadow mb-2 relative">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <span className="text-3xl">📚</span>
          </div>
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
