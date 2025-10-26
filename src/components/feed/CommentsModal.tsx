"use client";

import { useState, useEffect } from "react";
import { X, Send, Heart, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "@/lib/date-utils";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorRole: string;
  parentCommentId?: string;
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

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
  };
  createdAt: string;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  currentUserId: string;
  currentUserRole: string;
  onComment?: (postId: string, content: string) => void;
}

export function CommentsModal({ 
  isOpen, 
  onClose, 
  post, 
  currentUserId, 
  currentUserRole,
  onComment 
}: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, post.id]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments?postId=${post.id}&limit=50`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postId: post.id,
          authorId: currentUserId,
          authorRole: currentUserRole,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
        onComment?.(post.id, newComment);
        toast.success('Comment added successfully!');
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        toast.success('Comment deleted successfully');
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-row overflow-hidden">
        {/* Left Side - Post */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Comments</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Content */}
          <div className="flex-1 flex flex-col justify-center p-6">
            <div className="max-w-md mx-auto">
              {/* Post Author */}
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={post.author.profileImage || undefined} 
                    alt={post.author.fullName}
                    className={post.author.profileImage ? '' : 'hidden'}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {post.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{post.author.fullName}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt="Post image"
                    className="w-full h-auto object-cover max-h-96"
                  />
                </div>
              )}

              {/* Post Text */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Comments */}
        <div className="w-96 border-l border-border flex flex-col">
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={comment.author.profileImage || undefined} 
                      alt={comment.author.fullName}
                      className={comment.author.profileImage ? '' : 'hidden'}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {comment.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-foreground">
                            {comment.author.fullName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        {comment.authorId === currentUserId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{comment.content}</p>
                    </div>
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 ml-4 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage 
                                src={reply.author.profileImage || undefined} 
                                alt={reply.author.fullName}
                                className={reply.author.profileImage ? '' : 'hidden'}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {reply.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted/30 rounded-lg px-2 py-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-xs text-foreground">
                                  {reply.author.fullName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-xs text-foreground">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmitComment} className="flex items-end space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {currentUserRole === 'recruiter' ? 'R' : 'JS'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="min-h-[40px] max-h-20 resize-none"
                  rows={1}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || submitting}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
