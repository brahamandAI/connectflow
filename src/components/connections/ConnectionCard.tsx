"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, 
  UserX, 
  MessageCircle, 
  Building, 
  MapPin, 
  MoreHorizontal,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface Connection {
  id: string;
  status: string;
  message?: string;
  createdAt: string;
  acceptedAt?: string;
  otherUser: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
    location?: string;
  };
  isInitiator: boolean;
}

interface ConnectionCardProps {
  connection: Connection;
  onStatusChange?: (connectionId: string, newStatus: string) => void;
  onRemove?: (connectionId: string) => void;
  onMessage?: (userId: string) => void;
  showActions?: boolean;
}

export function ConnectionCard({ 
  connection, 
  onStatusChange, 
  onRemove, 
  onMessage,
  showActions = true 
}: ConnectionCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    if (!onStatusChange) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/connections/${connection.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' })
      });

      if (response.ok) {
        onStatusChange(connection.id, 'accepted');
        toast.success('Connection accepted!');
      } else {
        throw new Error('Failed to accept connection');
      }
    } catch (error) {
      console.error('Error accepting connection:', error);
      toast.error('Failed to accept connection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    if (!onStatusChange) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/connections/${connection.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' })
      });

      if (response.ok) {
        onStatusChange(connection.id, 'declined');
        toast.success('Connection declined');
      } else {
        throw new Error('Failed to decline connection');
      }
    } catch (error) {
      console.error('Error declining connection:', error);
      toast.error('Failed to decline connection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/connections/${connection.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onRemove(connection.id);
        toast.success('Connection removed');
      } else {
        throw new Error('Failed to remove connection');
      }
    } catch (error) {
      console.error('Error removing connection:', error);
      toast.error('Failed to remove connection');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (connection.status) {
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            <UserCheck className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'declined':
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            <UserX className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  const getActionButtons = () => {
    if (connection.status === 'pending' && !connection.isInitiator) {
      return (
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={handleAccept}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <UserCheck className="h-4 w-4 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecline}
            disabled={isLoading}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <UserX className="h-4 w-4 mr-1" />
            Decline
          </Button>
        </div>
      );
    }

    if (connection.status === 'accepted') {
      return (
        <div className="flex space-x-2">
          {onMessage && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMessage(connection.otherUser.id)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={handleRemove}
            disabled={isLoading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <UserX className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      );
    }

    if (connection.status === 'pending' && connection.isInitiator) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Waiting for response</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRemove}
            disabled={isLoading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div 
      className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300 transform-gpu"
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={connection.otherUser.profileImage} alt={connection.otherUser.fullName} />
          <AvatarFallback>
            {connection.otherUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                {connection.otherUser.fullName}
              </h3>
              
              {connection.otherUser.headline && (
                <p className="text-sm text-muted-foreground mt-1">
                  {connection.otherUser.headline}
                </p>
              )}

              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                {connection.otherUser.companyName && (
                  <>
                    <Building className="h-3 w-3" />
                    <span>{connection.otherUser.companyName}</span>
                    <span>•</span>
                  </>
                )}
                {connection.otherUser.location && (
                  <>
                    <MapPin className="h-3 w-3" />
                    <span>{connection.otherUser.location}</span>
                  </>
                )}
              </div>

              {connection.message && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  "{connection.message}"
                </p>
              )}

              <div className="flex items-center space-x-2 mt-2">
                {getStatusBadge()}
                <span className="text-xs text-muted-foreground">
                  {connection.isInitiator ? 'Sent' : 'Received'} {new Date(connection.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {showActions && (
              <div className="flex-shrink-0 ml-4">
                {getActionButtons()}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


