"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronDown,
  Search,
  User,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  LinkedinIcon,
  GithubIcon,
  BookmarkIcon,
  XIcon,
  Download,
  Clock,
  ArrowLeft
} from "lucide-react";

// Candidate interface
interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  photo?: string;
  skills: string[];
  experience: {
    years: number;
    level: string;
  };
  education: string;
  linkedin?: string;
  github?: string;
  website?: string;
  lastActive: string;
  resume?: string;
  bio: string;
  saved?: boolean;
  jobPreferences?: string[];
}

function CandidatesByJobTypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobType = searchParams.get('type');
  
  const [recruiterData, setRecruiterData] = useState<any>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Predefined skills for filtering
  const skillsList = ["JavaScript", "React", "Angular", "Vue", "Node.js", "Python", "Java", "C#", "PHP", "Ruby", "HTML", "CSS", "SQL", "NoSQL", "AWS", "DevOps", "UI/UX", "Mobile Dev", "Flutter", "Swift"];
  
  // Experience levels for filtering
  const experienceLevels = ["Entry Level", "Junior", "Mid Level", "Senior", "Executive"];
  
  useEffect(() => {
    // Get recruiter data
    const recruiterDataStr = localStorage.getItem("currentRecruiter");
    if (recruiterDataStr) {
      try {
        const recruiter = JSON.parse(recruiterDataStr);
        setRecruiterData(recruiter);
      } catch (error) {
        console.error("Error loading recruiter data:", error);
      }
    } else {
      // Redirect to login if not logged in
      router.push("/auth/recruiter/login");
      return;
    }
    
    // Load candidates data
    const candidatesData = localStorage.getItem("candidates");
    try {
      if (candidatesData) {
        const allCandidates = JSON.parse(candidatesData);
        setCandidates(allCandidates);
      } else {
        setCandidates([]);
      }
    } catch (error) {
      console.error("Error loading candidates data:", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }, [router]);
  
  // Filter candidates by job type and other filters
  useEffect(() => {
    if (candidates.length === 0) {
      setFilteredCandidates([]);
      return;
    }
    
    const filtered = candidates.filter(candidate => {
      // Job type filter
      const matchesJobType = !jobType || 
        (candidate.jobPreferences && 
         candidate.jobPreferences.some(pref => 
           pref.toLowerCase() === jobType.toLowerCase()
         ));
      
      // Search term filter
      const matchesSearch = !searchTerm ||
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Skills filter
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => 
          candidate.skills.some(candidateSkill => 
            candidateSkill.toLowerCase() === skill.toLowerCase()
          )
        );
      
      // Experience filter
      const matchesExperience = selectedExperience.length === 0 ||
        selectedExperience.includes(candidate.experience.level);
      
      return matchesJobType && matchesSearch && matchesSkills && matchesExperience;
    });
    
    setFilteredCandidates(filtered);
  }, [searchTerm, selectedSkills, selectedExperience, candidates, jobType]);
  
  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Toggle experience level selection
  const toggleExperience = (level: string) => {
    if (selectedExperience.includes(level)) {
      setSelectedExperience(selectedExperience.filter(e => e !== level));
    } else {
      setSelectedExperience([...selectedExperience, level]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    setSelectedExperience([]);
  };
  
  // Toggle save candidate
  const toggleSaveCandidate = (id: number) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, saved: !candidate.saved } 
        : candidate
    ));
    
    setFilteredCandidates(filteredCandidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, saved: !candidate.saved } 
        : candidate
    ));
    
    // Persist changes to localStorage
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, saved: !candidate.saved } 
        : candidate
    );
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
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
                <Link 
                  href="/dashboard/recruiter" 
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">
                  {jobType ? `Candidates for ${jobType}` : 'Browse Candidates by Job Type'}
                </h1>
              </div>
            </div>
            <p className="text-slate-400 mt-2">
              {jobType 
                ? `Find qualified candidates interested in ${jobType} roles` 
                : 'Select a job type to find relevant candidates'}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, skills, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md flex items-center hover:bg-slate-600 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2 text-slate-400" />
                <span>Filters</span>
                {(selectedSkills.length > 0 || selectedExperience.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {selectedSkills.length + selectedExperience.length}
                  </span>
                )}
              </button>
            </div>

            {/* Filters panel */}
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 border-t border-slate-700 pt-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-white">Filter Candidates</h3>
                  {(selectedSkills.length > 0 || selectedExperience.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <XIcon className="h-4 w-4 mr-1" />
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills filter */}
                  <div>
                    <h4 className="font-medium text-slate-300 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedSkills.includes(skill)
                              ? "bg-purple-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          } transition-colors`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience level filter */}
                  <div>
                    <h4 className="font-medium text-slate-300 mb-2">Experience Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {experienceLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => toggleExperience(level)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedExperience.includes(level)
                              ? "bg-purple-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          } transition-colors`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {/* No job type selected */}
          {!loading && !jobType && (
            <div className="bg-slate-800 p-8 rounded-lg text-center">
              <Briefcase className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Select a Job Type</h3>
              <p className="text-slate-400 mb-6">Please select a job type to see relevant candidates</p>
              <Link 
                href="/dashboard/recruiter" 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          )}

          {/* Candidates List */}
          {!loading && jobType && (
            <div className="space-y-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-slate-700 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                            {candidate.photo ? (
                              <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-8 w-8 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-white">{candidate.name}</h2>
                            <p className="text-purple-400">{candidate.title}</p>
                            <div className="flex items-center text-sm text-slate-400 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{candidate.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex mt-4 md:mt-0 space-x-2">
                          <button
                            onClick={() => toggleSaveCandidate(candidate.id)}
                            className={`p-2 rounded-full ${
                              candidate.saved 
                                ? "bg-purple-600 text-white" 
                                : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                            } transition-colors`}
                            aria-label={candidate.saved ? "Unsave candidate" : "Save candidate"}
                          >
                            <BookmarkIcon className="h-5 w-5" />
                          </button>
                          
                          {candidate.resume && (
                            <button
                              className="p-2 rounded-full bg-slate-700 text-slate-400 hover:bg-slate-600 transition-colors"
                              aria-label="Download resume"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          )}
                          
                          <a
                            href={`mailto:${candidate.email}`}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors flex items-center"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-slate-300 text-sm">{candidate.bio}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">
                            {candidate.experience.years} years ({candidate.experience.level})
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <GraduationCap className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">{candidate.education}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-slate-300">Active {candidate.lastActive}</span>
                        </div>
                      </div>
                      
                      {(candidate.linkedin || candidate.github || candidate.website) && (
                        <div className="mt-4 flex items-center space-x-3">
                          {candidate.linkedin && (
                            <a 
                              href={`https://${candidate.linkedin}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-purple-400 transition-colors"
                            >
                              <LinkedinIcon className="h-5 w-5" />
                            </a>
                          )}
                          
                          {candidate.github && (
                            <a 
                              href={`https://${candidate.github}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-purple-400 transition-colors"
                            >
                              <GithubIcon className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-slate-800 p-8 rounded-lg text-center">
                  <User className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No candidates found</h3>
                  <p className="text-slate-400">No candidates matching the selected job type and filters</p>
                  {(selectedSkills.length > 0 || selectedExperience.length > 0 || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CandidatesByJobTypePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading candidates...</p>
        </div>
      </div>
    }>
      <CandidatesByJobTypeContent />
    </Suspense>
  );
} 