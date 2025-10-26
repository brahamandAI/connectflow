"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Calendar, Building, Clock, CheckCircle, XCircle, User, Mail, Phone, FileText, Download, Brain, Users } from "lucide-react";
import { CurrencyIcon, formatSalary } from "@/utils/currency";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { JobLogo } from "@/components/ui/JobLogo";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ApplicationModal from "@/components/ApplicationModal";
import { toast } from "react-hot-toast";

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
  openings?: number;
}

// Resume interface
interface Resume {
  id: number;
  name: string;
  lastModified: string;
  template: string;
  jobApplications: number;
  data: any;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const jobId = params?.id;
  const { user, role, isAuthenticated } = useAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [showResumeSelector, setShowResumeSelector] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [isCheckingApplication, setIsCheckingApplication] = useState(false);

  // Check if user has already applied for this job
  const checkIfApplied = async () => {
    if (!isAuthenticated || role !== "jobseeker" || !jobId || !(user as any)?.id) {
      return;
    }
    
    setIsCheckingApplication(true);
    try {
      const res = await fetch(`/api/applications?jobId=${jobId}&jobSeekerId=${(user as any).id}`);
      if (res.ok) {
        const applications = await res.json();
        setHasApplied(applications.length > 0);
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    } finally {
      setIsCheckingApplication(false);
    }
  };

  // Fetch job data and saved resumes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch job data from API
        const res = await fetch(`/api/jobs/${jobId}`);
        if (res.ok) {
          const foundJob = await res.json();
          setJob(foundJob);
        }
        
        // If user is a recruiter, fetch applications for this job
        if (role === "recruiter" && jobId) {
          const applicationsRes = await fetch(`/api/applications?jobId=${jobId}`);
          if (applicationsRes.ok) {
            const applicationsData = await applicationsRes.json();
            setApplications(applicationsData);
          }
        }
        
        // Fetch saved resumes (still from localStorage) - only for job seekers
        if (role === "jobseeker") {
          const savedResumesStr = localStorage.getItem("savedResumes");
          if (savedResumesStr) {
            const savedResumes = JSON.parse(savedResumesStr);
            setResumes(savedResumes);
            if (savedResumes.length > 0) {
              setSelectedResumeId(savedResumes[0].id); // Select first resume by default
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (jobId) {
      fetchData();
    }
  }, [jobId, role]);

  // Check if user has already applied when user data is available
  useEffect(() => {
    if (isAuthenticated && role === "jobseeker" && (user as any)?.id) {
      checkIfApplied();
    }
  }, [isAuthenticated, role, (user as any)?.id, jobId]);

  // Handle URL parameters for messages
  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "already-applied") {
      toast.success("You have already applied for this position!");
      // Remove the message parameter from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("message");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]);

  // Handle one-click apply
  const handleOneClickApply = () => {
    if (resumes.length === 0) {
      // No saved resumes, redirect to resume builder
      router.push("/resume-builder/create");
      return;
    }
    
    if (resumes.length === 1) {
      // If user has only one resume, apply directly
      applyWithResume(resumes[0].id);
    } else {
      // If user has multiple resumes, show resume selector
      setShowResumeSelector(true);
    }
  };
  
  // Apply with selected resume
  const applyWithResume = (resumeId: number) => {
    setApplicationStatus("loading");
    setShowApplyModal(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get selected resume
        const selectedResume = resumes.find(resume => resume.id === resumeId);
        if (!selectedResume || !job) {
          throw new Error("Resume or job not found");
        }
        
        // Get existing applications
        const applicationsStr = localStorage.getItem("applications");
        const applications = applicationsStr ? JSON.parse(applicationsStr) : [];
        
        // Create new application
        const newApplication = {
          id: Date.now(),
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          resumeId: selectedResume.id,
          resumeName: selectedResume.name,
          applicationDate: new Date().toISOString(),
          status: "Applied"
        };
        
        // Add to applications
        applications.push(newApplication);
        localStorage.setItem("applications", JSON.stringify(applications));
        
        // Update resume job applications count
        const updatedResumes = resumes.map(resume => {
          if (resume.id === selectedResume.id) {
            return {
              ...resume,
              jobApplications: (resume.jobApplications || 0) + 1
            };
          }
          return resume;
        });
        localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
        
        // Update job applicants count
        if (job) {
          const jobsDataStr = localStorage.getItem("jobs");
          if (jobsDataStr) {
            const jobs = JSON.parse(jobsDataStr);
            const updatedJobs = jobs.map((j: Job) => {
              if (j.id.toString() === job.id.toString()) {
                return {
                  ...j,
                  applicantsCount: (j.applicantsCount || 0) + 1
                };
              }
              return j;
            });
            localStorage.setItem("jobs", JSON.stringify(updatedJobs));
          }
        }
        
        // Update dashboard activity
        const dashboardDataStr = localStorage.getItem("dashboardData");
        if (dashboardDataStr) {
          const dashboardData = JSON.parse(dashboardDataStr);
          if (dashboardData.activities) {
            dashboardData.activities.unshift({
              id: Date.now(),
              action: `Applied to '${job.title}' at ${job.company}`,
              time: "Just now",
              user: "You"
            });
            localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
          }
        }
        
        setApplicationStatus("success");
        setApplicationMessage("Application submitted successfully!");
      } catch (error) {
        console.error("Error applying for job:", error);
        setApplicationStatus("error");
        setApplicationMessage("Failed to submit application. Please try again.");
      }
    }, 1500);
  };
  


