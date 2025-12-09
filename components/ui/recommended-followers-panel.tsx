'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, Plus, Check } from 'lucide-react';

export interface RecommendedFollower {
  id: string;
  name: string;
  image_url?: string;
  headline?: string;
  isFollowing?: boolean;
  href?: string;
}

export interface RecommendedFollowersPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  followers: RecommendedFollower[];
  title?: string;
  maxItems?: number;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
}

export const RecommendedFollowersPanel = React.forwardRef<HTMLDivElement, RecommendedFollowersPanelProps>(
  (
    {
      followers,
      title = '추천 팔로워',
      maxItems = 5,
      onFollow,
      onUnfollow,
      className,
      ...props
    },
    ref
  ) => {
    const [followingState, setFollowingState] = React.useState<Record<string, boolean>>({});
    const displayedFollowers = followers.slice(0, maxItems);

    // Initialize following state from props
    React.useEffect(() => {
      const initialState: Record<string, boolean> = {};
      followers.forEach(follower => {
        initialState[follower.id] = follower.isFollowing || false;
      });
      setFollowingState(initialState);
    }, [followers]);

    const handleFollowClick = (userId: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyFollowing = followingState[userId];

      if (isCurrentlyFollowing) {
        onUnfollow?.(userId);
      } else {
        onFollow?.(userId);
      }

      setFollowingState(prev => ({
        ...prev,
        [userId]: !isCurrentlyFollowing,
      }));
    };

    return (
      <div ref={ref} className={cn('bg-slate-50/50 rounded-2xl p-6', className)} {...props}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-serif font-bold text-slate-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-6">
          관심사가 비슷한 사용자를 팔로우해보세요
        </p>

        {/* Followers List */}
        <div className="space-y-4">
          {displayedFollowers.map((follower, index) => {
            const isFollowing = followingState[follower.id] || false;

            return (
              <div
                key={follower.id}
                className="flex items-center justify-between gap-3"
              >
                {/* User Info */}
                <a href={follower.href || '#'} className="flex items-center gap-3 flex-1 min-w-0 group">
                  <Avatar className="h-9 w-9 flex-shrink-0 border border-slate-200">
                    <AvatarImage src={follower.image_url} alt={follower.name} />
                    <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                      {follower.name}
                    </span>
                    {follower.headline && (
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {follower.headline}
                      </p>
                    )}
                  </div>
                </a>

                {/* Follow Button */}
                <button
                  onClick={(e) => handleFollowClick(follower.id, e)}
                  className={cn(
                    'flex-shrink-0 p-1.5 rounded-full transition-all',
                    isFollowing
                      ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
                  )}
                  aria-label={isFollowing ? "언팔로우" : "팔로우"}
                >
                  {isFollowing ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer - See More */}
        {followers.length > displayedFollowers.length && (
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

RecommendedFollowersPanel.displayName = 'RecommendedFollowersPanel';
