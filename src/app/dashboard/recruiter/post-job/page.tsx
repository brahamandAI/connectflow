"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  Globe, 
  Laptop, 
  GraduationCap,
  ChevronDown,
  Save,
  X,
  Plus,
  Trash2,
  Wand2,
  Users
} from "lucide-react";
import { CurrencyIcon } from "@/utils/currency";
import { toast } from "react-hot-toast";

export default function PostJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recruiterData, setRecruiterData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [jobPosted, setJobPosted] = useState(false);
  
  // Job form data
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("onsite");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [experienceLevel, setExperienceLevel] = useState("entry");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("INR");
  const [salaryPeriod, setSalaryPeriod] = useState("annual");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [openings, setOpenings] = useState("1");
  const [formError, setFormError] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any)?.role !== "recruiter") {
      router.replace("/auth/recruiter/login");
      return;
    }
    setRecruiterData(session.user);
    // If you need companyData, fetch it from your API using session.user info
  }, [session, status, router]);
  
  // Handle list item changes (responsibilities, requirements, benefits)
  const handleListItemChange = (
    index: number, 
    value: string, 
    listType: "responsibilities" | "requirements" | "benefits"
  ) => {
    if (listType === "responsibilities") {
      const newResponsibilities = [...responsibilities];
      newResponsibilities[index] = value;
      setResponsibilities(newResponsibilities);
    } else if (listType === "requirements") {
      const newRequirements = [...requirements];
      newRequirements[index] = value;
      setRequirements(newRequirements);
    } else if (listType === "benefits") {
      const newBenefits = [...benefits];
      newBenefits[index] = value;
      setBenefits(newBenefits);
    }
  };
  
  // Add new item to list
  const addListItem = (listType: "responsibilities" | "requirements" | "benefits") => {
    if (listType === "responsibilities") {
      setResponsibilities([...responsibilities, ""]);
    } else if (listType === "requirements") {
      setRequirements([...requirements, ""]);
    } else if (listType === "benefits") {
      setBenefits([...benefits, ""]);
    }
  };
  
  // Remove item from list
  const removeListItem = (
    index: number, 
    listType: "responsibilities" | "requirements" | "benefits"
  ) => {
    if (listType === "responsibilities" && responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    } else if (listType === "requirements" && requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    } else if (listType === "benefits" && benefits.length > 1) {
      const newBenefits = [...benefits];
      newBenefits.splice(index, 1);
      setBenefits(newBenefits);
    }
  };
  
  // Handle AI enhancement
  const handleEnhanceWithAI = async () => {
    if (!description.trim()) {
      toast.error("Please enter a job description first");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/ai-tools/enhance-job-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance job description");
      }

      const data = await response.json();
      
      // Apply enhanced description
      setDescription(data.enhancedDescription);
      
      // Apply enhanced requirements
      if (data.requirements && data.requirements.length > 0) {
        setRequirements(data.requirements.filter((req: string) => req.trim() !== ""));
      }
      
      // Apply enhanced responsibilities
      if (data.responsibilities && data.responsibilities.length > 0) {
        setResponsibilities(data.responsibilities.filter((resp: string) => resp.trim() !== ""));
      }
      
      toast.success("Job description enhanced successfully!");
    } catch (error) {
      console.error("Error enhancing job description:", error);
      toast.error("Failed to enhance job description. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    // Validate form
    if (!title || !location || !description) {
      setFormError("Please fill in all required fields");
      return;
    }
    // Prepare job data
    const jobData = {
      title,
      department,
      company: companyData ? companyData.name : (recruiterData ? recruiterData.companyName || recruiterData.fullName + "'s Company" : "Company"),
      companyId: companyData ? companyData.id : null,
      location,
      locationType,
      employmentType,
      experienceLevel,
      salaryMin: salaryMin ? parseInt(salaryMin) : null,
      salaryMax: salaryMax ? parseInt(salaryMax) : null,
      salaryCurrency,
      salaryPeriod,
      description,
      responsibilities: responsibilities.filter(item => item.trim() !== ""),
      requirements: requirements.filter(item => item.trim() !== ""),
      benefits: benefits.filter(item => item.trim() !== ""),
      applicationDeadline,
      applicationUrl,
      openings: openings ? parseInt(openings) : 1,
    };
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (res.ok) {
        setJobPosted(true);
        setTimeout(() => {
          setJobPosted(false);
          router.push("/dashboard/recruiter");
        }, 3000);
      } else {
        const errorData = await res.json();
        setFormError(errorData.details || "Error saving job. Please try again.");
      }
    } catch (error) {
      console.error("Error saving job data:", error);
      setFormError("Error saving job. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8 mt-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Post a New Job</h1>
              <Link 
                href="/dashboard/recruiter" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown className="h-4 w-4 rotate-90 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <p className="text-muted-foreground mt-2">
              {companyData ? `Create a job posting for ${companyData.name}` : "Create a new job posting"}
            </p>
          </motion.div>

          {/* Success message */}
          {jobPosted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6 flex items-center"
            >
              <div className="flex-shrink-0 rounded-full p-1 bg-green-500/20 mr-3">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Job posted successfully!</p>
                <p className="text-sm opacity-80">Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}

          {/* Error message */}
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-center"
            >
              <div className="flex-shrink-0 rounded-full p-1 bg-red-500/20 mr-3">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <p className="font-medium">{formError}</p>
            </motion.div>
          )}

          {/* Job Post Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold mb-1">Job Details</h2>
              <p className="text-muted-foreground text-sm">Fill in the details of the job posting</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic job information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                      placeholder="e.g. Frontend Developer"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                      placeholder="e.g. Engineering"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                      placeholder="e.g. Mumbai, India"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="locationType" className="block text-sm font-medium mb-1">
                    Location Type
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      id="locationType"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors appearance-none"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="employmentType" className="block text-sm font-medium mb-1">
                    Employment Type
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      id="employmentType"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors appearance-none"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                      <option value="internship">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium mb-1">
                    Experience Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      id="experienceLevel"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors appearance-none"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior</option>
                      <option value="executive">Executive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="openings" className="block text-sm font-medium mb-1">
                    Number of Openings
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="number"
                      id="openings"
                      value={openings}
                      onChange={(e) => setOpenings(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Salary information */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-3">Salary Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="salaryMin" className="block text-sm font-medium mb-1">
                      Minimum Salary
                    </label>
                    <div className="relative">
                      <CurrencyIcon currency={salaryCurrency} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="salaryMin"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="Min"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryMax" className="block text-sm font-medium mb-1">
                      Maximum Salary
                    </label>
                    <div className="relative">
                      <CurrencyIcon currency={salaryCurrency} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="salaryMax"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="Max"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryCurrency" className="block text-sm font-medium mb-1">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        id="salaryCurrency"
                        value={salaryCurrency}
                        onChange={(e) => setSalaryCurrency(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors appearance-none"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryPeriod" className="block text-sm font-medium mb-1">
                      Period
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <select
                        id="salaryPeriod"
                        value={salaryPeriod}
                        onChange={(e) => setSalaryPeriod(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors appearance-none"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job description */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Job Description</h3>
                  <button
                    type="button"
                    onClick={handleEnhanceWithAI}
                    disabled={isEnhancing}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEnhancing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        <span>Enhance with AI</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                    placeholder="Describe the job position, role, and company culture..."
                  ></textarea>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Use "Enhance with AI" to automatically improve your description and fill requirements & responsibilities sections
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Responsibilities</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("responsibilities")}
                    className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Responsibility
                  </button>
                </div>
                
                <div className="space-y-3">
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => handleListItemChange(index, e.target.value, "responsibilities")}
                        className="flex-1 px-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="Enter a responsibility"
                      />
                      {responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "responsibilities")}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Requirements</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("requirements")}
                    className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Requirement
                  </button>
                </div>
                
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleListItemChange(index, e.target.value, "requirements")}
                        className="flex-1 px-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="Enter a requirement"
                      />
                      {requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "requirements")}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Benefits</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("benefits")}
                    className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Benefit
                  </button>
                </div>
                
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleListItemChange(index, e.target.value, "benefits")}
                        className="flex-1 px-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="Enter a benefit"
                      />
                      {benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "benefits")}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Application details */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-3">Application Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="applicationDeadline" className="block text-sm font-medium mb-1">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="date"
                        id="applicationDeadline"
                        value={applicationDeadline}
                        onChange={(e) => setApplicationDeadline(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicationUrl" className="block text-sm font-medium mb-1">
                      External Application URL (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="url"
                        id="applicationUrl"
                        value={applicationUrl}
                        onChange={(e) => setApplicationUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors"
                        placeholder="https://example.com/apply"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="px-6 py-4 bg-secondary/20 flex justify-end border-t border-border">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
} 