"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/feed/PostCard";
import { 
  Plus,
  Filter,
  Grid3X3,
  List,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal
} from "lucide-react";

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  postType: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByUser: boolean;
  likes?: any[];
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

interface UserPostsProps {
  userId: string;
  currentUserId?: string;
  currentUserRole?: string;
  isOwnProfile?: boolean;
}

export function UserPosts({ userId, currentUserId = '', currentUserRole = 'jobseeker', isOwnProfile = false }: UserPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh posts to get updated like data
        fetchUserPosts();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId: string, content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      });

      if (response.ok) {
        // Refresh posts to get updated comment data
        fetchUserPosts();
      }
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleShare = async (postId: string, content?: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sharedContent: content,
        }),
      });

      if (response.ok) {
        // Refresh posts to get updated share data
        fetchUserPosts();
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(prev => prev.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Posts ({posts.length})</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isOwnProfile ? "No posts yet" : "No posts to show"}
            </h3>
            <p className="text-muted-foreground">
              {isOwnProfile 
                ? "Start sharing your thoughts and experiences!" 
                : "This user hasn't shared any posts yet."
              }
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUserId}
                currentUserRole={currentUserRole}
                onLike={() => handleLike(post.id)}
                onComment={(content) => handleComment(post.id, content)}
                onShare={(content) => handleShare(post.id, content)}
                onDelete={isOwnProfile ? (postId) => handleDelete(postId) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
