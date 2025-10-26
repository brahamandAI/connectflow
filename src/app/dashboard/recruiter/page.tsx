"use client";

import { BarChart3, Briefcase, Settings, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

// Interface for dashboard stats and activity
interface DashboardData {
  stats: {
    activeListings: number;
    totalApplicants: number;
    pendingReviews: number;
    messages: number;
  };
  jobPostings: Array<{
    id: string;
    title: string;
    postedDate: string;
    applicantsCount: number;
  }>;
  activities: Array<{
    id: string;
    action: string;
    time: string;
    user: string;
  }>;
}

export default function RecruiterDashboardPage() {
  const { session, user, isAuthenticated, isLoading } = useAuth("recruiter");
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(true);
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterCompany, setRecruiterCompany] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      activeListings: 0,
      totalApplicants: 0,
      pendingReviews: 0,
      messages: 0
    },
    jobPostings: [],
    activities: []
  });
  
  // Function to update dashboard data - this would be called after user actions
  const updateDashboardData = (newData: Partial<DashboardData>) => {
    const updatedData = { ...dashboardData, ...newData };
    // In a real app, this would be sent to an API
    localStorage.setItem('dashboardData', JSON.stringify(updatedData));
    setDashboardData(updatedData);
  };

  // Fetch dashboard data from API
  const fetchDashboardData = useCallback(async () => {
    try {
      // Use the new dedicated dashboard API endpoint
      const dashboardRes = await fetch(`/api/recruiter/dashboard`);
      
      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        
        // Update recruiter info
        if (dashboardData.user) {
          setRecruiterName(dashboardData.user.fullName || "");
          setRecruiterCompany(dashboardData.user.companyName || "");
        }
        
        // Format job postings for display
        const jobPostings = dashboardData.jobPostings.map((job: any) => ({
          id: job.id,
          title: job.title,
          postedDate: new Date(job.postedDate).toLocaleDateString(),
          applicantsCount: job.applicantsCount
        }));
        
        // Format activities for display
        const activities = dashboardData.activities.map((activity: any) => ({
          id: activity.id,
          action: activity.action,
          time: new Date(activity.time).toLocaleDateString(),
          user: activity.user
        }));
        
        const newDashboardData = {
          stats: dashboardData.stats,
          jobPostings,
          activities
        };
        
        console.log('Dashboard data loaded successfully:', {
          activeListings: newDashboardData.stats.activeListings,
          jobCount: jobPostings.length,
          applicantsCount: newDashboardData.stats.totalApplicants
        });
        
        setDashboardData(newDashboardData);
      } else {
        const errorData = await dashboardRes.json();
        console.error('Failed to fetch dashboard data:', errorData);
        console.error('Response status:', dashboardRes.status);
        console.error('Error details:', errorData.details);
        
        if (dashboardRes.status === 404) {
          toast.error('Recruiter profile not found. Please complete your profile.');
        } else {
          toast.error(`Failed to load dashboard data: ${errorData.error || 'Unknown error'}`);
        }
        
        // Show empty state
        setDashboardData({
          stats: {
            activeListings: 0,
            totalApplicants: 0,
            pendingReviews: 0,
            messages: 0
          },
          jobPostings: [],
          activities: []
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      
      // Show empty state on error
      setDashboardData({
        stats: {
          activeListings: 0,
          totalApplicants: 0,
          pendingReviews: 0,
          messages: 0
        },
        jobPostings: [],
        activities: []
      });
    }
  }, []);
  
  useEffect(() => {
    // Don't do anything while session is loading
    if (isLoading) return;
    
    // Only redirect if we're certain the user is not authenticated
    // (i.e., session has finished loading and user is definitely not authenticated)
    if (!isAuthenticated || !user) {
      // Use replace instead of push to avoid adding to history
      router.replace("/auth/recruiter/login");
      return;
    }
    
    setRecruiterName((user as any).fullName || "");
    setRecruiterCompany((user as any).companyName || "");
    
    // Fetch real dashboard data from API
    fetchDashboardData();
    
    setIsNewUser(false); // Or set based on API response
  }, [isAuthenticated, user, isLoading, router, fetchDashboardData]);

  // Refetch dashboard data when window/tab gets focus (e.g., after navigating back)
  useEffect(() => {
    const handleFocus = () => {
      // Refetch data when user returns to this page
      fetchDashboardData();
    };

    window.addEventListener('focus', handleFocus);
    
    // Also refetch when the page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchDashboardData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchDashboardData]);

  // Listen for application submissions to refresh dashboard
  useEffect(() => {
    const handleApplicationSubmitted = (event: CustomEvent) => {
      // Refresh dashboard data when a new application is submitted
      fetchDashboardData();
      toast.success(`New application received for ${event.detail.jobTitle}!`);
    };

    window.addEventListener('applicationSubmitted', handleApplicationSubmitted as EventListener);
    
    return () => {
      window.removeEventListener('applicationSubmitted', handleApplicationSubmitted as EventListener);
    };
  }, [fetchDashboardData]);

  // Show loading screen while authenticating
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated after loading, don't render anything (redirect will happen in useEffect)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Convert dashboard data to display format
  const stats = [
    { name: "Active Listings", value: dashboardData.stats.activeListings, icon: <Briefcase className="h-6 w-6" />, color: "text-sky-500" },
    { name: "Total Applicants", value: dashboardData.stats.totalApplicants, icon: <Users className="h-6 w-6" />, color: "text-emerald-500" },
    { name: "Pending Reviews", value: dashboardData.stats.pendingReviews, icon: <Briefcase className="h-6 w-6" />, color: "text-amber-500" },
    { name: "Messages", value: dashboardData.stats.messages, icon: <Users className="h-6 w-6" />, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {recruiterName ? `Welcome, ${recruiterName}!` : 'Recruiter Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  {recruiterCompany 
                    ? `Manage job postings and candidates for ${recruiterCompany}.` 
                    : 'Manage your job postings and candidates.'}
                </p>
              </div>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow duration-300 border border-border"
              >
                <div className={`p-3 inline-block rounded-full bg-secondary mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-semibold">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.name}</p>
              </motion.div>
            ))}
          </div>

          {isNewUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-lg mb-8 border border-primary/20"
            >
              <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to your new recruiter dashboard! Here are a few steps to get started:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Complete your company profile</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Post your first job</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Browse potential candidates</span>
                </li>
              </ul>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions & Recent Postings */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-card p-6 rounded-lg shadow-lg border border-border"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Link 
                  href="/dashboard/recruiter/post-job" 
                  className="block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-md text-center transition-colors"
                >
                  Post a New Job
                </Link>
                <Link href="/dashboard/recruiter/applications" className="block bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-3 px-4 rounded-md text-center transition-colors">
                  View Applications
                </Link>
                <Link href="/dashboard/recruiter/candidates" className="block bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-3 px-4 rounded-md text-center transition-colors">
                  Browse Candidates
                </Link>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Job Postings</h2>
                <button 
                  onClick={() => {
                    console.log('Manual refresh triggered');
                    fetchDashboardData();
                  }}
                  className="text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-md transition-colors"
                >
                  Refresh
                </button>
              </div>
              
              {/* Debug info */}
              <div className="text-xs text-muted-foreground mb-2">
                Total jobs: {dashboardData.jobPostings.length} | Active Listings: {dashboardData.stats.activeListings}
              </div>
              
              {dashboardData.jobPostings.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.jobPostings.map(job => (
                    <div key={job.id} className="bg-secondary/50 p-4 rounded-md flex justify-between items-center border border-border">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-2 text-sm text-muted-foreground">Posted {job.postedDate} - {job.applicantsCount} Applicants</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/recruiter/applications?jobId=${job.id}`} className="text-sm text-primary hover:text-primary/80">
                          View Apps
                        </Link>
                      <Link href={`/dashboard/recruiter/jobs/${job.id}`} className="text-sm text-primary hover:text-primary/80">
                        Manage
                      </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-secondary/20 p-6 rounded-md text-center border border-border">
                  <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No job postings yet.</p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Start by posting your first job to attract candidates and begin building your talent pipeline.
                  </p>
                  <Link href="/dashboard/recruiter/post-job" className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Post Your First Job →
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card p-6 rounded-lg shadow-lg border border-border"
            >
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              
              {dashboardData.activities.length > 0 ? (
                <ul className="space-y-4">
                  {dashboardData.activities.map((activity) => (
                    <li key={activity.id} className="text-sm border-b border-border pb-2 last:border-b-0 last:pb-0">
                      <p>{activity.action} by <span className="font-medium text-primary">{activity.user}</span></p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-secondary/20 p-6 rounded-md text-center border border-border">
                  <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No recent activity.</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Activity will appear here as you interact with the platform.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
} 