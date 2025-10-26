"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Heart } from "lucide-react";

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

interface LikeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: LikeUser[];
  postContent: string;
}

export function LikeListModal({ isOpen, onClose, likes, postContent }: LikeListModalProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'recruiter':
        return <Badge variant="secondary" className="text-xs">Recruiter</Badge>;
      case 'jobseeker':
        return <Badge variant="outline" className="text-xs">Job Seeker</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{role}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500 fill-current" />
            <span>Likes</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Post Preview */}
        <div className="border-b border-border pb-4 mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {postContent}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </p>
        </div>

        {/* Likes List */}
        <div className="max-h-96 overflow-y-auto space-y-3">
          {likes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No likes yet</p>
              <p className="text-xs">Be the first to like this post!</p>
            </div>
          ) : (
            likes.map((like) => (
              <div key={like.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={like.user.profileImage || undefined} 
                    alt={like.user.fullName}
                    className={like.user.profileImage ? '' : 'hidden'}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {like.user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-sm truncate">
                      {like.user.fullName}
                    </p>
                    {getRoleBadge(like.userRole)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(like.createdAt)}
                  </p>
                </div>

                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-4 mt-4">
          <p className="text-xs text-center text-muted-foreground">
            {likes.length > 0 && (
              <>
                Showing {likes.length} {likes.length === 1 ? 'like' : 'likes'}
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
