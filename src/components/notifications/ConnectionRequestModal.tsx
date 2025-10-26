"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  UserCheck, 
  UserX, 
  MessageCircle, 
  Building, 
  MapPin,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface ConnectionRequestData {
  connectionId: string;
  senderId: string;
  senderName: string;
  senderProfileImage?: string;
  senderHeadline?: string;
  senderRole: string;
  senderCompany?: string;
  message?: string;
}

interface ConnectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    title: string;
    message: string;
    data?: string;
    createdAt: string;
  };
  onAccept?: (connectionId: string) => void;
  onDecline?: (connectionId: string) => void;
  onMessage?: (userId: string) => void;
}

export function ConnectionRequestModal({
  isOpen,
  onClose,
  notification,
  onAccept,
  onDecline,
  onMessage
}: ConnectionRequestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const data: ConnectionRequestData = notification.data 
    ? JSON.parse(notification.data) 
    : null;

  if (!data) return null;

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/connections/${data.connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' })
      });

      if (response.ok) {
        toast.success('Connection request accepted!');
        onAccept?.(data.connectionId);
        onClose();
      } else {
        throw new Error('Failed to accept connection');
      }
    } catch (error) {
      console.error('Error accepting connection:', error);
      toast.error('Failed to accept connection request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/connections/${data.connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' })
      });

      if (response.ok) {
        toast.success('Connection request declined');
        onDecline?.(data.connectionId);
        onClose();
      } else {
        throw new Error('Failed to decline connection');
      }
    } catch (error) {
      console.error('Error declining connection:', error);
      toast.error('Failed to decline connection request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = () => {
    onMessage?.(data.senderId);
    onClose();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-blue-500" />
            <span>Connection Request</span>
          </DialogTitle>
          <DialogDescription>
            Someone wants to connect with you on ConnectFlow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sender Profile */}
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={data.senderProfileImage} alt={data.senderName} />
              <AvatarFallback>
                {data.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-foreground">
                  {data.senderName}
                </h3>
                <Badge 
                  variant={data.senderRole === 'recruiter' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {data.senderRole === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                </Badge>
              </div>

              {data.senderHeadline && (
                <p className="text-sm text-muted-foreground mb-2">
                  {data.senderHeadline}
                </p>
              )}

              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {data.senderCompany && (
                  <>
                    <Building className="h-3 w-3" />
                    <span>{data.senderCompany}</span>
                    <span>•</span>
                  </>
                )}
                <Clock className="h-3 w-3" />
                <span>{formatTime(notification.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {data.message && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-medium">Message:</span> {data.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Accept
            </Button>
            
            <Button
              onClick={handleDecline}
              disabled={isLoading}
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            >
              <UserX className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex space-x-2">
            {onMessage && (
              <Button
                onClick={handleMessage}
                variant="outline"
                className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            )}
            
            <Button
              onClick={() => window.location.href = `/profile/${data.senderId}`}
              variant="outline"
              className="flex-1"
            >
              View Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

