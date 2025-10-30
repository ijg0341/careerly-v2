'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Play } from 'lucide-react';

export interface MediaThumbProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  ratio?: '16:9' | '1:1' | '4:3';
  badge?: string;
  type?: 'image' | 'video';
  duration?: string;
}

const MediaThumb = React.forwardRef<HTMLDivElement, MediaThumbProps>(
  ({ src, alt, ratio = '16:9', badge, type = 'image', duration, className, ...props }, ref) => {
    const aspectRatioClass = {
      '16:9': 'aspect-video',
      '1:1': 'aspect-square',
      '4:3': 'aspect-[4/3]',
    }[ratio];

    return (
      <div ref={ref} className={cn('relative overflow-hidden rounded-lg bg-slate-100 border border-slate-200', aspectRatioClass, className)} {...props}>
        {/* Image */}
        <Image src={src} alt={alt} fill className="object-cover" />

        {/* Video Overlay */}
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <Play className="h-6 w-6 text-slate-900 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Duration Badge for Videos */}
        {type === 'video' && duration && (
          <div className="absolute bottom-2 right-2">
            <Badge tone="slate" className="bg-black/70 text-white border-0 backdrop-blur-sm text-xs">
              {duration}
            </Badge>
          </div>
        )}

        {/* Custom Badge */}
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge tone="coral" className="bg-coral-500 text-white border-0 shadow-md">
              {badge}
            </Badge>
          </div>
        )}
      </div>
    );
  }
);

MediaThumb.displayName = 'MediaThumb';

export { MediaThumb };
