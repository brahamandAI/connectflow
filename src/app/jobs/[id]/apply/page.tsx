"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, FileText, Send, CheckCircle, XCircle, AlertCircle, Briefcase, MapPin, Calendar, Globe, Linkedin, Github, ExternalLink } from "lucide-react";
import { CurrencyIcon, formatSalary } from "@/utils/currency";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { JobLogo } from "@/components/ui/JobLogo";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Job interface
interface Job {
  id: string | number;
  title: string;
  company: string;
  companyId?: number;
  logo?: string;
  location: string;
  locationType?: string;
  salary?: string | {
    min: number | null;
    max: number | null;
    currency: string;
    period: string;
  };
  employmentType?: string;
  type?: string;
  experienceLevel?: string;
  postedAt?: string;
  postedDate?: string;
  tags?: string[];
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  applicationUrl?: string;
  applicantsCount?: number;
  postedBy?: string;
}

// JobSeeker interface
interface JobSeeker {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  currentJobTitle?: string;
  yearsOfExperience?: string;
  education?: string;
  skills: string[];
  resume?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  languages: string[];
  certifications: string[];
}

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;
  const { data: session, status } = useSession();
  
  const [job, setJob] = useState<Job | null>(null);
  const [jobSeeker, setJobSeeker] = useState<JobSeeker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  
  // Form data
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch job data and job seeker profile
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Check authentication
        if (status === "loading") return;
        if (!session || (session.user as any)?.role !== "jobseeker") {
          router.replace("/auth/jobseeker/login");
          return;
        }

        // Fetch job data
        const jobRes = await fetch(`/api/jobs/${jobId}`);
        if (jobRes.ok) {
          const jobData = await jobRes.json();
          setJob(jobData);
        }

        // Fetch job seeker profile
        const profileRes = await fetch(`/api/jobseeker/profile?email=${(session.user as any).email}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setJobSeeker(profileData);
          
          // Pre-fill form with existing data
          setLinkedinUrl(profileData.linkedinUrl || "");
          setGithubUrl(profileData.githubUrl || "");
          setPortfolioUrl(profileData.portfolioUrl || "");
          setExpectedSalary(profileData.expectedSalary || "");
          setNoticePeriod(profileData.noticePeriod || "");
          
          // Check if user has already applied for this job
          const applicationRes = await fetch(`/api/applications?jobId=${jobId}&jobSeekerId=${profileData.id}`);
          if (applicationRes.ok) {
            const applications = await applicationRes.json();
            if (applications.length > 0) {
              setHasApplied(true);
              // Redirect back to job detail page with message
              router.replace(`/jobs/${jobId}?message=already-applied`);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (jobId && status !== "loading") {
      fetchData();
    }
  }, [jobId, session, status, router]);

  // Handle resume file upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: "Please upload a PDF or Word document" }));
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      
      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!resumeFile && !jobSeeker?.resume) {
      newErrors.resume = "Please upload a resume or use your existing one";
    }
    
    if (!coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }
    
    if (coverLetter.trim().length < 100) {
      newErrors.coverLetter = "Cover letter must be at least 100 characters";
    }
    
    if (coverLetter.trim().length > 2000) {
      newErrors.coverLetter = "Cover letter must be less than 2000 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Upload resume if new file is selected
      let resumeUrl = jobSeeker?.resume || "";
      if (resumeFile) {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("email", (session?.user as any).email);
        
        const uploadRes = await fetch("/api/jobseeker/resume/upload", {
          method: "POST",
          body: formData,
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          resumeUrl = uploadData.resumeUrl;
        } else {
          throw new Error("Failed to upload resume");
        }
      }
      
      // Submit application
      const applicationData = {
        jobId: job?.id,
        jobSeekerId: jobSeeker?.id,
        recruiterId: job?.postedBy,
        resumeUrl,
        coverLetter: coverLetter.trim(),
        expectedSalary: expectedSalary.trim() || null,
        noticePeriod: noticePeriod.trim() || null,
        availabilityDate: availabilityDate.trim() || null,
        portfolioUrl: portfolioUrl.trim() || null,
        linkedinUrl: linkedinUrl.trim() || null,
        githubUrl: githubUrl.trim() || null,
        additionalNotes: additionalNotes.trim() || null,
      };
      
      const applicationRes = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      
      if (applicationRes.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Application submitted successfully!");
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard/job-seeker");
        }, 3000);
      } else {
        const errorData: any = await applicationRes.json();
        throw new Error(errorData?.error || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6 pt-28 pb-20">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job || !jobSeeker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6 pt-28 pb-20">
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Job or Profile Not Found</h1>
            <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist or your profile is incomplete.</p>
            <Link href="/jobs">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6 pt-28 pb-20">
        {/* Back button */}
        <div className="mb-8">
          <Link href={`/jobs/${jobId}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Details
          </Link>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 text-green-600 p-6 rounded-xl mb-8 flex items-center shadow-sm"
          >
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">{submitMessage}</p>
              <p className="text-sm text-green-500/80 mt-1">Redirecting to dashboard...</p>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-600 p-6 rounded-xl mb-8 flex items-center shadow-sm"
          >
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Application Failed</p>
              <p className="text-sm text-red-500/80 mt-1">{submitMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Job Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Job Logo */}
            <div className="flex-shrink-0">
              {job.logo ? (
                <Image 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  width={100} 
                  height={100}
                  className="bg-background rounded-xl object-contain p-3 border shadow-sm"
                />
              ) : (
                <div className="w-[100px] h-[100px]">
                <JobLogo 
                  name={job.company} 
                  size="lg" 
                />
                </div>
              )}
            </div>
            
            {/* Job Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{job.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{job.company}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                
                {job.employmentType && (
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{job.employmentType}</span>
                  </div>
                )}
                
              {job.salary && (
                  <div className="flex items-center text-muted-foreground">
                    <CurrencyIcon currency={typeof job.salary === 'object' ? job.salary.currency : 'INR'} className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{typeof job.salary === 'object' ? formatSalary(job.salary.min, job.salary.max, job.salary.currency) : job.salary}</span>
                  </div>
              )}
            </div>
          </div>
        </div>
        </motion.div>

        {/* Application Form */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Job Application</h2>
              <p className="text-muted-foreground">Complete your application for {job.title} at {job.company}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Resume Upload Section */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-primary" />
                  Resume
                </h3>
                <div className="space-y-6">
                  {jobSeeker.resume && (
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                          <div>
                            <p className="font-medium">Current Resume</p>
                            <p className="text-sm text-muted-foreground">{jobSeeker.resume.split('/').pop()}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        You can upload a new resume below or use your existing one
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium mb-3">
                      Upload New Resume (Optional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-200 hover:bg-muted/20">
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                      <label htmlFor="resume" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          PDF, DOC, DOCX files only
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Maximum file size: 5MB
                        </p>
                      </label>
                    </div>
                    {resumeFile && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ✓ {resumeFile.name} selected
                      </p>
                      </div>
                    )}
                    {errors.resume && (
                      <p className="text-sm text-red-600 mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.resume}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Letter Section */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Cover Letter</h3>
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium mb-3">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors resize-none"
                    placeholder="Write a compelling cover letter explaining why you're interested in this position and how your skills and experience make you a great fit for this role. Be specific about your achievements and how they align with the job requirements..."
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-muted-foreground">
                      {coverLetter.length}/2000 characters
                    </p>
                    {errors.coverLetter && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.coverLetter}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expectedSalary" className="block text-sm font-medium mb-2">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      id="expectedSalary"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="e.g., $60,000 - $80,000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="noticePeriod" className="block text-sm font-medium mb-2">
                      Notice Period
                    </label>
                    <input
                      type="text"
                      id="noticePeriod"
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="e.g., 2 weeks, 1 month"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="availabilityDate" className="block text-sm font-medium mb-2">
                      Available From
                    </label>
                    <input
                      type="date"
                      id="availabilityDate"
                      value={availabilityDate}
                      onChange={(e) => setAvailabilityDate(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-2">
                      Portfolio URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      id="portfolioUrl"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="https://your-portfolio.com"
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="linkedinUrl" className="block text-sm font-medium mb-2">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      id="githubUrl"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="https://github.com/your-username"
                    />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes Section */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Additional Notes</h3>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium mb-3">
                    Any additional information you'd like to share
                  </label>
                  <textarea
                    id="additionalNotes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors resize-none"
                    placeholder="Any additional information about your experience, projects, certifications, or why you're particularly interested in this role and company..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 