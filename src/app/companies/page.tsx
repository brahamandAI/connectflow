"use client";

import { useState, useEffect } from "react";
import { Building, MapPin, Briefcase, Search, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Define company type
interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  description: string;
  website?: string;
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term and industry filter
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      company.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      
    const matchesIndustry = industryFilter === "" || company.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  // Industry options for the filter
  const industries = ["IT", "Finance", "Healthcare", "Education", "Manufacturing", "Retail", "Other"];

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
            <h1 className="text-3xl font-bold text-foreground">Companies</h1>
            <p className="text-muted-foreground">Discover top companies hiring on RozgarHub</p>
          </motion.div>

          {/* Search and Filter */}
          <div className="bg-card p-6 rounded-lg mb-8 border border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading companies...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {/* Companies List */}
          {!loading && !error && filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mr-4 overflow-hidden">
                        {company.logo ? (
                          <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover" />
                        ) : (
                          <Building className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{company.name}</h2>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{company.description}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{company.location}</span>
                    </div>
                    
                    {company.website && (
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Globe className="h-4 w-4 mr-1" />
                        <a 
                          href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {company.website}
                        </a>
                      </div>
                    )}
                    
                    <Link 
                      href={`/companies/${company.id}`} 
                      className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      View Company
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loading && !error ? (
            <div className="bg-card p-8 rounded-lg text-center border border-border">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No companies found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 