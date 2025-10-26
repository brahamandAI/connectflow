"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { UserPosts } from "@/components/profile/UserPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserPlus, 
  MessageCircle, 
  MoreHorizontal,
  ArrowLeft,
  Loader2,
  Building,
  MapPin,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  fullName: string;
  headline?: string;
  role: string;
  location?: string;
  companyName?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface ConnectionStatus {
  status: 'none' | 'pending' | 'accepted' | 'declined';
  isCurrentUser: boolean;
}

export default function PublicProfilePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ status: 'none', isCurrentUser: false });
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${id}`);
      
      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
        
        // Check if this is the current user
        const isCurrentUser = Boolean(session?.user && (session.user as any).id === id);
        setConnectionStatus({ 
          status: isCurrentUser ? 'none' : 'none', 
          isCurrentUser 
        });
        
        // If not current user, check connection status
        if (!isCurrentUser) {
          checkConnectionStatus(id as string);
        }
      } else if (response.status === 404) {
        toast.error('User not found');
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const checkConnectionStatus = async (userId: string) => {
    try {
      const response = await fetch(`/api/connections/status?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setConnectionStatus(prev => ({ ...prev, status: data.status }));
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  };

  const handleConnect = async () => {
    if (!session?.user || !profile) return;
    
    setConnecting(true);
    try {
      const response = await fetch('/api/connections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: profile.id,
          currentUserId: (session.user as any).id,
        }),
      });

      if (response.ok) {
        setConnectionStatus(prev => ({ ...prev, status: 'pending' }));
        toast.success('Connection request sent!');
      } else {
        throw new Error('Connection request failed');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error('Failed to send connection request');
    } finally {
      setConnecting(false);
    }
  };

  const handleMessage = () => {
    // TODO: Implement messaging functionality
    toast.info('Messaging feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist or has been removed.</p>
          <Link href="/posts">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
          
          {!connectionStatus.isCurrentUser && (
            <div className="flex items-center space-x-3">
              {connectionStatus.status === 'none' && (
                <Button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {connecting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4 mr-2" />
                  )}
                  Connect
                </Button>
              )}
              
              {connectionStatus.status === 'pending' && (
                <Button variant="outline" disabled>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connection Sent
                </Button>
              )}
              
              {connectionStatus.status === 'accepted' && (
                <Button variant="outline" onClick={handleMessage}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
              
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header - Matching the main profile design */}
        <ProfileHeader
          user={profile}
          isOwnProfile={connectionStatus.isCurrentUser}
        />

        {/* Main Content Grid - Matching the main profile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileAbout 
              profile={profile} 
              isPublic={!connectionStatus.isCurrentUser}
              connectionStatus={connectionStatus.status}
            />
          </div>
          
          {/* Right Column - Posts */}
          <div className="lg:col-span-2">
            <UserPosts 
              userId={profile.id} 
              currentUserId={session?.user ? (session.user as any).id : ''}
              currentUserRole={session?.user ? (session.user as any).role : 'jobseeker'}
              isOwnProfile={connectionStatus.isCurrentUser}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
