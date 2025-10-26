"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Loader2,
  Save,
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  User,
  Mail
} from "lucide-react";
import { toast } from "sonner";

interface RecruiterProfile {
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

export default function RecruiterProfileEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [formData, setFormData] = useState<Partial<RecruiterProfile>>({});

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || !session.user) {
      toast.error("Please login to access your profile");
      router.push("/auth/login");
      return;
    }

    const userRole = (session.user as any).role;
    if (userRole !== "recruiter") {
      toast.error("Access denied. Recruiters only.");
      router.push("/dashboard");
      return;
    }

    const loadProfile = async () => {
      try {
        const userId = (session.user as any).id;
        const response = await fetch(`/api/users/${userId}`);
        
        if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
          setFormData(profileData);
        } else {
          throw new Error("Failed to load profile");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Error loading profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [session, status, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const userId = (session?.user as any)?.id;
      
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Prepare update data - only include allowed fields
      const updateData = {
        fullName: formData.fullName,
        headline: formData.headline,
        location: formData.location,
        companyName: formData.companyName,
      };

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        router.push('/dashboard/recruiter/profile');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/recruiter/profile');
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
          <button 
            onClick={() => router.push('/dashboard/recruiter')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center space-x-4"
        >
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-1">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your recruiter profile information
            </p>
          </div>
        </motion.div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-md cursor-not-allowed text-muted-foreground"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Professional Headline</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline || ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="e.g., Senior Talent Acquisition Manager"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  A brief headline that describes your role
                </p>
              </div>
            </div>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Company Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your company location or where you're based
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-end space-x-4"
          >
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </main>
  );
}

