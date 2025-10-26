"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Briefcase, Users, BarChart3, Eye, EyeOff, Building, User as UserIcon, Mail, Lock, Phone, Globe, FileText, MapPin, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function JobSeekerRegisterPage() {
  const router = useRouter();
  
  // Personal Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  
  // Professional Details
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinUrlError, setLinkedinUrlError] = useState("");
  const [preferredJobTypes, setPreferredJobTypes] = useState<string[]>([]);
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Validate email when it changes
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [email]);

  // Validate password when it changes
  useEffect(() => {
    if (password) {
      const errors = [];
      
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      
      if (!/[A-Z]/.test(password)) {
        errors.push("Include at least one uppercase letter");
      }
      
      if (!/[a-z]/.test(password)) {
        errors.push("Include at least one lowercase letter");
      }
      
      if (!/[0-9]/.test(password)) {
        errors.push("Include at least one number");
      }
      
      if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push("Include at least one special character");
      }
      
      if (errors.length > 0) {
        setPasswordError(errors.join(". "));
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [password]);

  // Validate LinkedIn URL when it changes
  useEffect(() => {
    if (linkedinUrl) {
      try {
        // Add https:// if it doesn't have a protocol
        let urlToTest = linkedinUrl;
        if (!urlToTest.match(/^https?:\/\//)) {
          urlToTest = 'https://' + urlToTest;
        }
        new URL(urlToTest);
        if (!urlToTest.includes('linkedin.com')) {
          setLinkedinUrlError("Please enter a valid LinkedIn URL");
        } else {
          setLinkedinUrlError("");
        }
      } catch (err) {
        setLinkedinUrlError("Please enter a valid URL");
      }
    } else {
      setLinkedinUrlError("");
    }
  }, [linkedinUrl]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs before submission
      if (emailError || linkedinUrlError || passwordError) {
        throw new Error("Please fix the errors before submitting");
      }
      
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (!agreeToTerms) {
        throw new Error("Please agree to the terms and conditions");
      }

      // Create job seeker data object
      const jobSeekerData = {
        email,
        password,
        fullName,
        phone,
        currentJobTitle,
        yearsOfExperience,
        education,
        skills,
        linkedinUrl,
        preferredJobTypes,
        preferredLocations,
        expectedSalary,
        noticePeriod,
      };

      // Send data to API
      const response = await fetch("/api/auth/jobseeker/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobSeekerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! Please log in.");
      router.push("/auth/jobseeker/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate between sections
  const nextSection = () => {
    if (activeSection < 2) {
      setActiveSection(activeSection + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 pt-24 pb-16">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-card shadow-2xl rounded-lg overflow-hidden border border-border">
        {/* Left Side: Registration Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Create Job Seeker Account</h1>
            <p className="text-muted-foreground text-sm">
              Join ConnectFlow to find your dream job.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section Progress Indicator */}
            <div className="flex mb-6 items-center justify-between">
              <div 
                className={`w-1/2 text-center py-2 text-xs font-medium rounded-l-md ${activeSection === 1 ? 'bg-primary text-foreground' : 'bg-background text-muted-foreground'}`}
              >
                Personal Details
              </div>
              <div 
                className={`w-1/2 text-center py-2 text-xs font-medium rounded-r-md ${activeSection === 2 ? 'bg-primary text-foreground' : 'bg-background text-muted-foreground'}`}
              >
                Professional Details
              </div>
            </div>

            {/* Section 1: Personal Details */}
            {activeSection === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full pl-10 pr-4 py-2.5 bg-background border ${emailError ? 'border-red-500' : 'border-border'} rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full pl-10 pr-10 py-2.5 bg-background border ${passwordError ? 'border-red-500' : 'border-border'} rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextSection}
                    className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150"
                  >
                    Next: Professional Details
                  </button>
                </div>
              </div>
            )}

            {/* Section 2: Professional Details */}
            {activeSection === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentJobTitle" className="block text-sm font-medium text-foreground mb-1">
                    Current Job Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="currentJobTitle"
                      value={currentJobTitle}
                      onChange={(e) => setCurrentJobTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="e.g., Software Engineer, Product Manager"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-foreground mb-1">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      id="yearsOfExperience"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      required
                      min="0"
                      max="50"
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Years of experience"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-foreground mb-1">
                    Education
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="e.g., B.Tech Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-1">
                    Skills
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="skills"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Add a skill"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2.5 bg-primary text-foreground rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800"
                    >
                      Add
                    </button>
                  </div>
                  {skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-foreground"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-foreground mb-1">
                    Resume (PDF)
                  </label>
                    <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    onChange={handleResumeChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium text-foreground mb-1">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-background border ${linkedinUrlError ? 'border-red-500' : 'border-border'} rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>
                  {linkedinUrlError && <p className="mt-1 text-xs text-red-500">{linkedinUrlError}</p>}
                </div>

                <div>
                  <label htmlFor="expectedSalary" className="block text-sm font-medium text-foreground mb-1">
                    Expected Salary (Annual)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      id="expectedSalary"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Expected annual salary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="noticePeriod" className="block text-sm font-medium text-foreground mb-1">
                    Notice Period (Days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      id="noticePeriod"
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      min="0"
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Notice period in days"
                    />
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <input
                    id="agree-to-terms"
                    name="agree-to-terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                    className="h-4 w-4 mt-0.5 text-purple-600 bg-background border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="agree-to-terms" className="ml-2 block text-xs text-muted-foreground">
                    I agree to the ConnectFlow{' '}
                    <Link href="/terms-of-service" passHref><span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms of Service</span></Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" passHref><span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span></Link>.
                  </label>
              </div>

                <div className="flex gap-3 pt-4">
                <button
                  type="button"
                    onClick={prevSection}
                    className="w-1/2 bg-background text-foreground font-semibold py-3 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors duration-150"
                  >
                    Back
                </button>
                <button
                  type="submit"
                    disabled={!agreeToTerms || isLoading}
                    className={`w-1/2 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-150 ${
                      agreeToTerms && !isLoading
                        ? 'bg-white text-slate-900 hover:bg-slate-200 focus:ring-white'
                        : 'bg-slate-600 text-muted-foreground cursor-not-allowed'
                    }`}
                >
                  {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                      </div>
                  ) : (
                      'Create Account'
                  )}
                </button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/jobseeker/login" passHref>
              <span className="font-medium text-purple-400 hover:text-purple-300 cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </div>

        {/* Right Side: Feature Panel */}
        <div className="hidden md:block bg-gradient-to-br from-purple-600 to-purple-800 p-8 md:p-12">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Join ConnectFlow?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-foreground" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-foreground">Find Your Dream Job</h3>
                  <p className="mt-1 text-purple-100">
                    Access thousands of job opportunities from top companies across India.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-foreground">Connect with Employers</h3>
                  <p className="mt-1 text-purple-100">
                    Get noticed by leading employers and receive direct job offers.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-foreground" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-foreground">Track Your Progress</h3>
                  <p className="mt-1 text-purple-100">
                    Monitor your job applications and interview status in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}