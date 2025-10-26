"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, Upload, FileText, User, Mail, Phone, MapPin, Briefcase, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface Job {
  id: string | number;
  title: string;
  company: string;
  location: string;
  postedBy?: string;
}

interface JobSeeker {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  yearsOfExperience?: string;
  education?: string;
}

interface ApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplicationModal({ job, isOpen, onClose, onSuccess }: ApplicationModalProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [jobSeeker, setJobSeeker] = useState<JobSeeker | null>(null);
  
  // Form fields
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Fetch job seeker profile
  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      if (!user?.email) return;
      
      try {
        const response = await fetch(`/api/jobseeker/profile?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setJobSeeker(data);
        }
      } catch (error) {
        console.error("Error fetching job seeker profile:", error);
      }
    };

    if (isOpen && user?.email) {
      fetchJobSeekerProfile();
    }
  }, [isOpen, user?.email]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email || !jobSeeker) {
      toast.error("Please complete your profile before applying");
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('coverLetter', coverLetter);
      formData.append('expectedSalary', expectedSalary);
      formData.append('noticePeriod', noticePeriod);
      formData.append('availabilityDate', availabilityDate);
      formData.append('portfolioUrl', portfolioUrl);
      formData.append('linkedinUrl', linkedinUrl);
      formData.append('githubUrl', githubUrl);
      formData.append('additionalNotes', additionalNotes);
      formData.append('jobId', job.id.toString());
      formData.append('jobSeekerId', jobSeeker.id);
      formData.append('recruiterId', job.postedBy || '');

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        onSuccess();
        onClose();
        // Reset form
        setResumeFile(null);
        setCoverLetter("");
        setExpectedSalary("");
        setNoticePeriod("");
        setAvailabilityDate("");
        setPortfolioUrl("");
        setLinkedinUrl("");
        setGithubUrl("");
        setAdditionalNotes("");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting your application");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Apply for {job.title}</h2>
              <p className="text-muted-foreground">{job.company} • {job.location}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Resume/CV <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {resumeFile ? resumeFile.name : "Click to upload your resume (PDF, DOC, DOCX)"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Max 5MB</p>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
              />
            </div>

            {/* Expected Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Expected Salary
              </label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
                placeholder="e.g., $50,000 - $60,000 annually"
              />
            </div>

            {/* Notice Period */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Notice Period
              </label>
              <select
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                <option value="">Select notice period</option>
                <option value="Immediate">Immediate</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            {/* Availability Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Available From
              </label>
              <input
                type="date"
                value={availabilityDate}
                onChange={(e) => setAvailabilityDate(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>

            {/* Portfolio URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
                placeholder="https://your-portfolio.com"
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
                placeholder="https://github.com/your-username"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 