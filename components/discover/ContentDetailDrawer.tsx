'use client';

import * as React from 'react';
import { X, Eye, Heart, MessageCircle, ExternalLink, Bookmark, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export interface CommentData {
  id: string;
  userName: string;
  userImage?: string;
  userHeadline?: string;
  content: string;
  createdAt: string;
  likeCount: number;
  liked: boolean;
}

export interface ContentDetailData {
  id: string;
  title: string;
  summary: string;
  externalUrl?: string;
  imageUrl?: string;
  companyName?: string;
  companyLogo?: string;
  isLiked: boolean;
  isBookmarked: boolean;
  views: number;
  likes: number;
  comments: CommentData[];
}

export interface ContentDetailDrawerProps {
  open: boolean;
  content: ContentDetailData | null;
  onClose: () => void;
  onContentChange: (content: ContentDetailData | null) => void;
}

export function ContentDetailDrawer({
  open,
  content,
  onClose,
  onContentChange,
}: ContentDetailDrawerProps) {
  const [newComment, setNewComment] = React.useState('');

  const handleLikeContent = () => {
    if (!content) return;
    onContentChange({
      ...content,
      isLiked: !content.isLiked,
      likes: content.isLiked ? content.likes - 1 : content.likes + 1,
    });
  };

  const handleBookmarkContent = () => {
    if (!content) return;
    onContentChange({
      ...content,
      isBookmarked: !content.isBookmarked,
    });
  };

  const handleLikeComment = (commentId: string) => {
    if (!content) return;
    onContentChange({
      ...content,
      comments: content.comments.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likeCount: c.liked ? c.likeCount - 1 : c.likeCount + 1 }
          : c
      ),
    });
  };

  const handleAddComment = () => {
    if (!content || !newComment.trim()) return;
    onContentChange({
      ...content,
      comments: [
        {
          id: Date.now().toString(),
          userName: '나',
          userImage: undefined,
          userHeadline: undefined,
          content: newComment,
          createdAt: '방금 전',
          likeCount: 0,
          liked: false,
        },
        ...content.comments,
      ],
    });
    setNewComment('');
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto border-l border-slate-100',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {content && (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {content.companyLogo && (
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden">
                    <img
                      src={content.companyLogo}
                      alt={content.companyName}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-slate-900">{content.companyName}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  {content.title}
                </h1>

                {/* Stats Bar */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{content.views}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{content.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{content.comments.length}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="prose prose-slate max-w-none mb-6">
                  <p className="text-slate-700 leading-relaxed">{content.summary}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-8">
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    공고 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'border-slate-200',
                      content.isLiked && 'bg-red-50 border-red-200'
                    )}
                    onClick={handleLikeContent}
                  >
                    <Heart
                      className={cn('h-4 w-4', content.isLiked && 'fill-red-500 text-red-500')}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'border-slate-200',
                      content.isBookmarked && 'bg-teal-50 border-teal-200'
                    )}
                    onClick={handleBookmarkContent}
                  >
                    <Bookmark
                      className={cn(
                        'h-4 w-4',
                        content.isBookmarked && 'fill-teal-500 text-teal-500'
                      )}
                    />
                  </Button>
                </div>

                {/* Comments Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    댓글 {content.comments.length}
                  </h3>

                  {/* Comment Input */}
                  <div className="flex gap-2 mb-6">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-slate-200 text-slate-600">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newComment.trim()) {
                            handleAddComment();
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        className="bg-teal-600 hover:bg-teal-700"
                        disabled={!newComment.trim()}
                        onClick={handleAddComment}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  {content.comments.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                      {content.comments.map((comment) => (
                        <div key={comment.id} className="py-4 first:pt-0">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarImage src={comment.userImage} alt={comment.userName} />
                              <AvatarFallback className="bg-slate-200 text-slate-600">
                                {comment.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex-1">
                                  <span className="font-semibold text-slate-900 text-sm">
                                    {comment.userName}
                                  </span>
                                  {comment.userHeadline && (
                                    <p className="text-xs text-slate-500">{comment.userHeadline}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className={cn(
                                      'flex items-center gap-1 text-xs transition-colors',
                                      comment.liked
                                        ? 'text-red-500'
                                        : 'text-slate-400 hover:text-red-500'
                                    )}
                                  >
                                    <Heart
                                      className={cn('h-3.5 w-3.5', comment.liked && 'fill-current')}
                                    />
                                    {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
                                  </button>
                                  <span className="text-xs text-slate-400">{comment.createdAt}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">아직 댓글이 없습니다.</p>
                      <p className="text-xs">첫 번째 댓글을 남겨보세요!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
    </>
  );
}
