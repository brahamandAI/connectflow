"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  Loader2,
  Users,
  Clock,
  UserPlus,
  Building,
  MapPin,
  Briefcase,
  RefreshCw
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  messageType: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  sender: {
    id: string;
    fullName: string;
    profileImage?: string;
    role: string;
  };
}

interface Participant {
  id: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  role: string;
  companyName?: string;
}

interface Conversation {
  id: string;
  participants: Participant[];
  lastMessage: Message | null;
  lastMessageAt: string;
  unreadCount: number;
  createdAt: string;
}

interface SearchUser {
  id: string;
  fullName: string;
  profileImage?: string;
  headline?: string;
  role: string;
  companyName?: string;
  location?: string;
  skills?: string[];
  industry?: string;
  type: string;
}

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
  onStartNewChat?: () => void;
  onStartConversationWithUser?: (userId: string) => void;
  refreshTrigger?: number;
}

export function ConversationList({ 
  onSelectConversation, 
  selectedConversationId,
  onStartNewChat,
  onStartConversationWithUser,
  refreshTrigger
}: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchConversations(true); // Show loading on initial load
  }, []);

  // Refresh conversations when a message is sent/received
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchConversations(false); // Don't show loading spinner
    }
  }, [refreshTrigger]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchUsersDebounced(searchQuery);
    } else {
      setSearchUsers([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const fetchConversations = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      
      const response = await fetch('/api/messages/conversations', {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch (error) {
      // Only log error if it's an initial load (when we're showing loading)
      if (showLoading) {
        console.error('Error fetching conversations:', error);
      }
      // Silently fail on background refreshes to avoid console spam
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const searchUsersDebounced = (() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => performUserSearch(query), 300);
    };
  })();

  const performUserSearch = async (query: string) => {
    if (!query.trim()) return;
    
    try {
      setSearchLoading(true);
      const response = await fetch(`/api/messages/search-users?q=${encodeURIComponent(query)}&limit=10`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchUsers(data.users || []);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleStartConversation = (userId: string) => {
    if (onStartConversationWithUser) {
      onStartConversationWithUser(userId);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getLastMessagePreview = (message: Message | null) => {
    if (!message) return "No messages yet";
    
    if (message.messageType === 'image') {
      return "📷 Image";
    } else if (message.messageType === 'file') {
      return "📎 File";
    } else {
      return message.content.length > 50 
        ? `${message.content.substring(0, 50)}...`
        : message.content;
    }
  };

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    const participant = conversation.participants?.[0];
    if (!participant) return false;
    
    return participant.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           participant.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           participant.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading conversations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card w-full">
      {/* Header - WhatsApp style */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-foreground">Chats</h2>
          <div className="flex items-center gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => fetchConversations(false)} 
              className="h-9 w-9 p-0"
              title="Refresh conversations"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            {onStartNewChat && (
              <Button size="sm" variant="ghost" onClick={onStartNewChat} className="h-9 w-9 p-0">
                <MessageCircle className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Search Results or Conversations List */}
      <div className="flex-1 overflow-y-auto bg-card">
        {showSearchResults ? (
          <div className="space-y-1">
            <div className="p-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-medium text-foreground">Search Results</h3>
            </div>
            {searchLoading ? (
              <div className="flex items-center justify-center p-6">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Searching...</span>
                </div>
              </div>
            ) : searchUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Search className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No users found</p>
              </div>
            ) : (
              searchUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleStartConversation(user.id)}
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profileImage} alt={user.fullName} />
                      <AvatarFallback>
                        {user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          {user.fullName}
                        </h3>
                        <Badge 
                          variant={user.role === 'recruiter' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {user.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                        </Badge>
                      </div>
                      
                      {user.headline && (
                        <p className="text-sm text-muted-foreground mb-1">
                          {user.headline}
                        </p>
                      )}

                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-1">
                        {user.companyName && (
                          <>
                            <Building className="h-3 w-3" />
                            <span>{user.companyName}</span>
                            <span>•</span>
                          </>
                        )}
                        {user.location && (
                          <>
                            <MapPin className="h-3 w-3" />
                            <span>{user.location}</span>
                          </>
                        )}
                      </div>

                      {user.industry && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          <span>{user.industry}</span>
                        </div>
                      )}

                      {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {user.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartConversation(user.id);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start a conversation with someone in your network'
              }
            </p>
            {!searchQuery && onStartNewChat && (
              <Button onClick={onStartNewChat}>
                Start a Conversation
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => {
              const participant = conversation.participants?.[0];
              const isSelected = selectedConversationId === conversation.id;
              
              // Skip conversations without participants
              if (!participant) {
                console.warn('Conversation without participant:', conversation.id);
                return null;
              }
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={`p-3 cursor-pointer hover:bg-muted/70 transition-colors border-b border-border/50 ${
                    isSelected ? 'bg-muted/80' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={participant.profileImage} alt={participant.fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {participant.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-0.5">
                        <h3 className="font-semibold text-foreground text-[15px] truncate pr-2">
                          {participant.fullName}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-[13px] truncate flex-1 ${
                          conversation.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'
                        }`}>
                          {getLastMessagePreview(conversation.lastMessage)}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge 
                            className="h-5 min-w-[20px] rounded-full px-1.5 flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                            variant="default"
                          >
                            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


