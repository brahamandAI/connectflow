"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, BriefcaseBusiness, Brain, Sparkles, TrendingUp } from "lucide-react";
import { CurrencyIcon } from "@/utils/currency";
import { JobCard } from "@/components/job/JobCard";
import { JobRecommendationCard } from "@/components/job/JobRecommendationCard";
import { JobRecommendationAnalysis } from "@/components/job/JobRecommendationAnalysis";
import { ProfileCompletionPrompt } from "@/components/job/ProfileCompletionPrompt";
import { Button } from "@/components/ui/button";

// Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  recruiter: {
    companyName: string;
    companyDescription?: string;
    companyBenefits: string[];
  };
  salary?: string;
  type?: string;
  postedAt?: string;
  tags?: string[];
  isFeatured?: boolean;
  applicationDeadline?: string;
  companyId?: number;
}

// AI Recommendation interface
interface JobRecommendation {
  jobId: string;
  matchScore: number;
  reasons: string[];
  strengths: string[];
  considerations: string[];
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  job: Job;
}

// Analysis interface
interface RecommendationAnalysis {
  overallAssessment: string;
  skillGaps: string[];
  strengths: string[];
  marketInsights: {
    demand: string;
    trends: string[];
    opportunities: string[];
  };
  recommendations: string[];
  nextSteps: string[];
}

// Filter options
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"];
const SALARY_RANGES = ["₹0 - ₹5L", "₹5L - ₹10L", "₹10L - ₹20L", "₹20L+"];

