"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Briefcase, Clock, MapPin, Building, Brain } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { JobLogo } from "../ui/JobLogo";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: {
    id: string | number;
    title: string;
    company: string;
    logo?: string;
    location: string;
    salary?: string;
    type?: string;
    postedAt?: string;
    tags?: string[];
    isFeatured?: boolean;
  };
  compact?: boolean;
  className?: string;
  isHorizontal?: boolean;
}

export const JobCard = ({ job, compact = false, className, isHorizontal = false }: JobCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSaved = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
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
        job.isFeatured ? "border-primary/20" : "border-border",
        className
      )}
    >
      {job.isFeatured && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
            Featured
          </div>
        </div>
      )}
      
      <Link href={`/jobs/${job.id.toString()}`} className="block p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {job.logo ? (
              <Image 
                src={job.logo} 
                alt={`${job.company} logo`} 
                width={compact ? 40 : 56} 
                height={compact ? 40 : 56}
                className="bg-background rounded-lg object-contain p-1 border"
              />
            ) : (
              <JobLogo 
                name={job.company} 
                size={compact ? "sm" : "md"} 
              />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <h3 className={`font-semibold text-foreground truncate ${compact ? "text-base" : "text-lg"}`}>
                {job.title}
              </h3>
              
              <div className="flex items-center mt-1 text-muted-foreground">
                <Building className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{job.company}</span>
              </div>
              
              <div className={`flex flex-wrap gap-y-2 ${compact ? "mt-2" : "mt-3"}`}>
                <div className="flex items-center text-xs text-muted-foreground mr-3">
                  <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                
                {job.type && (
                  <div className="flex items-center text-xs text-muted-foreground mr-3">
                    <Briefcase className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span>{job.type}</span>
                  </div>
                )}
                
                {job.postedAt && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span>{formatRelativeTime(job.postedAt)}</span>
                  </div>
                )}
              </div>
              
              {!compact && job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {job.tags.length > 3 && (
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground">
                      +{job.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              {job.salary && !compact && (
                <div className="mt-3 text-sm font-medium text-foreground">
                  {job.salary}
                </div>
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
                  title: job.title,
                  company: job.company,
                  description: "Job description will be loaded from the job details page.",
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
    </motion.div>
  );
}; 