"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Briefcase,
  Award,
  Languages,
  Calendar,
  DollarSign
} from "lucide-react";

interface ProfileAboutProps {
  profile: {
    id: string;
    location?: string;
    companyName?: string;
    headline?: string;
    role: string;
    createdAt: string;
  };
  isPublic?: boolean;
  connectionStatus?: string;
  isOwnProfile?: boolean;
  onEditAbout?: () => void;
}

export function ProfileAbout({ profile, isPublic = false, connectionStatus, isOwnProfile = false, onEditAbout }: ProfileAboutProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safety check for undefined profile
  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Profile information not available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>About</CardTitle>
        {isOwnProfile && (
          <Button variant="ghost" size="sm" onClick={onEditAbout}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
            </div>
          )}
          
          {profile.companyName && (
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{profile.companyName}</p>
              </div>
            </div>
          )}
          
          {profile.headline && (
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Current Role</p>
                <p className="font-medium">{profile.headline}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            {isOwnProfile 
              ? "Edit your profile to add more information about yourself, your skills, and experience." 
              : "This user hasn't added additional information yet."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
