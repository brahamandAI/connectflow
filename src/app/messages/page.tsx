"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Users, 
  Loader2,
  ArrowLeft
} from "lucide-react";

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
  lastMessage: any;
  lastMessageAt: string;
  unreadCount: number;
  createdAt: string;
}

function MessagesContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const targetUserId = searchParams.get('user');

  useEffect(() => {
    if (targetUserId && session?.user) {
      startConversationWithUser(targetUserId);
    }
  }, [targetUserId, session]);

  const startConversationWithUser = async (userId: string) => {
    try {
      setLoading(true);
      console.log('Starting conversation with user:', userId);
      
      // First check if conversation already exists
      const existingResponse = await fetch('/api/messages/conversations');
      if (existingResponse.ok) {
        const existingData = await existingResponse.json();
        const existingConversation = existingData.conversations?.find((conv: any) => 
          conv.participants.some((p: any) => p.id === userId)
        );
        
        if (existingConversation && existingConversation.participants && existingConversation.participants.length > 0) {
          console.log('Found existing conversation:', existingConversation.id);
          setSelectedConversation(existingConversation);
          setShowMobileChat(true);
          setLoading(false);
          return;
        }
      }
      
      // Create new conversation
      const response = await fetch('/api/messages/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          participantId: userId,
          initialMessage: "Hello! I'd like to connect with you."
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Created new conversation:', data.conversation.id);
        
        // Ensure participant data is properly loaded
        if (data.conversation && data.conversation.participants && data.conversation.participants.length > 0) {
          setSelectedConversation(data.conversation);
          setShowMobileChat(true);
        } else {
          console.error('Conversation created but participant data is missing');
          throw new Error('Failed to load conversation participant data');
        }
      } else {
        const errorData: any = await response.json();
        console.error('Failed to start conversation:', errorData);
        throw new Error(errorData?.error || 'Failed to start conversation');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowMobileChat(true);
  };

  const handleMessageSent = () => {
    // Trigger refresh of conversation list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleStartNewChat = () => {
    // Navigate to network page to find people to message
    window.location.href = '/network';
  };

  const handleStartConversationWithUser = (userId: string) => {
    startConversationWithUser(userId);
  };

  const handleBack = () => {
    setShowMobileChat(false);
    setSelectedConversation(null);
  };

  const handleStartCall = (participantId: string) => {
    // Implement call functionality
    console.log('Start call with:', participantId);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view messages</h2>
          <Button asChild>
            <a href="/auth/jobseeker/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Starting conversation...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background pt-20">
      <div className="h-full w-full max-w-full">
        <div className="bg-card border-t border-border overflow-hidden h-full w-full">
          <div className="flex h-full w-full">
            {/* Desktop: Show both panels */}
            <div className="hidden lg:flex lg:w-[400px] xl:w-[450px] border-r border-border flex-shrink-0">
              <ConversationList
                onSelectConversation={handleSelectConversation}
                selectedConversationId={selectedConversation?.id}
                onStartNewChat={handleStartNewChat}
                onStartConversationWithUser={handleStartConversationWithUser}
                refreshTrigger={refreshTrigger}
              />
            </div>

            {/* Desktop: Chat area */}
            <div className="hidden lg:flex flex-1 bg-muted/30 w-full max-w-full">
              {selectedConversation ? (
                <ChatWindow
                  conversationId={selectedConversation.id}
                  participants={selectedConversation.participants}
                  onStartCall={handleStartCall}
                  onMessageSent={handleMessageSent}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <div className="text-center px-4">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Welcome to Messages
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Select a conversation from the list or start a new chat to connect with your professional network
                    </p>
                    <Button onClick={handleStartNewChat} size="lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start New Conversation
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile: Show conversation list or chat */}
            <div className="lg:hidden flex-1 w-full">
              {!showMobileChat ? (
                <ConversationList
                  onSelectConversation={handleSelectConversation}
                  selectedConversationId={selectedConversation?.id}
                  onStartNewChat={handleStartNewChat}
                  onStartConversationWithUser={handleStartConversationWithUser}
                  refreshTrigger={refreshTrigger}
                />
              ) : selectedConversation ? (
                <ChatWindow
                  conversationId={selectedConversation.id}
                  participants={selectedConversation.participants}
                  onBack={handleBack}
                  onStartCall={handleStartCall}
                  onMessageSent={handleMessageSent}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}


