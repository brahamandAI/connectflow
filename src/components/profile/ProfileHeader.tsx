"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Building2, 
  Mail, 
  Phone,
  Edit,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  Share
} from "lucide-react";
import { useSession } from "next-auth/react";

interface ProfileHeaderProps {
  user: {
    id: string;
    fullName: string;
    headline?: string;
    location?: string;
    companyName?: string;
    profileImage?: string;
    email: string;
    role: string;
  };
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onUploadImage?: (file: File) => void;
}

export function ProfileHeader({ 
  user, 
  isOwnProfile = false, 
  onEditProfile,
  onUploadImage 
}: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;

    setIsUploading(true);
    try {
      await onUploadImage(file);
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Background Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-700 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 flex space-x-2 opacity-20">
          <div className="w-8 h-8 bg-white/30 rounded flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-white/30 rounded flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Edit Banner Button (for own profile) */}
        {isOwnProfile && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Camera className="w-4 h-4 mr-2" />
            Edit Banner
          </Button>
        )}
      </div>

      <CardContent className="pb-6">
        {/* Profile Picture and Basic Info */}
        <div className="relative -mt-16 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage 
                  src={user.profileImage || undefined} 
                  alt={user.fullName}
                  className={user.profileImage ? '' : 'hidden'}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                  {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {/* Edit Profile Picture Button */}
              {isOwnProfile && (
                <div className="absolute bottom-0 right-0">
                  <input
                    type="file"
                    id="profile-image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className={`rounded-full p-2 shadow-lg cursor-pointer transition-colors ${
                      isUploading 
                        ? 'bg-primary/50 cursor-not-allowed' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </label>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">{user.fullName}</h1>
                <p className="text-lg text-muted-foreground">
                  {user.headline || `${user.role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}`}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.companyName && (
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{user.companyName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>

                {/* Role Badge */}
                <Badge variant={user.role === 'recruiter' ? 'secondary' : 'outline'} className="w-fit">
                  {user.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isOwnProfile ? (
            <>
              <Button onClick={onEditProfile} className="flex-1 sm:flex-none">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1 sm:flex-none">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <UserPlus className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
