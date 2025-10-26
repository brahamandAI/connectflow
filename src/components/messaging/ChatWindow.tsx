"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, MoreVertical, Phone, Video, X } from "lucide-react";

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

interface ChatWindowProps {
  conversationId: string;
  participants: Participant[];
  onBack?: () => void;
  onStartCall?: (participantId: string) => void;
  onMessageSent?: () => void;
}

export function ChatWindow({ 
  conversationId, 
  participants, 
  onBack,
  onStartCall,
  onMessageSent
}: ChatWindowProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const currentUserId = (session?.user as any)?.id;
  
  // Find the other participant (not the current user)
  const otherParticipant = participants?.find(p => p.id !== currentUserId);

  // Add safety check for otherParticipant
  if (!otherParticipant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Loading conversation...
          </h3>
          <p className="text-muted-foreground">
            Please wait while we load the conversation details.
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages/conversations/${conversationId}?page=${pageNum}&limit=50`);
      const data = await response.json();
      
      if (response.ok) {
        if (append) {
          setMessages(prev => [...data.messages, ...prev]);
        } else {
          setMessages(data.messages || []);
        }
        setHasMore(data.pagination?.hasNext || false);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      fetchMessages(page + 1, true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, messageType = 'text') => {
    if (!content.trim()) return false;

    setSending(true);
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, messageType })
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages(prev => [...prev, newMessage]);
        // Trigger conversation list refresh
        if (onMessageSent) {
          onMessageSent();
        }
        return true;
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to send message:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData?.error
        });
        alert(`Failed to send message: ${errorData?.error || response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please check your connection and try again.');
      return false;
    } finally {
      setSending(false);
    }
  };

  const handleSendFile = async (file: File) => {
    // For now, we'll just send the file name as text
    // In a real implementation, you'd upload the file first
    await handleSendMessage(`📎 ${file.name}`, 'file');
  };

  const handleDownload = (messageId: string) => {
    // Implement file download logic
    console.log('Download message:', messageId);
  };

  const handleEditMessage = (messageId: string, currentContent: string) => {
    setEditingMessageId(messageId);
    setEditingContent(currentContent);
  };

  const handleSaveEdit = async () => {
    if (!editingMessageId || !editingContent.trim()) return;

    try {
      const response = await fetch(`/api/messages/${editingMessageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent })
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages(prev => prev.map(msg => 
          msg.id === editingMessageId 
            ? { ...msg, content: updatedMessage.content }
            : msg
        ));
        setEditingMessageId(null);
        setEditingContent("");
      } else {
        alert('Failed to edit message');
      }
    } catch (error) {
      console.error('Error editing message:', error);
      alert('Failed to edit message. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        if (onMessageSent) {
          onMessageSent();
        }
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again.');
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background w-full">
      {/* Header - WhatsApp style */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card w-full">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              <span className="text-sm">
                {otherParticipant.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-[15px]">
                {otherParticipant.fullName || 'Unknown User'}
              </h3>
              {otherParticipant.headline && (
                <p className="text-xs text-muted-foreground">
                  {otherParticipant.headline}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onStartCall && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStartCall(otherParticipant.id)}
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStartCall(otherParticipant.id)}
              >
                <Video className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20 w-full"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="%23000000" fill-opacity="0.02"/%3E%3C/svg%3E")'
        }}
      >
        {hasMore && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={loadMoreMessages}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Load more messages
            </Button>
          </div>
        )}

        {messages.map((message, index) => {
          const isOwn = message.sender.id === currentUserId;
          const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={isOwn}
              showAvatar={showAvatar}
              onDownload={handleDownload}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
            />
          );
        })}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Edit Message Bar */}
      {editingMessageId && (
        <div className="px-4 py-3 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Edit message</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelEdit}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSaveEdit();
                }
              }}
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Edit your message..."
            />
            <Button onClick={handleSaveEdit} size="sm" disabled={!editingContent.trim()}>
              Save
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        disabled={sending || !!editingMessageId}
        placeholder={`Message ${otherParticipant.fullName || 'user'}...`}
      />
    </div>
  );
}


