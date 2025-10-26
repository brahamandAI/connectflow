"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Check, 
  ChevronDown,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ResumeTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [loadingImages, setLoadingImages] = useState<{[key: number]: boolean}>({});
  
  // Template data with actual resume template preview images
  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      category: "corporate",
      description: "Clean and professional design ideal for corporate roles and traditional industries.",
      featured: true,
      thumbnail: "https://placehold.co/400x300/1e40af/ffffff?text=Professional+Classic+Resume",
      popularity: 95,
    },
    {
      id: 2,
      name: "Modern Minimal",
      category: "creative",
      description: "Contemporary design with clean typography and balanced layout.",
      featured: true,
      thumbnail: "https://placehold.co/400x300/7c3aed/ffffff?text=Modern+Minimal+Resume",
      popularity: 87,
    },
    {
      id: 3,
      name: "Elegant Simple",
      category: "simple",
      description: "Simple and elegant design focusing on content with minimal visual elements.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/059669/ffffff?text=Elegant+Simple+Resume",
      popularity: 72,
    },
    {
      id: 4,
      name: "Creative Bold",
      category: "creative",
      description: "Bold and creative design for standing out in design and artistic fields.",
      featured: true,
      thumbnail: "https://placehold.co/400x300/dc2626/ffffff?text=Creative+Bold+Resume",
      popularity: 68,
    },
    {
      id: 5,
      name: "Executive Premium",
      category: "corporate",
      description: "Sophisticated design for senior-level and executive positions.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/1f2937/ffffff?text=Executive+Premium+Resume",
      popularity: 63,
    },
    {
      id: 6,
      name: "Technical Focus",
      category: "technical",
      description: "Specialized layout for technical roles with focus on skills and projects.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/0891b2/ffffff?text=Technical+Focus+Resume",
      popularity: 59,
    },
    {
      id: 7,
      name: "Startup Fresh",
      category: "creative",
      description: "Modern and vibrant design perfect for startup and tech companies.",
      featured: true,
      thumbnail: "https://placehold.co/400x300/ea580c/ffffff?text=Startup+Fresh+Resume",
      popularity: 78,
    },
    {
      id: 8,
      name: "Academic Scholar",
      category: "simple",
      description: "Clean academic design suitable for research and educational positions.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/6b21a8/ffffff?text=Academic+Scholar+Resume",
      popularity: 65,
    },
    {
      id: 9,
      name: "Design Portfolio",
      category: "creative",
      description: "Creative layout with visual elements for designers and artists.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/be185d/ffffff?text=Design+Portfolio+Resume",
      popularity: 71,
    },
    {
      id: 10,
      name: "Finance Professional",
      category: "corporate",
      description: "Conservative and trustworthy design for finance and banking roles.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/166534/ffffff?text=Finance+Professional+Resume",
      popularity: 82,
    },
    {
      id: 11,
      name: "Healthcare Clean",
      category: "healthcare",
      description: "Clean and professional design for healthcare and medical professionals.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/0369a1/ffffff?text=Healthcare+Clean+Resume",
      popularity: 69,
    },
    {
      id: 12,
      name: "Marketing Dynamic",
      category: "creative",
      description: "Dynamic and engaging design for marketing and sales professionals.",
      featured: true,
      thumbnail: "https://placehold.co/400x300/c026d3/ffffff?text=Marketing+Dynamic+Resume",
      popularity: 74,
    },
    {
      id: 13,
      name: "Legal Professional",
      category: "corporate",
      description: "Formal and authoritative design for legal professionals and attorneys.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/374151/ffffff?text=Legal+Professional+Resume",
      popularity: 67,
    },
    {
      id: 14,
      name: "Education Scholar",
      category: "simple",
      description: "Academic-focused design for teachers and educational professionals.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/92400e/ffffff?text=Education+Scholar+Resume",
      popularity: 61,
    },
    {
      id: 15,
      name: "Consultant Elite",
      category: "corporate",
      description: "Premium design for consultants and business advisors.",
      featured: false,
      thumbnail: "https://placehold.co/400x300/1e293b/ffffff?text=Consultant+Elite+Resume",
      popularity: 73,
    },
  ];
  
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "corporate", name: "Corporate" },
    { id: "creative", name: "Creative" },
    { id: "simple", name: "Simple" },
    { id: "technical", name: "Technical" },
    { id: "healthcare", name: "Healthcare" },
  ];
  
  const filteredTemplates = templates
    .filter(template => filterCategory === "all" || template.category === filterCategory)
    .filter(template => 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleImageLoad = (templateId: number) => {
    setLoadingImages(prev => ({ ...prev, [templateId]: false }));
  };

  const handleImageError = (templateId: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadingImages(prev => ({ ...prev, [templateId]: false }));
    const target = e.currentTarget;
    target.onerror = null;
    target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&blur=2`;
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Resume Templates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Choose from our collection of professionally designed resume templates to make your application stand out.
          </motion.p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 md:w-auto w-full rounded-lg border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filter options */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 p-4 border border-border rounded-lg bg-background"
            >
              <div className="font-medium mb-3">Categories</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1.5 ${
                      filterCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/70'
                    }`}
                  >
                    {filterCategory === category.id && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                  {template.thumbnail ? (
                    <>
                      {loadingImages[template.id] !== false && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      )}
                      <img 
                        src={template.thumbnail}
                        alt={`${template.name} template`}
                        className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                          loadingImages[template.id] === false ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(template.id)}
                        onError={(e) => handleImageError(template.id, e)}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                  
                  {template.featured && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      Featured
                    </div>
                  )}
                  {template.id > 10 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                      New
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mt-3">
                    <span className="font-medium">{template.popularity}%</span>
                    <div className="w-full bg-muted h-1.5 rounded-full mx-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${template.popularity}%` }}
                      ></div>
                    </div>
                    <span>Popularity</span>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      href={`/resume-builder/create?template=${template.id}`}
                      className="w-full py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md text-center hover:bg-primary/90 transition-colors block"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No templates found</h3>
            <p className="mt-1 text-muted-foreground">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 