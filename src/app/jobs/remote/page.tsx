"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Search, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";

// Job interface
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  posted?: string;
  logo?: string;
  tags?: string[];
  postedDate?: string;
  description?: string;
  requirements?: string[];
}

export default function RemoteJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Load jobs from localStorage
  useEffect(() => {
    try {
      const jobsData = localStorage.getItem("jobs");
      if (jobsData) {
        const allJobs = JSON.parse(jobsData);
        // Filter remote jobs only
        const remoteJobs = allJobs
          .filter((job: any) => 
            job.location.toLowerCase().includes("remote") || 
            job.locationType === "remote"
          )
          .map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: "Remote",
            type: job.employmentType || "Full-time",
            salary: job.salary && job.salary.min && job.salary.max 
              ? `₹${job.salary.min.toLocaleString('en-IN')} - ₹${job.salary.max.toLocaleString('en-IN')}` 
              : "Salary not specified",
            posted: job.postedDate 
              ? getTimeAgo(new Date(job.postedDate))
              : "Recently",
            tags: job.requirements 
              ? job.requirements.slice(0, 3) 
              : [],
            description: job.description
          }));
        setJobs(remoteJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error loading remote jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    searchTerm === "" || 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Helper function to format time ago
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 30) {
      return `${Math.floor(diffInDays / 30)} months ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const staggerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Remote Jobs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Find the best remote opportunities from companies around the world. Work from anywhere, anytime.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <button className="px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Advanced Filters (hidden by default) */}
          {filterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-background border border-border rounded-lg p-4 mt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Experience</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Salary</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000-150000">$100,000 - $150,000</option>
                    <option value="150000+">$150,000+</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="ml-4 text-muted-foreground">Loading remote jobs...</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && (
          <>
            {filteredJobs.length > 0 ? (
              <motion.div 
                variants={staggerAnimation}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={itemAnimation}
                    className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {job.type}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400">
                                <MapPin className="mr-1 h-3 w-3" />
                                {job.location}
                              </span>
                              {job.tags && job.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-2">
                        <div className="text-sm font-medium">{job.salary}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> Posted {job.posted}
                        </div>
                        <button className="mt-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-background border border-border rounded-xl">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">No remote jobs found</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We couldn't find any remote jobs matching your search. Try adjusting your search terms or check back later.
                </p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
} 