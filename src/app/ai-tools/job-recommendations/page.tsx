"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  ArrowRight,
  RefreshCw,
  Settings,
  User
} from "lucide-react";
import { JobRecommendationCard } from "@/components/job/JobRecommendationCard";
import { JobRecommendationAnalysis } from "@/components/job/JobRecommendationAnalysis";
import { ProfileCompletionPrompt } from "@/components/job/ProfileCompletionPrompt";
import { Button } from "@/components/ui/button";

interface JobRecommendation {
  jobId: string;
  matchScore: number;
  reasons: string[];
  strengths: string[];
  considerations: string[];
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    employmentType: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    postedDate: string;
    recruiter: {
      companyName: string;
      companyDescription?: string;
      companyBenefits: string[];
    };
  };
}

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

export default function JobRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [analysis, setAnalysis] = useState<RecommendationAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileComplete, setProfileComplete] = useState(true);
  const [missingFields, setMissingFields] = useState<any>(null);

  // Load recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/job-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 8,
          includeAnalysis: true
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
        setAnalysis(data.analysis);
        setUserProfile(data.userProfile);
        setProfileComplete(data.profileComplete !== false);
        setMissingFields(data.missingFields);
      } else {
        const errorData = await res.json();
        console.error("Failed to fetch AI recommendations:", errorData);
        setProfileComplete(false);
      }
    } catch (error) {
      console.error("Error loading AI recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2">
                AI-Powered Job Recommendations
                <Sparkles className="w-8 h-8 text-purple-500" />
              </h1>
              <p className="text-muted-foreground">
                Personalized job matches based on your profile, skills, and career goals
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Summary */}
        {userProfile && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-foreground">Your Profile Summary</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-foreground">{userProfile.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Role</p>
                <p className="text-foreground">{userProfile.currentRole || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Experience</p>
                <p className="text-foreground">{userProfile.experience || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="text-foreground">{userProfile.location}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userProfile.skills?.slice(0, 5).map((skill: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {userProfile.skills?.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{userProfile.skills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">AI Recommendations</h2>
            <div className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {recommendations.length} matches
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
            </Button>
            <Button
              variant="outline"
              onClick={fetchRecommendations}
              disabled={loading}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* AI Analysis */}
        {showAnalysis && analysis && (
          <div className="mb-8">
            <JobRecommendationAnalysis analysis={analysis} />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">AI is analyzing your profile and finding the best job matches...</p>
          </div>
        )}

        {/* Recommendations */}
        {!loading && recommendations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.jobId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobRecommendationCard 
                  recommendation={recommendation}
                  showAnalysis={true}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* No recommendations */}
        {!loading && recommendations.length === 0 && (
          <div>
            {!profileComplete ? (
              <ProfileCompletionPrompt missingFields={missingFields} />
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
                  <Brain className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-purple-900 mb-2">No AI Recommendations Available</h3>
                <p className="text-purple-700 mb-6 max-w-md mx-auto">
                  No new jobs available for recommendations. You may have already applied to all available positions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={fetchRecommendations}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Recommendations
                  </Button>
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {!loading && recommendations.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to Apply?
              </h3>
              <p className="text-muted-foreground mb-6">
                These AI recommendations are tailored specifically for you. Start applying to the jobs that match your profile best.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => window.location.href = '/jobs'}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                View All Jobs
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
