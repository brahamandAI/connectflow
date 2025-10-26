"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Building, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  id: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  role: string;
  companyName?: string;
  location?: string;
  mutualConnections?: number;
  skills?: string[];
  industry?: string;
}

interface SuggestedPeopleProps {
  currentUserId: string;
  currentUserRole?: string;
}

export function SuggestedPeople({ currentUserId, currentUserRole }: SuggestedPeopleProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSuggestedPeople();
  }, [currentUserId]);

  const fetchSuggestedPeople = async () => {
    try {
      // Fetch connection suggestions from the API
      const response = await fetch('/api/connections/suggestions?limit=5');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggested people:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent profile navigation when clicking connect
    setConnecting(prev => new Set(prev).add(userId));
    
    try {
      const response = await fetch('/api/connections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: userId,
          message: "I'd like to connect with you on ConnectFlow!"
        }),
      });

      if (response.ok) {
        // Remove from suggested list or update status
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        throw new Error('Connection request failed');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setConnecting(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleMessage = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/messages?user=${userId}`;
  };

  const handleProfileClick = (userId: string) => {
    // If it's the current user, redirect to their dashboard profile
    if (userId === currentUserId) {
      // Determine the role to redirect to the correct profile page
      if (currentUserRole === 'recruiter') {
        router.push('/dashboard/recruiter/profile');
      } else {
        router.push('/dashboard/job-seeker/profile');
      }
    } else {
      // For other users, use the dynamic profile page
      router.push(`/profile/${userId}`);
    }
  };

  if (loading) {
    return (
      <Card className="bg-card rounded-lg border border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">People you may know</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-14 w-14 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <div className="h-8 w-20 bg-muted rounded"></div>
                    <div className="h-8 w-16 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card rounded-lg border border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">People you may know</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View all
          </Button>
        </div>

        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">No suggestions available</p>
            </div>
          ) : (
            users.map((user) => (
              <Card 
                key={user.id} 
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-border/50 hover:border-primary/20"
                onClick={() => handleProfileClick(user.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-14 w-14 ring-2 ring-background shadow-sm">
                        <AvatarImage src={user.profileImage} alt={user.fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-base hover:text-primary transition-colors">
                            {user.fullName}
                          </h4>
                          
                          {user.headline && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {user.headline}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                            {user.companyName && (
                              <>
                                <Building className="h-4 w-4" />
                                <span>{user.companyName}</span>
                                {user.location && <span>•</span>}
                              </>
                            )}
                            {user.location && (
                              <>
                                <MapPin className="h-4 w-4" />
                                <span>{user.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={(e) => handleConnect(user.id, e)}
                          disabled={connecting.has(user.id)}
                          className="flex-1"
                        >
                          {connecting.has(user.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleMessage(user.id, e)}
                          className="px-3"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/30"
            onClick={() => window.location.href = '/network'}
          >
            <Users className="h-4 w-4 mr-2" />
            View all connections
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

