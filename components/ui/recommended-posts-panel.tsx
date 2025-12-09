'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { TrendingUp, Heart, ThumbsUp } from 'lucide-react';

export interface RecommendedPost {
  id: string;
  title: string;
  author: {
    name: string;
    image_url?: string;
  };
  likeCount: number;
  href?: string;
}

export interface RecommendedPostsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: RecommendedPost[];
  title?: string;
  maxItems?: number;
}

export const RecommendedPostsPanel = React.forwardRef<HTMLDivElement, RecommendedPostsPanelProps>(
  (
    {
      posts,
      title = '추천 포스트',
      maxItems = 5,
      className,
      ...props
    },
    ref
  ) => {
    const displayedPosts = posts.slice(0, maxItems);

    return (
      <div ref={ref} className={cn('bg-slate-50/50 rounded-2xl p-6', className)} {...props}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-serif font-bold text-slate-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-6">
          지금 인기 있는 포스트를 확인해보세요
        </p>

        {/* Posts List */}
        <div className="space-y-4">
          {displayedPosts.map((post, index) => {
            return (
              <a
                key={post.id}
                href={post.href || '#'}
                className="block group"
              >
                <div className="flex flex-col gap-1">
                  {/* Post Title */}
                  <h4 className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h4>

                  {/* Author & Stats */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <Heart className="h-3 w-3" />
                      <span className="text-xs">{post.likeCount}</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer - See More */}
        {posts.length > displayedPosts.length && (
          <div className="mt-6 pt-4 border-t border-slate-200/50">
            <button className="w-full text-sm font-medium text-slate-500 hover:text-teal-700 transition-colors flex items-center justify-center gap-1">
              더 보기
            </button>
          </div>
        )}
      </div>
    );
  }
);

RecommendedPostsPanel.displayName = 'RecommendedPostsPanel';
