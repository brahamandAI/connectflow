"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  BookmarkCheck, 
  BellRing, 
  Calendar, 
  BarChart3, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  PieChart, 
  UserRound, 
  Building, 
  FileText, 
  PanelRight,
  ChevronRight,
  Mail,
  PhoneCall,
  Eye,
  AlertCircle,
  MapPin,
  GraduationCap,
  Award
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface JobSeeker {
  email: string;
  fullName: string;
  profileComplete: boolean;
  currentJobTitle: string;
  bio: string;
  education: string;
  yearsOfExperience: string;
  city: string;
  country: string;
  skills: string[];
  certifications: string[];
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
}

export default function JobSeekerDashboardPage() {
  const router = useRouter();
  const { session, user, isAuthenticated, isLoading } = useAuth("jobseeker");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userData, setUserData] = useState<JobSeeker | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState([
    { name: "Applied Jobs", value: 0, icon: <Briefcase className="h-5 w-5" />, change: "+0", color: "blue" },
    { name: "Interviews", value: 0, icon: <MessageSquare className="h-5 w-5" />, change: "+0", color: "green" },
    { name: "Saved Jobs", value: 0, icon: <BookmarkCheck className="h-5 w-5" />, change: "+0", color: "purple" },
    { name: "Profile Views", value: 0, icon: <Eye className="h-5 w-5" />, change: "+0", color: "amber" },
  ]);

  useEffect(() => {
    // Don't do anything while session is loading
    if (isLoading) return;
    
    // Only redirect if we're certain the user is not authenticated
    if (!isAuthenticated || !user) {
      // Use replace instead of push to avoid adding to history
      router.replace("/auth/jobseeker/login");
      return;
    }
    setUserData(user as JobSeeker);

    const fetchData = async () => {
      try {
        const email = (user as any)?.email;
        
        // Fetch user's applications
        const applicationsResponse = await fetch(`/api/jobseeker/applications?email=${email}`);
        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setApplications(applicationsData);
          
          // Update stats with real data
          setStats(prevStats => {
            const newStats = [...prevStats];
            newStats[0].value = applicationsData.length; // Applied Jobs
            newStats[1].value = applicationsData.filter((app: any) => 
              app.status === "Under Review" || app.status === "Shortlisted"
            ).length; // Interviews (approximated by applications under review/shortlisted)
            newStats[2].value = 0; // Saved Jobs - not implemented yet
            newStats[3].value = 0; // Profile Views - not implemented yet
            return newStats;
          });
        }

      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Error loading dashboard data");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();

    // Listen for application submission events to refresh dashboard
    const handleApplicationSubmitted = () => {
      fetchData();
    };

    window.addEventListener('applicationSubmitted', handleApplicationSubmitted);

    return () => {
      window.removeEventListener('applicationSubmitted', handleApplicationSubmitted);
    };
  }, [user, isAuthenticated, isLoading, router]);
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Refresh dashboard data
  const refreshDashboard = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    try {
      const email = (user as any)?.email;
      
      // Fetch user's applications
      const applicationsResponse = await fetch(`/api/jobseeker/applications?email=${email}`);
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json();
        setApplications(applicationsData);
        
        // Update stats with real data
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[0].value = applicationsData.length; // Applied Jobs
          newStats[1].value = applicationsData.filter((app: any) => 
            app.status === "Under Review" || app.status === "Shortlisted"
          ).length; // Interviews (approximated by applications under review/shortlisted)
          newStats[2].value = 0; // Saved Jobs - not implemented yet
          newStats[3].value = 0; // Profile Views - not implemented yet
          return newStats;
        });
      }
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
      toast.error("Error refreshing dashboard data");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Shortlisted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Hired":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Hello, {userData?.fullName}! Here's an overview of your job search activity.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-0 flex space-x-3"
          >
            <Link
              href="/jobs"
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Find Jobs
            </Link>
            
            <Link
              href="/resume-builder/create"
              className="px-4 py-2 border border-border bg-background hover:bg-muted font-medium rounded-lg transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-1.5" />
              <span>Create Resume</span>
            </Link>
            
            <button
              onClick={refreshDashboard}
              disabled={isRefreshing}
              className="px-4 py-2 border border-border bg-background hover:bg-muted font-medium rounded-lg transition-colors flex items-center"
            >
              {isRefreshing ? (
                <div className="w-4 h-4 mr-1.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <BarChart3 className="w-4 h-4 mr-1.5" />
              )}
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </motion.div>
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background border border-border rounded-xl p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">{userData?.fullName}</h2>
              <p className="text-muted-foreground">{userData?.currentJobTitle}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/job-seeker/profile"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <UserRound className="w-4 h-4" />
                View Full Profile
              </Link>
              <Link
                href="/dashboard/job-seeker/profile/edit"
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Education</p>
                <p className="font-medium">{userData?.education || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-medium">{userData?.yearsOfExperience || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">
                  {userData?.city && userData?.country 
                    ? `${userData.city}, ${userData.country}`
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Top Skills</h3>
              <Link
                href="/dashboard/job-seeker/profile"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData?.skills?.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {(!userData?.skills || userData.skills.length === 0) && (
                <span className="text-muted-foreground">No skills added yet</span>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium flex items-center ${
                  stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change} this week
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background border border-border rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Link
              href="/dashboard/job-seeker/applications"
              className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applications yet</p>
              <Link
                href="/jobs"
                className="text-primary hover:text-primary/80 text-sm font-medium mt-2 inline-block"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application: any) => (
                <div 
                  key={application.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
                      <Building className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{application.position}</h3>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(application.status)}`}>
                      {application.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(application.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 