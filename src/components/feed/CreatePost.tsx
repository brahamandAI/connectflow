"use client";

import { useState, useRef } from "react";
import { Image, Smile, MapPin, Calendar, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AICaptionGenerator } from "@/components/ai/AICaptionGenerator";
import { detectPostContext, getToneForContext } from "@/lib/ai-caption-utils";

interface CreatePostProps {
  currentUser: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
  };
  onPostCreated: (newPost?: any) => void;
}

export function CreatePost({ currentUser, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [postType, setPostType] = useState("general");
  const [isUploading, setIsUploading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [showAICaption, setShowAICaption] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{title: string, date: string, time: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Emoji functionality
  const handleEmojiClick = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Location functionality
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
    toast.success(`Location set to: ${location}`);
  };

  // Event functionality
  const handleEventCreate = (eventData: {title: string, date: string, time: string}) => {
    setSelectedEvent(eventData);
    setShowEventPicker(false);
    toast.success(`Event "${eventData.title}" added`);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to Cloudinary
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.secure_url);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl) {
      toast.error('Please add some content or an image');
      return;
    }

    setIsPosting(true);
    
    try {
      const postData = {
        content: content.trim(),
        imageUrl,
        postType: selectedEvent ? 'event' : postType,
        location: selectedLocation,
        event: selectedEvent,
      };
      
      console.log('Sending post data:', postData);
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created successfully:', data);
        setContent("");
        setImageUrl(null);
        setPostType("general");
        setSelectedLocation(null);
        setSelectedEvent(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        
          toast.success('Post created successfully');
        
        // Pass the new post data to parent component
        onPostCreated(data.post);
      } else {
        const errorData: any = await response.json();
        console.error('Failed to create post:', errorData);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        toast.error(errorData?.error || errorData?.details || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  const getPostTypeBadge = () => {
    switch (postType) {
      case 'job_update':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Job Update</Badge>;
      case 'announcement':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Announcement</Badge>;
      case 'event':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Event</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* User Info */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <Avatar className="h-14 w-14 ring-4 ring-background shadow-lg">
              <AvatarImage 
                src={currentUser.profileImage || undefined} 
                alt={currentUser.fullName}
              />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                {currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-bold text-foreground text-lg">{currentUser.fullName}</span>
              {getPostTypeBadge()}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {currentUser.headline && (
                <>
                  <span className="font-medium">{currentUser.headline}</span>
                  <span>•</span>
                </>
              )}
              {currentUser.companyName && (
                <>
                  <span>{currentUser.companyName}</span>
                  <span>•</span>
                </>
              )}
              <span className="text-green-600 font-medium">Now</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-6">
          <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share your thoughts..."
              className="w-full px-4 py-4 text-lg border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground bg-background shadow-sm"
            rows={4}
          />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {content.length}/500
            </div>
          </div>
          
          {imageUrl && (
            <div className="mt-4 rounded-xl overflow-hidden shadow-lg border border-border">
              <img
                src={imageUrl}
                alt="Upload preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        {/* Selected Location and Event Display */}
        {(selectedLocation || selectedEvent) && (
          <div className="mb-4 p-3 bg-accent rounded-lg border border-border">
            {selectedLocation && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Location: {selectedLocation}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {selectedEvent && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    Event: {selectedEvent.title} - {selectedEvent.date} at {selectedEvent.time}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-4 p-4 bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Choose an emoji</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {['😀', '😂', '😍', '🥰', '😎', '🤔', '😮', '😢', '😡', '👍', '👎', '❤️', '🎉', '🔥', '💯', '🚀', '💡', '🎯', '⭐', '🏆', '🎨', '📚', '💼', '🌍', '🎵', '🍕', '☕', '🏃', '🎮', '📱', '💻', '🎪', '🎭'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl hover:bg-accent rounded-lg p-2 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Location Picker */}
        {showLocationPicker && (
          <div className="mb-4 p-4 bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Add location</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowLocationPicker(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter location..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const location = (e.target as HTMLInputElement).value.trim();
                    if (location) {
                      handleLocationSelect(location);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2">
                {['Office', 'Home', 'Cafe', 'Park', 'Gym', 'Library', 'Restaurant', 'Beach'].map((location) => (
                  <Button
                    key={location}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleLocationSelect(location)}
                    className="text-xs"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Picker */}
        {showEventPicker && (
          <div className="mb-4 p-4 bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Create event</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEventPicker(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Event title..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                id="event-title"
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  id="event-date"
                />
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  id="event-time"
                />
              </div>
              <Button
                type="button"
                onClick={() => {
                  const title = (document.getElementById('event-title') as HTMLInputElement)?.value.trim();
                  const date = (document.getElementById('event-date') as HTMLInputElement)?.value;
                  const time = (document.getElementById('event-time') as HTMLInputElement)?.value;
                  
                  if (title && date && time) {
                    handleEventCreate({ title, date, time });
                    // Clear inputs
                    (document.getElementById('event-title') as HTMLInputElement).value = '';
                    (document.getElementById('event-date') as HTMLInputElement).value = '';
                    (document.getElementById('event-time') as HTMLInputElement).value = '';
                  } else {
                    toast.error('Please fill in all event details');
                  }
                }}
                className="w-full"
              >
                Add Event
              </Button>
            </div>
          </div>
        )}

        {/* Post Type Selection */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { value: 'general', label: 'General Post', color: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
              { value: 'job_update', label: 'Job Update', color: 'bg-primary text-primary-foreground hover:bg-primary/90' },
              { value: 'announcement', label: 'Announcement', color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300' },
              { value: 'event', label: 'Event', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300' }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setPostType(type.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  postType === type.value 
                    ? type.color + ' ring-2 ring-offset-2 ring-ring' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-xl px-4 py-2 transition-all duration-200"
            >
              <Image className="h-5 w-5" />
              <span className="font-medium">Image</span>
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 transition-all duration-200 ${
                showEmojiPicker 
                  ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'text-muted-foreground hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
              }`}
            >
              <Smile className="h-5 w-5" />
              <span className="font-medium">Emoji</span>
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 transition-all duration-200 ${
                showLocationPicker 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20' 
                  : 'text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
            >
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Location</span>
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowEventPicker(!showEventPicker)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 transition-all duration-200 ${
                showEventPicker 
                  ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                  : 'text-muted-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Event</span>
            </Button>
            
            {(content.trim() || imageUrl) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAICaption(true)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl px-4 py-2 transition-all duration-200"
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">AI Caption</span>
              </Button>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isPosting || isUploading || (!content.trim() && !imageUrl)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            {isPosting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Post</span>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </Button>
        </div>
      </form>
      
      {/* AI Caption Modal */}
      {showAICaption && (
        <AICaptionGenerator
          imageUrl={imageUrl || undefined}
          textContent={content}
          postType={selectedEvent ? 'event' : postType}
          userContext={currentUser?.headline || 'professional'}
          onCaptionSelect={(caption) => {
            setContent(caption);
            setShowAICaption(false);
            toast.success('AI caption applied successfully!');
          }}
          onClose={() => setShowAICaption(false)}
        />
      )}
    </div>
  );
}