  // Function to update application status
  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          notes: `Status updated to ${newStatus}`
        }),
      });

      if (response.ok) {
        // Update the local state
        setApplications(prevApplications => 
          prevApplications.map(app => 
            app.id === applicationId 
              ? { ...app, status: newStatus }
              : app
          )
        );
      } else {
        console.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist or has been removed.</p>
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
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/jobs" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
        
        {/* Job Header */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Job Logo */}
            <div className="flex-shrink-0">
              {job.logo ? (
                <Image 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  width={80} 
                  height={80}
                  className="bg-background rounded-lg object-contain p-2 border"
                />
              ) : (
                <JobLogo 
                  name={job.company} 
                  size="lg" 
                />
              )}
            </div>
            
            {/* Job Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
              
              <div className="flex items-center mt-2 text-muted-foreground">
                <Building className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span className="text-base">{job.company}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>{job.location}</span>
                  {job.locationType && <span> • {job.locationType}</span>}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>{job.employmentType || job.type}</span>
                </div>
                
                {job.experienceLevel && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{job.experienceLevel} level</span>
                  </div>
                )}
                
                {job.openings && job.openings > 0 && (
                  <div className="flex items-center text-sm font-medium">
                    <Users className="w-4 h-4 mr-1.5 flex-shrink-0 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">{job.openings} opening{job.openings > 1 ? 's' : ''} available</span>
                  </div>
                )}
                
                {(job.postedAt || job.postedDate) && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    <span>Posted {job.postedAt || job.postedDate}</span>
                  </div>
                )}
              </div>
              
              {job.salary && (
                <div className="mt-4 flex items-center">
                  <CurrencyIcon currency={typeof job.salary === 'object' ? job.salary.currency : 'INR'} className="w-4 h-4 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-base font-medium">{typeof job.salary === 'object' ? formatSalary(job.salary.min, job.salary.max, job.salary.currency) : job.salary}</span>
                </div>
              )}
              
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Apply Button */}
            <div className="w-full md:w-auto space-y-3">
              <Link href={`/jobs/${jobId}/apply`}>
                <Button 
                  size="lg" 
                  className="w-full md:w-auto px-8"
                >
                  Apply Now
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto px-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                onClick={() => {
                  // Navigate to interview prep with job details
                  const jobData = encodeURIComponent(JSON.stringify({
                    title: job.title,
                    description: job.description || "",
                    company: job.company,
                    requirements: job.requirements || [],
                    responsibilities: job.responsibilities || []
                  }));
                  window.open(`/ai-tools/interview-prep?job=${jobData}`, '_blank');
                }}
              >
                <Brain className="w-4 h-4 mr-2" />
                View AI Interview Questions
              </Button>
              
              <p className="text-xs text-muted-foreground text-center md:text-right">
                Complete application form with resume & cover letter
              </p>
            </div>
          </div>
        </div>
        
        {/* Job Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            {job.description && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              </div>
            )}
            
            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Application Details</h2>
              
              <div className="space-y-4">
                {job.applicationDeadline && (
                  <div>
                    <h3 className="text-sm font-medium">Deadline</h3>
                    <p className="text-muted-foreground flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      {job.applicationDeadline}
                    </p>
                  </div>
                )}
                
                {job.applicantsCount !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium">Applications</h3>
                    <p className="text-muted-foreground mt-1">
                      {job.applicantsCount} {job.applicantsCount === 1 ? 'applicant' : 'applicants'} so far
                    </p>
                  </div>
                )}
                
                {job.applicationUrl && (
                  <div>
                    <h3 className="text-sm font-medium">External Application</h3>
                    <a 
                      href={job.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Apply on company website
                    </a>
                  </div>
                )}
              </div>
              
              {/* Show Apply button or Already Applied message for job seekers */}
              {role === "jobseeker" && (
                <>
                  {isCheckingApplication ? (
                    <Button 
                      className="w-full mt-6"
                      disabled
                    >
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Checking application status...
                      </div>
                    </Button>
                  ) : hasApplied ? (
                    <div className="w-full mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-center text-green-800">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">You have already applied for this position</span>
                      </div>
                      <p className="text-sm text-green-600 text-center mt-1">
                        We'll notify you when there's an update on your application.
                      </p>
                    </div>
                  ) : (
                    <Button 
                      className="w-full mt-6"
                      onClick={() => setShowApplyModal(true)}
                    >
                      Apply with Resume
                    </Button>
                  )}
                </>
              )}
              
              {/* Show View Applications button for recruiters */}
              {role === "recruiter" && (
                <Button 
                  className="w-full mt-6"
                  onClick={() => setShowApplicationModal(true)}
                >
                  View Applications ({applications.length})
                </Button>
              )}
              
              {/* Show Apply button for unauthenticated users */}
              {!isAuthenticated && (
                <Link href={`/jobs/${jobId}/apply`}>
                  <Button className="w-full mt-6">
                    Apply with Resume
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Company Information */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">About the Company</h2>
              <Link 
                href={job.companyId ? `/companies/${job.companyId}` : '#'} 
                className="flex items-center hover:text-primary transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  {job.logo ? (
                    <Image 
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      width={40} 
                      height={40}
                      className="bg-background rounded-lg object-contain p-1 border"
                    />
                  ) : (
                    <JobLogo 
                      name={job.company} 
                      size="sm" 
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">View company profile</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Application Modal for Job Seekers */}
      {showApplyModal && job && (
        <ApplicationModal
          job={job}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onSuccess={() => {
            // Refresh applications count if needed
            if (job.applicantsCount !== undefined) {
              setJob(prev => prev ? { ...prev, applicantsCount: (prev.applicantsCount || 0) + 1 } : null);
            }
            // Update application status
            setHasApplied(true);
            
            // Trigger a custom event to notify other components
            window.dispatchEvent(new CustomEvent('applicationSubmitted', {
              detail: { jobId: job.id, jobTitle: job.title }
            }));
          }}
        />
      )}
      
      {/* Applications Modal for Recruiters */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Applications for {job?.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApplicationModal(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground">Applications will appear here once candidates apply for this position.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="bg-background border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{application.jobSeeker?.fullName || 'Unknown Candidate'}</h3>
                            <p className="text-muted-foreground">{application.jobSeeker?.email || 'No email provided'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                            application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                            application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {application.status}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Applied {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Information
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Email:</strong> {application.jobSeeker?.email || 'Not provided'}</p>
                            <p><strong>Phone:</strong> {application.jobSeeker?.phone || 'Not provided'}</p>
                            <p><strong>Location:</strong> {application.jobSeeker?.city}, {application.jobSeeker?.country}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Professional Details
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Experience:</strong> {application.jobSeeker?.yearsOfExperience || 'Not specified'}</p>
                            <p><strong>Education:</strong> {application.jobSeeker?.education || 'Not specified'}</p>
                            <p><strong>Expected Salary:</strong> {application.expectedSalary || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                      
                      {application.coverLetter && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Cover Letter
                          </h4>
                          <div className="bg-muted/50 rounded-lg p-4 text-sm">
                            {application.coverLetter}
                          </div>
                        </div>
                      )}
                      
                      {application.resumeUrl && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Resume
                          </h4>
                          <a 
                            href={application.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary hover:underline"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Resume
                          </a>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Update application status to "Under Review"
                            updateApplicationStatus(application.id, "Under Review");
                          }}
                        >
                          Mark as Under Review
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Update application status to "Shortlisted"
                            updateApplicationStatus(application.id, "Shortlisted");
                          }}
                        >
                          Shortlist
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Update application status to "Rejected"
                            updateApplicationStatus(application.id, "Rejected");
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Resume Selector Modal */}
      {showResumeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Choose a Resume</h2>
            <div className="max-h-96 overflow-y-auto">
              {resumes.map(resume => (
                <div 
                  key={resume.id}
                  onClick={() => setSelectedResumeId(resume.id)}
                  className={`p-4 border rounded-lg mb-3 cursor-pointer ${
                    selectedResumeId === resume.id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{resume.name}</h3>
                      <p className="text-sm text-muted-foreground">Last modified: {resume.lastModified}</p>
                    </div>
                    {selectedResumeId === resume.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowResumeSelector(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  if (selectedResumeId) {
                    applyWithResume(selectedResumeId);
                    setShowResumeSelector(false);
                  }
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Application Status Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-md w-full p-6 text-center"
          >
            {applicationStatus === "loading" && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
                <h2 className="text-xl font-semibold mb-2">Submitting Application</h2>
                <p className="text-muted-foreground">Please wait while we submit your application...</p>
              </>
            )}
            
            {applicationStatus === "success" && (
              <>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">{applicationMessage}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setShowApplyModal(false);
                      router.push("/dashboard/job-seeker");
                    }}
                  >
                    View Applications
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
            
            {applicationStatus === "error" && (
              <>
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Application Failed</h2>
                <p className="text-muted-foreground mb-6">{applicationMessage}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setApplicationStatus("loading");
                      applyWithResume(selectedResumeId!);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
} 