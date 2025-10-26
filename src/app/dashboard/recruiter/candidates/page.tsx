"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Eye } from "lucide-react";
import { 
  ChevronDown,
  Search,
  User,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  LinkedinIcon,
  GithubIcon,
  BookmarkIcon,
  XIcon,
  Download,
  Clock,
  Star
} from "lucide-react";

// Candidate interface
interface Candidate {
  id: number; // Application ID (unique)
  jobSeekerId: number; // Job seeker ID (may be duplicate across applications)
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
  appliedJob?: string;
  appliedDate?: string;
  applicationStatus?: string;
}

// Predefined filters
const experienceLevels = ["Entry Level", "Junior", "Mid Level", "Senior", "Executive"];
const skillsList = ["JavaScript", "React", "Angular", "Vue", "Node.js", "Python", "Java", "C#", "PHP", "Ruby", "HTML", "CSS", "SQL", "NoSQL", "AWS", "DevOps", "UI/UX", "Mobile Dev", "Flutter", "Swift"];

export default function BrowseCandidatesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [recruiterData, setRecruiterData] = useState<any>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any)?.role !== "recruiter") {
      router.replace("/auth/recruiter/login");
      return;
    }
    // Get recruiter data and fetch candidates from API
    fetchCandidates();
  }, [session, status, router]);

  // Listen for application submissions to refresh candidates
  useEffect(() => {
    const handleApplicationSubmitted = () => {
      // Refresh candidates when a new application is submitted
      fetchCandidates();
    };

    window.addEventListener('applicationSubmitted', handleApplicationSubmitted);
    
    return () => {
      window.removeEventListener('applicationSubmitted', handleApplicationSubmitted);
    };
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // Fetch applications for this recruiter's jobs
      const applicationsRes = await fetch('/api/applications?recruiterId=' + ((session?.user as any)?.id || ''));
      if (applicationsRes.ok) {
        const applications = await applicationsRes.json();
        
        // Convert applications to candidates format
        const candidatesData = applications.map((app: any) => ({
          id: app.id, // Use application ID as unique key instead of jobSeekerId
          jobSeekerId: app.jobSeekerId, // Keep jobSeekerId for reference
          name: app.jobSeeker.fullName,
          title: app.jobSeeker.currentJobTitle || 'Job Seeker',
          location: `${app.jobSeeker.city || ''}, ${app.jobSeeker.country || ''}`.trim() || 'Location not specified',
          email: app.jobSeeker.email,
          phone: app.jobSeeker.phone,
          photo: undefined, // TODO: Add profile photos
          skills: app.jobSeeker.skills || [],
          experience: {
            years: parseInt(app.jobSeeker.yearsOfExperience) || 0,
            level: getExperienceLevel(parseInt(app.jobSeeker.yearsOfExperience) || 0)
          },
          education: app.jobSeeker.education || 'Not specified',
          linkedin: app.linkedinUrl,
          github: app.githubUrl,
          website: app.portfolioUrl,
          lastActive: new Date(app.appliedDate).toLocaleDateString(),
          resume: app.resumeUrl,
          bio: app.additionalNotes || 'No additional information provided',
          saved: false,
          jobPreferences: [app.job.title], // Show which job they applied for
          appliedJob: app.job.title,
          appliedDate: app.appliedDate,
          applicationStatus: app.status
        }));
        
        setCandidates(candidatesData);
        setFilteredCandidates(candidatesData);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
      setFilteredCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine experience level
  const getExperienceLevel = (years: number) => {
    if (years < 1) return "Entry Level";
    if (years < 3) return "Junior";
    if (years < 5) return "Mid Level";
    if (years < 8) return "Senior";
    return "Executive";
  };
  
  // Apply filters when search term, skills, or experience changes
  useEffect(() => {
    const filtered = candidates.filter(candidate => {
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
      
      return matchesSearch && matchesSkills && matchesExperience;
    });
    
    setFilteredCandidates(filtered);
  }, [searchTerm, selectedSkills, selectedExperience, candidates]);
  
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
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, saved: !candidate.saved } 
        : candidate
    );
    
    setCandidates(updatedCandidates);
    
    setFilteredCandidates(filteredCandidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, saved: !candidate.saved } 
        : candidate
    ));
    
    // Persist changes to localStorage
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  // View application for a candidate
  const viewApplication = (candidate: Candidate) => {
    // Navigate to applications page with the candidate's application
    router.push(`/dashboard/recruiter/applications?candidateId=${candidate.id}`);
  };

  // Download resume for a candidate
  const downloadResume = async (resumeUrl: string, candidateName: string) => {
    try {
      // Show loading state or disable button temporarily
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract file extension from URL or default to .pdf
      const fileExtension = resumeUrl.split('.').pop()?.toLowerCase() || 'pdf';
      const sanitizedName = candidateName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      link.download = `${sanitizedName}_resume.${fileExtension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success feedback (you can replace this with a toast notification)
      console.log(`Resume downloaded successfully for ${candidateName}`);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };
  
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
              <h1 className="text-3xl font-bold">Browse Candidates</h1>
              <Link 
                href="/dashboard/recruiter" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown className="h-4 w-4 rotate-90 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <p className="text-muted-foreground mt-2">
              Find and contact qualified candidates for your job openings
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="bg-card p-6 rounded-lg mb-8 border border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, skills, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2.5 bg-secondary border border-border rounded-md flex items-center hover:bg-secondary/80 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>Filters</span>
                {(selectedSkills.length > 0 || selectedExperience.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
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
                className="mt-4 border-t border-border pt-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Filter Candidates</h3>
                  {(selectedSkills.length > 0 || selectedExperience.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-primary/80 flex items-center"
                    >
                      <XIcon className="h-4 w-4 mr-1" />
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills filter */}
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedSkills.includes(skill)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          } transition-colors`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience level filter */}
                  <div>
                    <h4 className="font-medium mb-2">Experience Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {experienceLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => toggleExperience(level)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedExperience.includes(level)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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

          {/* Candidates List */}
          {!loading && (
            <div className="space-y-6">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, index) => (
                  <motion.div
                    key={`${candidate.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/10 transition-shadow duration-300 border border-border"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mr-4 overflow-hidden">
                            {candidate.photo ? (
                              <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold">{candidate.name}</h2>
                            <p className="text-primary">{candidate.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
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
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            } transition-colors`}
                            aria-label={candidate.saved ? "Unsave candidate" : "Save candidate"}
                          >
                            <BookmarkIcon className="h-5 w-5" />
                          </button>
                          
                          {candidate.resume && (
                            <button
                              onClick={() => downloadResume(candidate.resume!, candidate.name)}
                              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                              aria-label="Download resume"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          )}
                          
                          <a
                            href={`mailto:${candidate.email}`}
                            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors flex items-center"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm">{candidate.bio}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.skills.map((skill, i) => (
                          <span 
                            key={`${candidate.id}-skill-${i}-${skill}`} 
                            className="px-3 py-1 bg-secondary rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>
                            {candidate.experience.years} years ({candidate.experience.level})
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{candidate.education}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>Active {candidate.lastActive}</span>
                        </div>
                      </div>
                      
                      {/* Application Information */}
                      {candidate.appliedJob && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <Briefcase className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>
                                Applied for: <span className="text-primary font-medium">{candidate.appliedJob}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                candidate.applicationStatus === 'Applied' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                                candidate.applicationStatus === 'Under Review' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                candidate.applicationStatus === 'Shortlisted' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                candidate.applicationStatus === 'Rejected' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                              }`}>
                                {candidate.applicationStatus}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {candidate.appliedDate && new Date(candidate.appliedDate).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() => viewApplication(candidate)}
                                className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium rounded-md transition-colors flex items-center"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View Application
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(candidate.linkedin || candidate.github || candidate.website) && (
                        <div className="mt-4 flex items-center space-x-3">
                          {candidate.linkedin && (
                            <a 
                              href={`https://${candidate.linkedin}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <LinkedinIcon className="h-5 w-5" />
                            </a>
                          )}
                          
                          {candidate.github && (
                            <a 
                              href={`https://${candidate.github}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
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
                <div className="bg-card p-8 rounded-lg text-center border border-border">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term</p>
                  {(selectedSkills.length > 0 || selectedExperience.length > 0 || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors"
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