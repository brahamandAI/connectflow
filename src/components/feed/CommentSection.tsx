"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "@/lib/date-utils";

interface Comment {
  id: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  currentUserId: string;
  currentUserRole: string;
  onComment: (postId: string, content: string) => void;
}

export function CommentSection({ 
  postId, 
  currentUserId, 
  currentUserRole, 
  onComment 
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments?postId=${postId}&limit=10`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postId,
          authorId: currentUserId,
          authorRole: currentUserRole,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
        onComment(postId, newComment);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, parentCommentId: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          postId,
          authorId: currentUserId,
          authorRole: currentUserRole,
          parentCommentId,
        }),
      });

      if (response.ok) {
        const reply = await response.json();
        setComments(prev => 
          prev.map(comment => 
            comment.id === parentCommentId 
              ? { ...comment, replies: [...(comment.replies || []), reply] }
              : comment
          )
        );
        setReplyContent("");
        setReplyingTo(null);
        onComment(postId, replyContent);
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
          userRole: currentUserRole,
        }),
      });

      if (response.ok) {
        // Update the comment's like count optimistically
        setComments(prev =>
          prev.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, likesCount: comment.likesCount + 1 };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === commentId
                    ? { ...reply, likesCount: reply.likesCount + 1 }
                    : reply
                )
              };
            }
            return comment;
          })
        );
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 mt-3' : 'mb-4'}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.profileImage} alt={comment.author.fullName} />
          <AvatarFallback>
            {comment.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-sm text-foreground">
                {comment.author.fullName}
              </span>
              {comment.author.headline && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{comment.author.headline}</span>
                </>
              )}
            </div>
            
            <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id)}
              className="text-xs text-gray-500 hover:text-blue-600 p-0 h-auto"
            >
              <Heart className="h-3 w-3 mr-1" />
              Like
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
                className="text-xs text-gray-500 hover:text-blue-600 p-0 h-auto"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
            
            {comment.likesCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}
              </span>
            )}
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {currentUserId.slice(-2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={!replyContent.trim()}>
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {currentUserId.slice(-2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <Button type="submit" disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

