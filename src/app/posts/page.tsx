"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostCard } from "@/components/feed/PostCard";
import { CreatePost } from "@/components/feed/CreatePost";
import { SuggestedJobs } from "@/components/feed/SuggestedJobs";
import { SuggestedPeople } from "@/components/feed/SuggestedPeople";
import { UserSidebar } from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { Loader2, Menu, X } from "lucide-react";
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
  comments?: Comment[];
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

interface User {
  id: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  role: string;
  companyName?: string;
}

export default function PostsPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileRightSidebar, setShowMobileRightSidebar] = useState(false);

  useEffect(() => {
    // Get current user from session/auth
    if (session?.user) {
      const user = session.user as any;
      
      // First set basic user data from session
      const basicUserData = {
        id: user.id || "user123",
        fullName: user.name || user.email?.split('@')[0] || "User",
        headline: user.headline || `${user.role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}`,
        role: user.role || "jobseeker",
        companyName: user.companyName || (user.role === 'recruiter' ? 'Company' : undefined),
        profileImage: user.profileImage || undefined
      };
      setCurrentUser(basicUserData);
      
      // Fetch complete user profile data from API
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          if (response.ok) {
            const profileData = await response.json();
            const completeUserData = {
              id: profileData.id,
              fullName: profileData.fullName,
              headline: profileData.headline,
              role: profileData.role,
              companyName: profileData.companyName,
              profileImage: profileData.profileImage
            };
            console.log('Setting complete user profile:', completeUserData);
            setCurrentUser(completeUserData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Keep using basic user data from session
        }
      };
      
      fetchUserProfile();
    } else {
      // Fallback to mock user for demo purposes
      const fallbackUser = {
        id: "user123",
        fullName: "Demo User",
        headline: "Software Engineer",
        role: "jobseeker",
        companyName: "Tech Corp"
      };
      console.log('Using fallback user:', fallbackUser);
      setCurrentUser(fallbackUser);
    }
    
    fetchPosts();
  }, [session]);

  const fetchPosts = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${pageNum}&limit=10`);
      const data = await response.json();
      
      if (append) {
        setPosts(prev => [...prev, ...data.posts]);
      } else {
        setPosts(data.posts || []);
      }
      
      setHasMore(data.pagination?.hasNext || false);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      fetchPosts(page + 1, true);
    }
  };

  const handlePostCreated = (newPost?: Post) => {
    console.log('handlePostCreated called with:', newPost);
    if (newPost) {
      // Add the new post to the beginning of the posts array
      setPosts(prev => {
        console.log('Adding new post to beginning of posts array');
        return [newPost, ...prev];
      });
      toast.success('Post created successfully!');
    } else {
      // Fallback: refresh posts if no new post data
      console.log('No new post data, refreshing posts');
      fetchPosts(1, false);
      toast.success('Post created successfully!');
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) {
      toast.error('Please log in to like posts');
      return;
    }

    // The PostCard component handles the API call and optimistic updates
    // We just need to update our local state to reflect the change
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLikedByUser: !post.isLikedByUser,
            likesCount: post.isLikedByUser ? post.likesCount - 1 : post.likesCount + 1
          }
        : post
    ));
  };

  const handleComment = async (postId: string, content: string) => {
    if (!currentUser) {
      toast.error('Please log in to comment');
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content,
          authorId: currentUser.id,
          authorRole: currentUser.role,
        }),
      });

      if (response.ok) {
        // Optimistically update the UI
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, commentsCount: post.commentsCount + 1 }
            : post
        ));
        toast.success('Comment added successfully!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleShare = async (postId: string, shareContent?: string) => {
    if (!currentUser) {
      toast.error('Please log in to share posts');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.id,
          userRole: currentUser.role,
          sharedContent: shareContent,
        }),
      });

      if (response.ok) {
        // Optimistically update the UI
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, sharesCount: post.sharesCount + 1 }
            : post
        ));
        toast.success('Post shared successfully!');
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      toast.error('Failed to share post');
    }
  };

  const handleDelete = async (postId: string) => {
    console.log('🗑️ Removing post from feed:', postId);
    
    // Remove the post from the UI immediately (optimistic update)
    setPosts(prev => prev.filter(post => post.id !== postId));
    
    // Show success message (the actual deletion is handled by PostCard)
    toast.success('Post removed from feed');
  };

  if (status === 'loading') {
    return (
      <div className="bg-background flex items-center justify-center py-24">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="bg-background flex items-center justify-center py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view posts</h2>
          <Button asChild>
            <a href="/auth/jobseeker/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Menu Buttons */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="bg-background/80 backdrop-blur-sm"
          title="Profile"
        >
          {showMobileSidebar ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileRightSidebar(!showMobileRightSidebar)}
          className="bg-background/80 backdrop-blur-sm"
          title="Jobs & People"
        >
          {showMobileRightSidebar ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Left Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-background p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground">
            <div className="pt-8">
              <UserSidebar 
                onClose={() => setShowMobileSidebar(false)} 
                userProfile={currentUser}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Right Sidebar Overlay */}
      {showMobileRightSidebar && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileRightSidebar(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-background">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Discover</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileRightSidebar(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground">
                {/* Suggested Jobs */}
                <SuggestedJobs currentUserId={currentUser?.id || ''} />

                {/* Suggested People */}
                <SuggestedPeople currentUserId={currentUser?.id || ''} />

                {/* Trending Topics */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h3>
                  <div className="space-y-2">
                    {['#RemoteWork', '#TechJobs', '#CareerGrowth', '#JobSearch', '#Networking'].map((topic) => (
                      <div key={topic} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{topic}</span>
                        <span className="text-xs text-muted-foreground">Trending</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Left Sidebar - Desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="sticky top-24">
              <UserSidebar userProfile={currentUser} />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-2xl lg:max-w-none space-y-6">
            {/* Create Post */}
            <CreatePost
              currentUser={currentUser}
              onPostCreated={handlePostCreated}
            />

            {/* Posts Feed */}
            <div className="space-y-6">
              {loading && posts.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading posts...</span>
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">Be the first to share something!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUser?.id || ''}
                    currentUserRole={currentUser?.role || 'jobseeker'}
                    onLike={() => handleLike(post.id)}
                    onComment={(content) => handleComment(post.id, content)}
                    onShare={(content) => handleShare(post.id, content)}
                    onDelete={handleDelete}
                  />
                ))
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={loadMorePosts}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More Posts'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Show on large screens and up */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground">
              {/* Suggested Jobs */}
              <SuggestedJobs currentUserId={currentUser.id} />

              {/* Suggested People */}
              <SuggestedPeople currentUserId={currentUser.id} currentUserRole={currentUser.role} />

              {/* Trending Topics */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {['#RemoteWork', '#TechJobs', '#CareerGrowth', '#JobSearch', '#Networking'].map((topic) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{topic}</span>
                      <span className="text-xs text-muted-foreground">Trending</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


