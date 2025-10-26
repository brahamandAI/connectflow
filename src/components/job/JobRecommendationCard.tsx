"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Bookmark, 
  BookmarkCheck, 
  Briefcase, 
  Clock, 
  MapPin, 
  Building, 
  Brain, 
  Star,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { JobLogo } from "../ui/JobLogo";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface JobRecommendationCardProps {
  recommendation: {
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
  };
  compact?: boolean;
  className?: string;
  showAnalysis?: boolean;
}

export const JobRecommendationCard = ({ 
  recommendation, 
  compact = false, 
  className,
  showAnalysis = true 
}: JobRecommendationCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleSaved = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    },
    initial: {
      y: 0,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative bg-card border rounded-2xl transition-all duration-200 overflow-hidden",
        "border-primary/20 shadow-sm",
        className
      )}
    >
      {/* AI Recommendation Badge */}
      <div className="absolute top-0 right-0">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center gap-1">
          <Brain className="w-3 h-3" />
          AI Match
        </div>
      </div>

      {/* Match Score */}
      <div className="absolute top-0 left-0">
        <div className="bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-xl flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span className={getMatchScoreColor(recommendation.matchScore)}>
            {recommendation.matchScore}/10
          </span>
        </div>
      </div>

      <Link href={`/jobs/${recommendation.job.id}`} className="block p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <JobLogo 
              name={recommendation.job.company} 
              size={compact ? "sm" : "md"} 
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <h3 className={`font-semibold text-foreground truncate ${compact ? "text-base" : "text-lg"}`}>
                {recommendation.job.title}
              </h3>
              
              <div className="flex items-center mt-1 text-muted-foreground">
                <Building className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{recommendation.job.company}</span>
              </div>
              
              <div className={`flex flex-wrap gap-y-2 ${compact ? "mt-2" : "mt-3"}`}>
                <div className="flex items-center text-xs text-muted-foreground mr-3">
                  <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  <span>{recommendation.job.location}</span>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mr-3">
                  <Briefcase className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  <span>{recommendation.job.employmentType}</span>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  <span>{formatRelativeTime(recommendation.job.postedDate)}</span>
                </div>
              </div>

              {/* Priority Badge */}
              <div className="mt-2">
                <span className={cn(
                  "inline-flex px-2 py-1 rounded-full text-xs font-medium border",
                  getPriorityColor(recommendation.priority)
                )}>
                  {recommendation.priority.toUpperCase()} PRIORITY
                </span>
              </div>
              
              {/* AI Recommendation Summary */}
              <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900 mb-1">
                      AI Recommendation
                    </p>
                    <p className="text-xs text-purple-700">
                      {recommendation.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Reasons */}
              {showAnalysis && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-foreground">Why this matches you:</span>
                  </div>
                  <div className="space-y-1">
                    {recommendation.reasons.slice(0, 2).map((reason, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                    {recommendation.reasons.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowDetails(!showDetails);
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        {showDetails ? 'Show less' : `+${recommendation.reasons.length - 2} more reasons`}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Detailed Analysis (Expandable) */}
              {showDetails && showAnalysis && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-3"
                >
                  {/* Strengths */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">Strengths</span>
                    </div>
                    <div className="space-y-1">
                      {recommendation.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Considerations */}
                  {recommendation.considerations.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-foreground">Considerations</span>
                      </div>
                      <div className="space-y-1">
                        {recommendation.considerations.map((consideration, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{consideration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            <button 
              onClick={toggleSaved}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={isSaved ? "Unsave job" : "Save job"}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Navigate to interview prep with job details
                const jobData = encodeURIComponent(JSON.stringify({
                  title: recommendation.job.title,
                  company: recommendation.job.company,
                  description: recommendation.job.description,
                }));
                window.open(`/ai-tools/interview-prep?job=${jobData}`, '_blank');
              }}
              className="p-2 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
              aria-label="View AI Interview Questions"
              title="View AI Interview Questions"
            >
              <Brain className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Quick Apply Button */}
      <div className="px-5 pb-5">
        <Link href={`/jobs/${recommendation.job.id}/apply`}>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Navigate to apply page
              window.location.href = `/jobs/${recommendation.job.id}/apply`;
            }}
          >
            <span>Quick Apply</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
