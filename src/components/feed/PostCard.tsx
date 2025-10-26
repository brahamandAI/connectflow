"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin, Building, Trash2, Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LikeListModal } from "./LikeListModal";
import { formatDistanceToNow } from "@/lib/date-utils";
import { CommentSection } from "./CommentSection";
import { ShareDialog } from "./ShareDialog";
import { CommentsModal } from "./CommentsModal";
import { toast } from "sonner";

interface LikeUser {
  id: string;
  userId: string;
  userRole: string;
  user: {
    id: string;
    fullName: string;
    profileImage?: string;
  };
  createdAt: string;
}

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
}

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  postType: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByUser: boolean;
  likes?: LikeUser[];
  comments?: Comment[];
  createdAt: string;
  location?: string;
  event?: {
    title: string;
    date: string;
    time: string;
  };
  author: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
  };
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
  currentUserRole: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string, content?: string) => void;
  onDelete?: (postId: string) => void;
}

export function PostCard({ 
  post, 
  currentUserId, 
  currentUserRole, 
  onLike, 
  onComment, 
  onShare,
  onDelete
}: PostCardProps) {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showLikeList, setShowLikeList] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLikedByUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isNewPost, setIsNewPost] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not-going' | null>(null);
  const [rsvpCounts, setRsvpCounts] = useState({ going: 0, maybe: 0, notGoing: 0 });
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Event-related functions
  const getEventStatus = () => {
    if (!post.event) return null;
    const eventDateTime = new Date(`${post.event.date} ${post.event.time}`);
    const now = new Date();
    const timeDiff = eventDateTime.getTime() - now.getTime();
    
    if (timeDiff < 0) return 'ended';
    if (timeDiff < 60 * 60 * 1000) return 'live'; // Within 1 hour
    return 'upcoming';
  };

  const getTimeUntilEvent = () => {
    if (!post.event) return null;
    const eventDateTime = new Date(`${post.event.date} ${post.event.time}`);
    const now = new Date();
    const timeDiff = eventDateTime.getTime() - now.getTime();
    
    if (timeDiff < 0) return 'Event has ended';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleRsvp = async (status: 'going' | 'maybe' | 'not-going') => {
    try {
      // In a real app, this would make an API call
      setRsvpStatus(status);
      const statusKey = status === 'not-going' ? 'notGoing' : status;
      const prevStatusKey = rsvpStatus === 'not-going' ? 'notGoing' : rsvpStatus;
      setRsvpCounts(prev => {
        const newCounts = { ...prev };
        newCounts[statusKey as keyof typeof prev] = prev[statusKey as keyof typeof prev] + 1;
        if (rsvpStatus && rsvpStatus !== status) {
          newCounts[prevStatusKey as keyof typeof prev] = prev[prevStatusKey as keyof typeof prev] - 1;
        }
        return newCounts;
      });
      toast.success(`RSVP updated: ${status.replace('-', ' ')}`);
    } catch (error) {
      toast.error('Failed to update RSVP');
    }
  };

  useEffect(() => {
    // Check if this is a newly created post (temporary ID)
    if (post.id.startsWith('temp-')) {
      setIsNewPost(true);
      // Remove the "new post" styling after 3 seconds
      const timer = setTimeout(() => setIsNewPost(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [post.id]);

  // Sync local state with prop changes (important for page refreshes)
  useEffect(() => {
    setIsLiked(post.isLikedByUser);
    setLikesCount(post.likesCount);
  }, [post.isLikedByUser, post.likesCount]);

  const handleLike = async () => {
    try {
      // Optimistic update
      const newIsLiked = !isLiked;
      const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
      
      setIsLiked(newIsLiked);
      setLikesCount(newLikesCount);
      
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
      
      const data = await response.json();
      
      // Server response should match our optimistic update
      // If it doesn't, we'll trust the server
      if (data.isLiked !== newIsLiked) {
        setIsLiked(data.isLiked);
        setLikesCount(post.likesCount + (data.isLiked ? 1 : -1));
      }
      
      onLike(post.id);
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert the optimistic update
      setIsLiked(post.isLikedByUser);
      setLikesCount(post.likesCount);
      toast.error('Failed to update like');
    }
  };

  const handleShare = async (sharedContent?: string) => {
    try {
      await fetch(`/api/posts/${post.id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
          userRole: currentUserRole,
          sharedContent,
        }),
      });
      
      onShare(post.id, sharedContent);
      setShowShareDialog(false);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      console.log('🗑️ Deleting post:', post.id);
      
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Post deleted successfully:', data);
        toast.success('Post deleted successfully');
        onDelete(post.id);
      } else {
        console.error('❌ Failed to delete post:', data);
        toast.error(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('❌ Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleProfileClick = () => {
    // If it's the current user, redirect to their dashboard profile
    if (post.author.id === currentUserId) {
      // Determine the role to redirect to the correct profile page
      const userRole = post.author.role;
      if (userRole === 'recruiter') {
        router.push('/dashboard/recruiter/profile');
      } else {
        router.push('/dashboard/job-seeker/profile');
      }
    } else {
      // For other users, use the dynamic profile page
      router.push(`/profile/${post.author.id}`);
    }
  };

  const isCurrentUserPost = post.author.id === currentUserId;

  const getPostTypeBadge = () => {
    switch (post.postType) {
      case 'job_update':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Job Update</Badge>;
      case 'announcement':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Announcement</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-sm transition-all duration-500 ${
      isNewPost ? 'animate-pulse border-primary/50 bg-primary/5' : ''
    }`}>
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div 
          className="flex items-start space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
          onClick={handleProfileClick}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={post.author.profileImage || undefined} 
              alt={post.author.fullName}
              className={post.author.profileImage ? '' : 'hidden'}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {post.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{post.author.fullName}</h3>
              {getPostTypeBadge()}
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              {post.author.headline && (
                <>
                  <span>{post.author.headline}</span>
                  <span>•</span>
                </>
              )}
              {post.author.companyName && (
                <>
                  <Building className="h-3 w-3" />
                  <span>{post.author.companyName}</span>
                  <span>•</span>
                </>
              )}
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isCurrentUserPost && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              title="Delete post"
            >
              {isDeleting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
            <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
        
        {/* Special Event Card */}
        {post.event && (
          <div className="mt-4 bg-muted/30 border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{post.event.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(post.event.date).toLocaleDateString()} at {post.event.time}</span>
                    </div>
                    {post.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{post.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Event Status Badge */}
              <Badge 
                variant={getEventStatus() === 'live' ? 'default' : getEventStatus() === 'ended' ? 'secondary' : 'outline'}
                className={
                  getEventStatus() === 'live' ? 'bg-red-500/10 text-red-600 border-red-200' :
                  getEventStatus() === 'ended' ? 'bg-muted text-muted-foreground' :
                  'bg-green-500/10 text-green-600 border-green-200'
                }
              >
                {getEventStatus() === 'live' ? '🔴 Live' : 
                 getEventStatus() === 'ended' ? 'Ended' : 
                 'Upcoming'}
              </Badge>
            </div>
            
            {/* Countdown Timer */}
            {getEventStatus() === 'upcoming' && (
              <div className="mb-3 p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Starts in:</span>
                  <span className="font-bold text-primary">{getTimeUntilEvent()}</span>
                </div>
              </div>
            )}
            
            {/* RSVP Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">RSVP</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={rsvpStatus === 'going' ? 'default' : 'outline'}
                  onClick={() => handleRsvp('going')}
                  className={`flex-1 ${
                    rsvpStatus === 'going' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'hover:bg-green-500/10 hover:text-green-600 hover:border-green-200'
                  }`}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Going {rsvpCounts.going > 0 && `(${rsvpCounts.going})`}
                </Button>
                
                <Button
                  size="sm"
                  variant={rsvpStatus === 'maybe' ? 'default' : 'outline'}
                  onClick={() => handleRsvp('maybe')}
                  className={`flex-1 ${
                    rsvpStatus === 'maybe' 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                      : 'hover:bg-yellow-500/10 hover:text-yellow-600 hover:border-yellow-200'
                  }`}
                >
                  Maybe {rsvpCounts.maybe > 0 && `(${rsvpCounts.maybe})`}
                </Button>
                
                <Button
                  size="sm"
                  variant={rsvpStatus === 'not-going' ? 'default' : 'outline'}
                  onClick={() => handleRsvp('not-going')}
                  className={`flex-1 ${
                    rsvpStatus === 'not-going' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'hover:bg-red-500/10 hover:text-red-600 hover:border-red-200'
                  }`}
                >
                  Can't Go {rsvpCounts.notGoing > 0 && `(${rsvpCounts.notGoing})`}
                </Button>
              </div>
              
              {/* RSVP Summary */}
              {(rsvpCounts.going > 0 || rsvpCounts.maybe > 0 || rsvpCounts.notGoing > 0) && (
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  {rsvpCounts.going > 0 && <span>{rsvpCounts.going} going</span>}
                  {rsvpCounts.maybe > 0 && <span>{rsvpCounts.maybe} maybe</span>}
                  {rsvpCounts.notGoing > 0 && <span>{rsvpCounts.notGoing} can't go</span>}
                </div>
              )}
            </div>
          </div>
        )}
        
        {post.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt="Post image"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              unoptimized={!post.imageUrl.includes('cloudinary.com')}
              onError={(e) => {
                console.error('Image failed to load:', post.imageUrl);
                // Hide the image container on error
                const target = e.target as HTMLImageElement;
                if (target.parentElement) {
                  target.parentElement.style.display = 'none';
                }
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', post.imageUrl);
              }}
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          {likesCount > 0 && (
            <button
              onClick={() => setShowLikeList(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            </button>
          )}
          {post.commentsCount > 0 && (
            <span>{post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}</span>
          )}
          {post.sharesCount > 0 && (
            <span>{post.sharesCount} {post.sharesCount === 1 ? 'share' : 'shares'}</span>
          )}
        </div>
      </div>

      {/* Comments Display */}
      {post.commentsCount > 0 && (
        <div className="mb-4">
          {/* Show the most recent comment if available */}
          {post.comments && post.comments.length > 0 && (
            <div className="flex items-start space-x-3 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage 
                  src={post.comments[0].author.profileImage || undefined} 
                  alt={post.comments[0].author.fullName}
                  className={post.comments[0].author.profileImage ? '' : 'hidden'}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {post.comments[0].author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted/50 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-foreground">
                      {post.comments[0].author.fullName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.comments[0].createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{post.comments[0].content}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* View all comments button */}
          <button
            onClick={() => setShowCommentsModal(true)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors ml-9"
          >
            View all {post.commentsCount} comments
          </button>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-2 ${
            isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>Like</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Comment</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowShareDialog(true)}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <CommentSection
            postId={post.id}
            currentUserId={currentUserId}
            currentUserRole={currentUserRole}
            onComment={onComment}
          />
        </div>
      )}

      {/* Share Dialog */}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        onShare={handleShare}
        post={post}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md mx-4 shadow-2xl">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Delete Post</h3>
            </div>
            
            {/* Message */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Are you sure you want to delete this post? This action cannot be undone and will permanently remove the post along with all its comments and likes.
            </p>
            
            {/* Actions */}
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Post
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Like List Modal */}
      <LikeListModal
        isOpen={showLikeList}
        onClose={() => setShowLikeList(false)}
        likes={post.likes || []}
        postContent={post.content}
      />

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        post={post}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
        onComment={onComment}
      />
    </div>
  );
}

