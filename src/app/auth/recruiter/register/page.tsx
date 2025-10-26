"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Briefcase, Users, BarChart3, Eye, EyeOff, Building, User as UserIcon, Mail, Lock, Phone, Globe, FileText, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function RecruiterRegisterPage() {
  const router = useRouter();
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Personal Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  // Company Details
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyWebsiteError, setCompanyWebsiteError] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyDescription, setCompanyDescription] = useState("");
  
  // Company Address
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeSection, setActiveSection] = useState(1);

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

  // Validate company website when it changes
  useEffect(() => {
    if (companyWebsite) {
      try {
        // Add https:// if it doesn't have a protocol
        let urlToTest = companyWebsite;
        if (!urlToTest.match(/^https?:\/\//)) {
          urlToTest = 'https://' + urlToTest;
        }
        new URL(urlToTest);
        setCompanyWebsiteError("");
      } catch (err) {
        setCompanyWebsiteError("Please enter a valid URL (e.g., www.example.com)");
      }
    } else {
      setCompanyWebsiteError("");
    }
  }, [companyWebsite]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
    // Validate inputs before submission
    if (emailError || companyWebsiteError || passwordError) {
        throw new Error("Please fix the errors before submitting");
    }
    
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (!agreeToTerms) {
        throw new Error("Please agree to the terms and conditions");
    }
    
      // Create recruiter data object
      const recruiterData = {
        email,
        password,
        fullName,
        phone,
        position: jobTitle,
        companyName,
        companySize,
      industry: companyIndustry,
      website: companyWebsite,
        city,
        state,
        country,
        companyDescription,
    };
    
      // Send data to API
      const response = await fetch("/api/auth/recruiter/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recruiterData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! Please log in.");
      router.push("/auth/recruiter/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate between sections
  const nextSection = () => {
    if (activeSection < 3) {
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
            <h1 className="text-3xl font-bold mb-2 text-foreground">Create Recruiter Account</h1>
            <p className="text-muted-foreground text-sm">
              Join ConnectFlow to find the best talent for your company.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section Progress Indicator */}
            <div className="flex mb-6 items-center justify-between">
              <div 
                className={`w-1/3 text-center py-2 text-xs font-medium rounded-l-md ${activeSection === 1 ? 'bg-primary text-foreground' : 'bg-background text-muted-foreground'}`}
              >
                Personal
              </div>
              <div 
                className={`w-1/3 text-center py-2 text-xs font-medium ${activeSection === 2 ? 'bg-primary text-foreground' : 'bg-background text-muted-foreground'}`}
              >
                Company
              </div>
              <div 
                className={`w-1/3 text-center py-2 text-xs font-medium rounded-r-md ${activeSection === 3 ? 'bg-primary text-foreground' : 'bg-background text-muted-foreground'}`}
              >
                Address
              </div>
            </div>

            {/* Section 1: Personal Details */}
            {activeSection === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg text-foreground mb-3">👤 Personal Details</h2>
                
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
                      minLength={8}
                      className={`w-full pl-10 pr-10 py-2.5 bg-background border ${passwordError ? 'border-red-500' : 'border-border'} rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {passwordError && (
                    <div className="mt-1 text-xs text-red-500 space-y-1">
                      <p>Password must include:</p>
                      <ul className="list-disc list-inside ml-2">
                        {passwordError.split(". ").map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="HR Manager, Tech Recruiter, etc."
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextSection}
                    className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150"
                  >
                    Next: Company Details
                  </button>
                </div>
              </div>
            )}
            
            {/* Section 2: Company Details */}
            {activeSection === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg text-foreground mb-3">🏢 Company Details</h2>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Your company's name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-foreground mb-1">
                    Company Website (optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      id="companyWebsite"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-background border ${companyWebsiteError ? 'border-red-500' : 'border-border'} rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
                      placeholder="www.yourcompany.com"
                    />
                  </div>
                  {companyWebsiteError && <p className="mt-1 text-xs text-red-500">{companyWebsiteError}</p>}
                </div>
                
                <div>
                  <label htmlFor="companyIndustry" className="block text-sm font-medium text-foreground mb-1">
                    Company Industry
                  </label>
                  <select
                    id="companyIndustry"
                    value={companyIndustry}
                    onChange={(e) => setCompanyIndustry(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select an industry</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Media">Media & Communication</option>
                    <option value="Construction">Construction</option>
                    <option value="Hospitality">Hospitality & Tourism</option>
                    <option value="Transportation">Transportation & Logistics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-foreground mb-1">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="companyLogo" className="block text-sm font-medium text-foreground mb-1">
                    Company Logo (optional)
                  </label>
                  <input
                    type="file"
                    id="companyLogo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm text-foreground"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyDescription" className="block text-sm font-medium text-foreground mb-1">
                    Company Description
                  </label>
                  <div className="relative">
                    <textarea
                      id="companyDescription"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Brief description of your company"
                    />
                  </div>
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
                    type="button"
                    onClick={nextSection}
                    className="w-1/2 bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150"
                  >
                    Next: Company Address
                  </button>
                </div>
              </div>
            )}
            
            {/* Section 3: Company Address */}
            {activeSection === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg text-foreground mb-3">📍 Company Address</h2>
                
                <div>
                  <label htmlFor="addressLine" className="block text-sm font-medium text-foreground mb-1">
                    Address Line
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      id="addressLine"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Street address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="State/Province"
                  />
                </div>
                
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-1">
                    Pincode / ZIP Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="Postal/ZIP code"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="Country"
                  />
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
                    <Link href="/terms-of-service" passHref><span className="text-primary hover:text-purple-300 cursor-pointer">Terms of Service</span></Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" passHref><span className="text-primary hover:text-purple-300 cursor-pointer">Privacy Policy</span></Link>.
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
            <Link href="/auth/recruiter/login" passHref>
              <span className="font-medium text-primary hover:text-purple-300 cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </div>

        {/* Right Side: Feature Panel */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 md:p-12 flex flex-col justify-center rounded-r-lg md:rounded-r-lg rounded-l-lg md:rounded-l-none">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Build Your Dream Team</h2>
            <p className="text-purple-200 mb-8 text-sm leading-relaxed">
              Access your recruiter dashboard to post jobs, manage applications, and connect with the best talent.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Post Unlimited Jobs</h3>
                  <p className="text-purple-200 text-xs">Create and manage job listings to find the perfect candidates.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Talent Search</h3>
                  <p className="text-purple-200 text-xs">Browse our candidate database and filter by skills and experience.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analytics Dashboard</h3>
                  <p className="text-purple-200 text-xs">Track performance metrics and optimize your recruitment process.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}