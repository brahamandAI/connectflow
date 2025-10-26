"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  UserRound, 
  Mail, 
  PhoneCall, 
  Briefcase, 
  GraduationCap, 
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
  Languages,
  FileText,
  Save,
  Clock,
  Plus,
  X
} from "lucide-react";
import { useSession } from "next-auth/react";

interface JobSeeker {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  currentJobTitle: string;
  yearsOfExperience: string;
  education: string;
  skills: string[];
  resume: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  preferredJobTypes: string[];
  expectedSalary: string;
  noticePeriod: string;
  languages: string[];
  certifications: string[];
}

export default function JobSeekerProfileEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<JobSeeker | null>(null);
  const [formData, setFormData] = useState<Partial<JobSeeker>>({});
  const [newCertification, setNewCertification] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || (session.user as any).role !== "jobseeker") {
      toast.error("Please login to access your profile");
      router.push("/auth/jobseeker/login");
      return;
    }
    const loadProfile = async () => {
      try {
        const email = (session.user as any).email;
        // Fetch complete profile data
        const response = await fetch(`/api/jobseeker/profile?email=${email}`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/jobseeker/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        router.push('/dashboard/job-seeker/profile');
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-1">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your profile information to improve your job search experience.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-md cursor-not-allowed text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="currentJobTitle"
                    value={formData.currentJobTitle || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your current job title"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <select
                    name="education"
                    value={formData.education || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  >
                    <option value="">Select education</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills?.join(', ') || ''}
                    onChange={handleArrayInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Languages (comma-separated)</label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages?.join(', ') || ''}
                    onChange={handleArrayInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="e.g., English, Spanish, French"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Certifications</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        className="w-full pl-4 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                        placeholder="Add a certification"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addCertification}
                      className="px-4 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <span className="text-foreground">{cert}</span>
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Location Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your state"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your country"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your LinkedIn profile URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">GitHub Profile</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your GitHub profile URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Portfolio Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl || ''}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                    placeholder="Enter your portfolio website URL"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-background border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Expected Salary</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  placeholder="Enter your expected salary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notice Period</label>
                <input
                  type="text"
                  name="noticePeriod"
                  value={formData.noticePeriod || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  placeholder="Enter your notice period"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Preferred Job Types (comma-separated)</label>
                <input
                  type="text"
                  name="preferredJobTypes"
                  value={formData.preferredJobTypes?.join(', ') || ''}
                  onChange={handleArrayInputChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  placeholder="e.g., Full-time, Remote, Contract"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  placeholder="Write a brief bio about yourself"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </main>
  );
} 