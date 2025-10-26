"use client";

import { useState, useEffect } from "react";
import { Building, MapPin, Globe, Briefcase, Users, Award, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CompanyDetails {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  description: string;
  website?: string;
  companySize?: string;
  companyBenefits?: string[];
  hiringNeeds?: string[];
  preferredLocations?: string[];
  bio?: string;
  linkedinUrl?: string;
  recruiter: {
    name: string;
    email: string;
    phone?: string;
    position?: string;
  };
}

export default function CompanyDetailsPage() {
  const params = useParams();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/companies/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company details');
        }
        const data = await response.json();
        setCompany(data);
    } catch (error) {
        console.error("Error fetching company details:", error);
        setError("Failed to load company details. Please try again later.");
    } finally {
      setLoading(false);
    }
    };

    if (params.id) {
      fetchCompanyDetails();
    }
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center max-w-md">
          <p className="text-red-400">{error}</p>
          <Link href="/companies" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            Return to Companies
          </Link>
        </div>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Building className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Company not found</h3>
          <Link href="/companies" className="text-purple-400 hover:text-purple-300">
            Return to Companies
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
            <Link 
              href="/companies" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
            </Link>

          {/* Company Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-lg p-8 mb-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {company.logo ? (
                  <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover" />
                  ) : (
                    <Building className="h-12 w-12 text-purple-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{company.name}</h1>
                <div className="flex flex-wrap gap-4 text-slate-400">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                    <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                      <span>{company.industry}</span>
                    </div>
                  {company.companySize && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{company.companySize}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">About {company.name}</h2>
                <p className="text-slate-300 whitespace-pre-line">{company.description}</p>
                {company.bio && (
                  <p className="text-slate-300 mt-4 whitespace-pre-line">{company.bio}</p>
                )}
              </motion.div>

              {/* Hiring Needs */}
              {company.hiringNeeds && company.hiringNeeds.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Hiring Needs</h2>
                    <div className="flex flex-wrap gap-2">
                    {company.hiringNeeds.map((need, index) => (
                        <span 
                          key={index} 
                        className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                        >
                        {need}
                        </span>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Preferred Locations */}
              {company.preferredLocations && company.preferredLocations.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Preferred Locations</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.preferredLocations.map((location, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </motion.div>
                )}
              </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Company Benefits */}
              {company.companyBenefits && company.companyBenefits.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Benefits & Perks</h2>
                  <ul className="space-y-3">
                    {company.companyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                        <span className="text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
            </motion.div>
              )}
            
              {/* Contact Information */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-800 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="space-y-4">
                  {/* Recruiter Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-300">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{company.recruiter.name}</span>
                    </div>
                    {company.recruiter.position && (
                      <div className="flex items-center text-slate-300">
                        <Briefcase className="h-5 w-5 mr-2" />
                        <span>{company.recruiter.position}</span>
                    </div>
                  )}
                    <a 
                      href={`mailto:${company.recruiter.email}`}
                      className="flex items-center text-slate-300 hover:text-purple-400 transition-colors"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                      <span>{company.recruiter.email}</span>
                    </a>
                    {company.recruiter.phone && (
                      <a 
                        href={`tel:${company.recruiter.phone}`}
                        className="flex items-center text-slate-300 hover:text-purple-400 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>{company.recruiter.phone}</span>
                      </a>
                    )}
              </div>
              
                  {/* Company Links */}
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                {company.website && (
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-slate-300 hover:text-purple-400 transition-colors"
                      >
                        <Globe className="h-5 w-5 mr-2" />
                        <span>Company Website</span>
                      </a>
                    )}
                    {company.linkedinUrl && (
                      <a 
                        href={company.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-slate-300 hover:text-purple-400 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>Company LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
} 