export default function JobsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // AI Recommendation states
  const [aiRecommendations, setAiRecommendations] = useState<JobRecommendation[]>([]);
  const [recommendationAnalysis, setRecommendationAnalysis] = useState<RecommendationAnalysis | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);
  const [missingFields, setMissingFields] = useState<any>(null);

  // Load jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/jobs?sort=recent");
        
        if (res.ok) {
          const data = await res.json();
          const jobsData = data.jobs || data; // Handle both response formats
          setJobs(jobsData.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salaryMin && job.salaryMax 
              ? `₹${job.salaryMin.toLocaleString('en-IN')} - ₹${job.salaryMax.toLocaleString('en-IN')}` 
              : undefined,
            type: job.employmentType,
            postedAt: job.postedDate,
            tags: [...(job.requirements || []).slice(0, 3)],
            isFeatured: false,
            description: job.description,
            companyId: job.companyId
          })));
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error loading jobs data:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Load AI recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const res = await fetch("/api/ai/job-recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 6,
            includeAnalysis: true
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          setAiRecommendations(data.recommendations || []);
          setRecommendationAnalysis(data.analysis);
          setProfileComplete(data.profileComplete !== false);
          setMissingFields(data.missingFields);
        } else if (res.status === 401) {
          // User not authenticated or not a jobseeker - silently skip recommendations
          setAiRecommendations([]);
          setProfileComplete(false);
        } else {
          // Other errors - try to get error details
          try {
            const errorData = await res.json();
            if (errorData.message) {
              // API returned a message (e.g., profile incomplete)
              setAiRecommendations([]);
              setProfileComplete(errorData.profileComplete !== false);
              setMissingFields(errorData.missingFields);
            }
          } catch (parseError) {
            // Failed to parse error response - silently ignore
            setAiRecommendations([]);
          }
        }
      } catch (error) {
        // Network or other errors - silently fail without console errors
        setAiRecommendations([]);
      } finally {
        setLoadingRecommendations(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  // Toggle job type selection
  const toggleJobType = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  // Toggle experience level selection
  const toggleExperience = (level: string) => {
    if (selectedExperienceLevels.includes(level)) {
      setSelectedExperienceLevels(selectedExperienceLevels.filter(l => l !== level));
    } else {
      setSelectedExperienceLevels([...selectedExperienceLevels, level]);
    }
  };

  // Toggle salary range selection
  const toggleSalaryRange = (range: string) => {
    if (selectedSalaryRanges.includes(range)) {
      setSelectedSalaryRanges(selectedSalaryRanges.filter(r => r !== range));
    } else {
      setSelectedSalaryRanges([...selectedSalaryRanges, range]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setLocation("");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedSalaryRanges([]);
  };

  // Filter jobs based on selections
  const filteredJobs = jobs.filter(job => {
    // Search term filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Job type filter
    if (selectedJobTypes.length > 0 && job.type && !selectedJobTypes.includes(job.type)) {
      return false;
    }
    
    // For demo purposes, we'll skip actual experience level and salary filtering
    // since our data might not have those fields with matching formats
    
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero */}
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-muted-foreground mb-6">
            Browse through thousands of full-time and part-time jobs near you
          </p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-2xl shadow-sm border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-grow md:max-w-[280px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="md:w-auto h-12 px-6 rounded-xl border flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {(selectedJobTypes.length > 0 || selectedExperienceLevels.length > 0 || selectedSalaryRanges.length > 0) && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {selectedJobTypes.length + selectedExperienceLevels.length + selectedSalaryRanges.length}
                </span>
              )}
            </Button>
          </div>

          {/* Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Job Types */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Job Type</h3>
                  <div className="space-y-2">
                    {JOB_TYPES.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedJobTypes.includes(type)}
                          onChange={() => toggleJobType(type)}
                        />
                        <span className="ml-2 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Levels */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Experience Level</h3>
                  <div className="space-y-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedExperienceLevels.includes(level)}
                          onChange={() => toggleExperience(level)}
                        />
                        <span className="ml-2 text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Ranges */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Salary Range</h3>
                  <div className="space-y-2">
                    {SALARY_RANGES.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedSalaryRanges.includes(range)}
                          onChange={() => toggleSalaryRange(range)}
                        />
                        <span className="ml-2 text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="h-9 px-3 rounded-lg text-sm"
                  >
                    <X className="mr-1 h-4 w-4" />
                    <span>Reset filters</span>
                  </Button>
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="h-9 px-3 rounded-lg text-sm"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* AI Job Recommendations */}
        {showRecommendations && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    AI-Powered Job Recommendations
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Personalized job matches based on your profile and preferences
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRecommendations(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Hide
                </Button>
              </div>
            </div>

            {/* AI Analysis */}
            {showAnalysis && recommendationAnalysis && (
              <div className="mb-8">
                <JobRecommendationAnalysis analysis={recommendationAnalysis} />
              </div>
            )}

            {/* Loading state for recommendations */}
            {loadingRecommendations && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-muted-foreground">AI is analyzing your profile and finding the best job matches...</p>
              </div>
            )}

            {/* AI Recommendations */}
            {!loadingRecommendations && aiRecommendations.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiRecommendations.map((recommendation) => (
                  <JobRecommendationCard 
                    key={recommendation.jobId} 
                    recommendation={recommendation}
                    showAnalysis={true}
                  />
                ))}
              </div>
            )}

            {/* No recommendations */}
            {!loadingRecommendations && aiRecommendations.length === 0 && (
              <div>
                {!profileComplete ? (
                  <ProfileCompletionPrompt missingFields={missingFields} />
                ) : (
                  <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900">No AI Recommendations Available</h3>
                    <p className="text-purple-700 mt-1 mb-4">No new jobs available for recommendations. You may have already applied to all available positions.</p>
                    <Button 
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      Refresh Recommendations
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Featured Jobs */}
        {filteredJobs.filter(job => job.isFeatured).length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold">Featured Jobs</h2>
              <div className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                {filteredJobs.filter(job => job.isFeatured).length}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredJobs
                .filter(job => job.isFeatured)
                .map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading jobs...</p>
          </div>
        )}

        {/* Recent Jobs */}
        {!loading && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">Recent Jobs</h2>
                <div className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                  {filteredJobs.length}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!showRecommendations && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRecommendations(true)}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Show AI Recommendations
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Remote jobs available</span>
                </div>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} isHorizontal />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No jobs found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your search filters</p>
                <Button onClick={resetFilters} className="mt-2">
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 