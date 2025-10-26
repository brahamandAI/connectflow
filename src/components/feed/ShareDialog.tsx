"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
  };
}

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (content?: string) => void;
  post: Post;
}

export function ShareDialog({ isOpen, onClose, onShare, post }: ShareDialogProps) {
  const [shareContent, setShareContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(shareContent.trim() || undefined);
    setShareContent("");
  };

  const handleClose = () => {
    setShareContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Share Post</h3>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={shareContent}
                onChange={(e) => setShareContent(e.target.value)}
                placeholder="Add a comment (optional)..."
                className="w-full px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
              />
            </div>

            {/* Original Post Preview */}
            <div className="border border-border rounded-lg p-3 mb-4 bg-muted">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.profileImage} alt={post.author.fullName} />
                  <AvatarFallback>
                    {post.author.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">
                      {post.author.fullName}
                    </span>
                    {post.author.companyName && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.author.companyName}</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground line-clamp-3">
                    {post.content.length > 150 
                      ? `${post.content.substring(0, 150)}...` 
                      : post.content
                    }
                  </p>
                  
                  {post.imageUrl && (
                    <div className="mt-2 rounded overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt="Post preview"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Share
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

