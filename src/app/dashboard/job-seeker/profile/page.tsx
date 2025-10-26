"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { UserPosts } from "@/components/profile/UserPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  Download, 
  Upload,
  Linkedin,
  Github,
  Globe,
  Loader2,
  Camera
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  fullName: string;
  headline?: string;
  role: string;
  location?: string;
  companyName?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobSeekerProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/auth/login");
      return;
    }
    const loadProfile = async () => {
      try {
        const userId = (session.user as any).id;
        // Fetch complete profile data from unified user table
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
        } else {
          throw new Error("Failed to load profile");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [session, status, router]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageUpload = async (file: File) => {
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

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.url) {
          // Update profile with new image URL
          setProfile(prev => prev ? { ...prev, profileImage: data.url } : null);
          
          // Also update in database
          const updateResponse = await fetch(`/api/users/${profile?.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profileImage: data.url
            }),
          });

          if (updateResponse.ok) {
            toast.success('Profile picture updated successfully!');
            // Clear preview since upload was successful
            setPreviewImage(null);
            // Clean up preview URL
            URL.revokeObjectURL(previewUrl);
          } else {
            toast.error('Failed to update profile in database');
            // Keep preview on error
          }
        } else {
          throw new Error('No image URL returned from upload');
        }
      } else {
        const errorData: any = await response.json();
        throw new Error(errorData?.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      // Clean up preview URL on error
      URL.revokeObjectURL(previewUrl);
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditProfile = () => {
    router.push('/dashboard/job-seeker/profile/edit');
  };

  const handleEditAbout = () => {
    router.push('/dashboard/job-seeker/profile/edit');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
          <p className="text-muted-foreground mb-4">Unable to load your profile information.</p>
          <Button onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          user={profile}
          isOwnProfile={true}
          onEditProfile={handleEditProfile}
          onUploadImage={handleImageUpload}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Resume & Links */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture Upload */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Profile Picture</h3>
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                      <AvatarImage 
                        src={previewImage || profile.profileImage || undefined} 
                        alt={profile.fullName}
                        className={previewImage || profile.profileImage ? '' : 'hidden'}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                        {profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    id="profile-picture-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    className="hidden"
                    disabled={isUploading}
                  />
                  
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('profile-picture-upload')?.click()}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        {profile.profileImage ? 'Change Picture' : 'Upload Picture'}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF (max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resume Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Resume</h3>
                  <Button variant="ghost" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {(profile as any).resume ? (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm">Current Resume</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No resume uploaded yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Profile Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Member since:</span>
                    <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span>{new Date(profile.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span className="capitalize">{profile.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - About & Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <ProfileAbout
              profile={profile}
              isOwnProfile={true}
              onEditAbout={handleEditAbout}
            />

            {/* User Posts */}
            <UserPosts
              userId={profile.id}
              currentUserId={profile.id}
              currentUserRole={profile.role}
              isOwnProfile={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 