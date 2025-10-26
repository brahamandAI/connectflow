"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Search, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";

export default function PartTimeJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data - would be replaced with API call in production
  const jobs = [
    {
      id: 1,
      title: "Content Writer",
      company: "MediaGroup",
      location: "Remote",
      type: "Part-time",
      salary: "₹2,000 - ₹3,000/hr",
      posted: "1 day ago",
      logo: "/placeholder.png",
      tags: ["Writing", "SEO", "Content Strategy"],
    },
    {
      id: 2,
      title: "Social Media Manager",
      company: "BrandGrowth",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "₹1,600 - ₹2,500/hr",
      posted: "3 days ago",
      logo: "/placeholder.png",
      tags: ["Social Media", "Marketing", "Copywriting"],
    },
    {
      id: 3,
      title: "Customer Support Specialist",
      company: "ServiceFirst",
      location: "Remote",
      type: "Part-time",
      salary: "₹1,500 - ₹1,800/hr",
      posted: "2 days ago",
      logo: "/placeholder.png",
      tags: ["Customer Service", "Communication", "Problem Solving"],
    },
  ];

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
            Part-Time Jobs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Find flexible part-time opportunities that fit your schedule, perfect for students, parents, or those seeking work-life balance.
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
                  <label className="block text-sm font-medium mb-2">Hours Per Week</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Hours</option>
                    <option value="10">Less than 10 hours</option>
                    <option value="20">10-20 hours</option>
                    <option value="30">20-30 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Location</option>
                    <option value="remote">Remote</option>
                    <option value="new-york">New York</option>
                    <option value="san-francisco">San Francisco</option>
                    <option value="chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hourly Rate</label>
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                    <option value="">Any Rate</option>
                    <option value="0-15">$0 - $15/hr</option>
                    <option value="15-25">$15 - $25/hr</option>
                    <option value="25-40">$25 - $40/hr</option>
                    <option value="40+">$40+/hr</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Jobs List */}
        <motion.div 
          variants={staggerAnimation}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {jobs.map((job) => (
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
                        {job.tags.map((tag) => (
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
      </div>
    </main>
  );
} 