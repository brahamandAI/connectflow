"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2,
  MapPin,
  Crown,
  Eye,
  TrendingUp,
  X,
  Calendar,
  Users
} from "lucide-react";
import { useSession } from "next-auth/react";

interface UserSidebarProps {
  onClose?: () => void;
  userProfile?: {
    id: string;
    fullName: string;
    profileImage?: string;
    headline?: string;
    role: string;
    companyName?: string;
    location?: string;
  };
}

export function UserSidebar({ onClose, userProfile }: UserSidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  // Mock data - in a real app, this would come from props or API
  const userStats = {
    profileViewers: 21,
    postImpressions: 11
  };

  if (!session?.user && !userProfile) {
    return null;
  }

  // Use userProfile if provided, otherwise fall back to session
  const user = userProfile || session?.user as any;
  const userFullName = user.fullName || user.name || user.email?.split('@')[0] || 'User';
  const userHeadline = user.headline || `${user.role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}`;
  const userLocation = user.location || 'Location not set';
  const userCompany = user.companyName || (user.role === 'recruiter' ? 'Company' : null);

  const handleProfileClick = () => {
    // Redirect to the current user's dashboard profile
    if (user.role === 'recruiter') {
      router.push('/dashboard/recruiter/profile');
    } else {
      router.push('/dashboard/job-seeker/profile');
    }
  };

  return (
    <div className="w-80 space-y-4">
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {/* Profile Card */}
      <Card 
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        onClick={handleProfileClick}
      >
        <div className="relative">
          {/* Banner */}
          <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Decorative Icons */}
            <div className="absolute top-2 left-2 flex space-x-2 opacity-20">
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <span className="text-white text-xs font-mono">&lt;/&gt;</span>
              </div>
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <Building2 className="w-3 h-3 text-white" />
              </div>
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <Calendar className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-20">
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-8 left-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage 
                src={user.profileImage || user.image || undefined} 
                alt={userFullName}
                className={user.profileImage || user.image ? '' : 'hidden'}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {userFullName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Open to Work Badge */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              #OPENTOWORK
            </div>
          </div>
        </div>
        
        <CardContent className="pt-12 pb-6">
          <div className="space-y-3">
            <div>
              <h2 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">{userFullName}</h2>
              <p className="text-sm text-muted-foreground">{userHeadline}</p>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{userLocation}</span>
            </div>
            
            {userCompany && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{userCompany}</span>
              </div>
            )}
            
            {/* Click indicator */}
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Click to view your profile
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Profile viewers</span>
              </div>
              <span className="font-semibold text-foreground">{userStats.profileViewers}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Post impressions</span>
              </div>
              <span className="font-semibold text-foreground">{userStats.postImpressions}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Offer Card */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-foreground">Achieve your career goals</h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-500 text-white">
                Try Premium for ₹0
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Unlock premium features and accelerate your career growth
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
