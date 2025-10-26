"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "@/lib/date-utils";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  salaryMin?: number;
  salaryMax?: number;
  postedDate: string;
  tags: string[];
}

interface SuggestedJobsProps {
  currentUserId: string;
}

export function SuggestedJobs({ currentUserId }: SuggestedJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSuggestedJobs();
  }, [currentUserId]);

  const fetchSuggestedJobs = async () => {
    try {
      // This would typically fetch jobs based on user preferences/skills
      // For now, we'll fetch recent jobs
      const response = await fetch('/api/jobs?limit=2&sort=recent');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching suggested jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    if (min) return `₹${min.toLocaleString()}+`;
    if (max) return `Up to ₹${max.toLocaleString()}`;
    return null;
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Suggested Jobs</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Suggested Jobs</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-700"
          onClick={() => router.push('/jobs')}
        >
          View all
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">No suggested jobs available</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div 
              key={job.id} 
              className="border border-gray-100 rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              onClick={() => router.push(`/jobs/${job.id}`)}
              title="Click to view job details"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm line-clamp-1 hover:text-blue-400 transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                    <span>{job.company}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {job.employmentType}
                  </Badge>
                  {formatSalary(job.salaryMin, job.salaryMax) && (
                    <span className="font-medium text-green-600">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                </div>
              </div>

              {/* Show only essential tags to reduce clutter */}
              {job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {job.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {job.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.tags.length - 2} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
          onClick={() => router.push('/jobs')}
        >
          Browse all jobs
        </Button>
      </div>
    </div>
  );
}

