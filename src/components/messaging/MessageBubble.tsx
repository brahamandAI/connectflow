"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Check, 
  CheckCheck, 
  Download,
  Image as ImageIcon,
  FileText,
  X,
  ZoomIn,
  Pencil,
  Trash2
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

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  onDownload?: (messageId: string) => void;
  onEdit?: (messageId: string, currentContent: string) => void;
  onDelete?: (messageId: string) => void;
}

export function MessageBubble({ 
  message, 
  isOwn, 
  showAvatar = true,
  onDownload,
  onEdit,
  onDelete
}: MessageBubbleProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageIcon = () => {
    switch (message.messageType) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'file':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getReadStatus = () => {
    if (!isOwn) return null;
    
    if (message.isRead) {
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    } else {
      return <Check className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(message.id);
    }
  };

  const handleEdit = () => {
    if (onEdit && message.messageType === 'text') {
      onEdit(message.id, message.content);
      setShowMenu(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      if (confirm('Are you sure you want to delete this message?')) {
        onDelete(message.id);
        setShowMenu(false);
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      {/* Image Full Screen Modal */}
      {showImageModal && message.messageType === 'image' && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowImageModal(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={message.content}
              alt="Full size image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {onDownload && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}>
        <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
          
          {/* Three dots menu - Only for own messages, positioned to the left */}
          {isOwn && (
            <div className={`opacity-100 transition-opacity duration-200 ${isOwn ? 'order-2' : 'order-1'}`}>
              <div className="relative" ref={menuRef}>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background/90 hover:bg-background"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                
                {showMenu && (
                  <div className={`absolute ${isOwn ? 'right-0' : 'left-0'} top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[140px] z-10`}>
                    {message.messageType === 'text' && onEdit && (
                      <button
                        onClick={handleEdit}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center space-x-2"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Edit message</span>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={handleDelete}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center space-x-2 text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        {showAvatar && !isOwn && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={message.sender.profileImage} alt={message.sender.fullName} />
            <AvatarFallback>
              {message.sender.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        )}

        <div className={`relative group ${isOwn ? 'ml-2' : 'mr-2'} ${isOwn ? 'order-1' : 'order-2'}`}>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isOwn
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            } ${
              message.messageType === 'image' || message.messageType === 'file'
                ? 'p-2'
                : ''
            }`}
          >
            {message.messageType === 'text' ? (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            ) : message.messageType === 'image' ? (
              <div className="space-y-2">
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={message.content}
                    alt="Shared image"
                    className="max-w-md w-full rounded-lg hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>
                {onDownload && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                    className="w-full"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            ) : message.messageType === 'file' ? (
              <div className="flex items-center space-x-2">
                {getMessageIcon()}
                <span className="text-sm">{message.content}</span>
                {onDownload && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm">{message.content}</p>
            )}
          </div>

          <div className={`flex items-center space-x-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-muted-foreground">
              {formatTime(message.createdAt)}
            </span>
            {getReadStatus()}
          </div>

        </div>

        {showAvatar && isOwn && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={message.sender.profileImage} alt={message.sender.fullName} />
            <AvatarFallback>
              {message.sender.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
    </>
  );
}


