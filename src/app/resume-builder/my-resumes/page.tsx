"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  MoreVertical, 
  Trash2, 
  Download, 
  Copy, 
  Plus,
  CalendarClock,
  ArrowUpDown,
  FolderOpen
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

type Resume = {
  id: string;
  name: string;
  lastModified: string;
  template: string;
  jobApplications: number;
  data: any;
};

export default function MyResumesPage() {
  const { data: session, status } = useSession();
  const [sortBy, setSortBy] = useState("recent");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load saved resumes from database on component mount
  useEffect(() => {
    const loadSavedResumes = async () => {
      if (status === "loading") return;
      
      if (!session || (session.user as any)?.role !== "jobseeker") {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/resumes?jobSeekerId=${(session.user as any).id}`);
        if (response.ok) {
          const data = await response.json();
          setResumes(data);
        } else {
          console.error('Error loading resumes:', response.statusText);
        }
      } catch (error) {
        console.error('Error loading saved resumes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedResumes();
  }, [session, status]);
  
  // Sort resumes based on selected sort option
  const sortedResumes = [...resumes].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case "oldest":
        return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
      case "name-az":
        return a.name.localeCompare(b.name);
      case "name-za":
        return b.name.localeCompare(a.name);
      case "applications":
        return b.jobApplications - a.jobApplications;
      default:
        return 0;
    }
  });
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };
  
  const confirmDelete = (id: string) => {
    setShowDeleteConfirm(id);
    setActiveMenu(null);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting resume with ID:", id);
      
      // Use hard delete (permanently delete from database)
      const response = await fetch(`/api/resumes/${id}?soft=false`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove from local state
        const updatedResumes = resumes.filter(resume => resume.id !== id);
        setResumes(updatedResumes);
        setShowDeleteConfirm(null);
        toast.success('Resume permanently deleted successfully!');
      } else {
        const errorData: any = await response.json();
        console.error('Delete failed:', errorData);
        toast.error(errorData?.error || 'Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Error deleting resume. Please try again.');
    }
  };
  
  const handleDuplicate = async (id: string) => {
    try {
      const resumeToDuplicate = resumes.find(resume => resume.id === id);
      
      if (resumeToDuplicate) {
        // Create duplicate with new name
        const duplicateData = {
          name: `${resumeToDuplicate.name} (Copy)`,
          template: resumeToDuplicate.template,
          resumeData: resumeToDuplicate.data
        };
        
        // Save duplicate to database
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(duplicateData)
        });
        
        if (response.ok) {
          const newResume = await response.json();
          setResumes([...resumes, newResume]);
          toast.success('Resume duplicated successfully!');
        } else {
          throw new Error('Failed to duplicate resume');
        }
      }
      
      setActiveMenu(null);
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast.error('Error duplicating resume. Please try again.');
    }
  };

  const downloadResumeAsPDF = async (resume: Resume) => {
    try {
      console.log("Starting PDF generation for resume:", resume.name);
      
      // Create a temporary container for the resume
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '800px';
      container.style.backgroundColor = 'white';
      container.style.color = 'black';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.padding = '40px';
      container.style.minHeight = '800px';
      
      // Generate the resume HTML content
      const resumeData = resume.data;
      const personal = resumeData.personal || {};
      const experience = resumeData.experience || [];
      const education = resumeData.education || [];
      const skills = resumeData.skills || [];
      const languages = resumeData.languages || [];
      const achievements = resumeData.achievements || [];

      container.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: black;">
          <!-- Header -->
          <div style="margin-bottom: 30px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #1a1a1a;">
              ${personal.firstName || ''} ${personal.lastName || 'Your Name'}
            </h1>
            <p style="font-size: 18px; color: #666; margin: 5px 0 15px 0;">
              ${personal.title || 'Professional Title'}
            </p>
            
            <!-- Contact Information -->
            <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #555;">
              ${personal.email ? `<div>📧 ${personal.email}</div>` : ''}
              ${personal.phone ? `<div>📞 ${personal.phone}</div>` : ''}
              ${personal.linkedin ? `<div>🔗 ${personal.linkedin}</div>` : ''}
            </div>
          </div>
          
          <!-- Summary -->
          ${personal.summary ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 10px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                SUMMARY
              </h2>
              <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #333;">
                ${personal.summary}
              </p>
            </div>
          ` : ''}
          
          <!-- Experience -->
          ${experience.some((exp: any) => exp.position || exp.company) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                EXPERIENCE
              </h2>
              ${experience.map((exp: any) => {
                if (!exp.position && !exp.company) return '';
                return `
                  <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                      <div>
                        <p style="font-weight: bold; font-size: 14px; margin: 0; color: #1a1a1a;">${exp.position || 'Position'}</p>
                        <p style="font-size: 13px; margin: 2px 0; color: #666;">${exp.company || 'Company'}</p>
                        ${exp.location ? `<p style="font-size: 12px; margin: 0; color: #888;">📍 ${exp.location}</p>` : ''}
                      </div>
                      <div style="font-size: 12px; color: #666;">
                        ${exp.startDate && exp.endDate ? 
                          `${new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` :
                          exp.startDate ? 
                          `${new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - Present` : ''
                        }
                      </div>
                    </div>
                    ${exp.description ? `<p style="font-size: 12px; line-height: 1.4; margin: 5px 0 0 0; color: #333;">${exp.description}</p>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
          
          <!-- Education -->
          ${education.some((edu: any) => edu.institution || edu.degree) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                EDUCATION
              </h2>
              ${education.map((edu: any) => {
                if (!edu.institution && !edu.degree) return '';
                return `
                  <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                      <div>
                        <p style="font-weight: bold; font-size: 14px; margin: 0; color: #1a1a1a;">${edu.degree || 'Degree'}</p>
                        <p style="font-size: 13px; margin: 2px 0; color: #666;">${edu.institution || 'Institution'}</p>
                        ${edu.fieldOfStudy ? `<p style="font-size: 12px; margin: 0; color: #888;">${edu.fieldOfStudy}</p>` : ''}
                      </div>
                      <div style="font-size: 12px; color: #666;">
                        ${edu.startDate && edu.endDate ? 
                          `${new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - ${new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` :
                          edu.startDate ? 
                          `${new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - Present` : ''
                        }
                      </div>
                    </div>
                    ${edu.description ? `<p style="font-size: 12px; line-height: 1.4; margin: 5px 0 0 0; color: #333;">${edu.description}</p>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
          
          <!-- Skills -->
          ${skills.some((skill: any) => skill) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                SKILLS
              </h2>
              <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #333;">
                ${skills.filter((skill: any) => skill).join(', ')}
              </p>
            </div>
          ` : ''}
          
          <!-- Languages -->
          ${languages.some((lang: any) => lang) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                LANGUAGES
              </h2>
              <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #333;">
                ${languages.filter((lang: any) => lang).join(', ')}
              </p>
            </div>
          ` : ''}
          
          <!-- Achievements -->
          ${achievements.some((achievement: any) => achievement) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 5px;">
                ACHIEVEMENTS
              </h2>
              <ul style="font-size: 14px; line-height: 1.5; margin: 0; padding-left: 20px; color: #333;">
                ${achievements.filter((achievement: any) => achievement).map((achievement: any) => `<li style="margin-bottom: 5px;">${achievement}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;

      document.body.appendChild(container);
      console.log("Resume container created and appended to DOM");

      // Wait for the container to render
      await new Promise(resolve => setTimeout(resolve, 200));

      console.log("Starting html2canvas...");
      const canvas = await html2canvas(container, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: container.scrollHeight,
        logging: false
      });
      console.log("Canvas created:", canvas.width, "x", canvas.height);

      document.body.removeChild(container);
      console.log("Container removed from DOM");

      const imgData = canvas.toDataURL('image/png');
      console.log("Image data created, length:", imgData.length);
      
      console.log("Creating PDF...");
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      console.log("PDF dimensions:", { pdfWidth, pdfHeight, imgHeight });
      
      // Simple single page approach first
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multi-page approach
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      // Generate filename
      const firstName = personal.firstName || 'Resume';
      const lastName = personal.lastName || '';
      const filename = `${firstName}_${lastName}_${resume.name}.pdf`.replace(/\s+/g, '_');
      console.log("Saving PDF with filename:", filename);

      pdf.save(filename);
      
      console.log("PDF saved successfully");
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      console.error("Error details:", {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      toast.error("Failed to download resume. Please try again.");
    }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">My Resumes</h1>
            <p className="text-muted-foreground mt-2">
              Manage and organize all your saved resumes
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link
              href="/resume-builder/create"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Link>
          </motion.div>
        </div>
        
        {/* Filters and Sorting */}
        {resumes.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium">
              {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="name-az">Name (A-Z)</option>
                <option value="name-za">Name (Z-A)</option>
                <option value="applications">Job Applications</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your resumes...</p>
          </div>
        )}
        
        {/* Not authenticated */}
        {!isLoading && (!session || (session.user as any)?.role !== "jobseeker") && (
          <div className="text-center py-20 bg-background border border-border rounded-xl">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">Please log in</h3>
            <p className="mt-1 text-muted-foreground">You need to be logged in as a job seeker to view your resumes</p>
            <Link
              href="/auth/jobseeker/login"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          </div>
        )}
        
        {/* Resumes List */}
        {!isLoading && session && (session.user as any)?.role === "jobseeker" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {sortedResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedResumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {showDeleteConfirm === resume.id ? (
                      <div className="p-6">
                        <p className="text-center mb-2 font-medium">Permanently Delete Resume</p>
                        <p className="text-center mb-4 text-sm text-muted-foreground">
                          This action cannot be undone. The resume will be permanently deleted from the database.
                        </p>
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleDelete(resume.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Delete Permanently
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative h-48 bg-muted flex items-center justify-center border-b border-border">
                          <FileText className="w-16 h-16 text-primary/40" />
                          <div className="absolute top-3 right-3">
                            <div className="relative">
                              <button
                                onClick={() => toggleMenu(resume.id)}
                                className="p-1 rounded-full hover:bg-background/80"
                              >
                                <MoreVertical className="w-5 h-5" />
                              </button>
                              
                              {activeMenu === resume.id && (
                                <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10">
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleDuplicate(resume.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted"
                                    >
                                      <Copy className="w-4 h-4 mr-3" />
                                      Duplicate
                                    </button>
                                    <button
                                      onClick={() => downloadResumeAsPDF(resume)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted"
                                    >
                                      <Download className="w-4 h-4 mr-3" />
                                      Download PDF
                                    </button>
                                    <div className="border-t border-border my-1"></div>
                                    <button
                                      onClick={() => confirmDelete(resume.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-muted"
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium text-lg truncate">{resume.name}</h3>
                          <div className="mt-2 flex flex-col space-y-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarClock className="w-3.5 h-3.5 mr-1.5" />
                              Last modified: {formatDate(resume.lastModified)}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FileText className="w-3.5 h-3.5 mr-1.5" />
                              Template: {resume.template}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                              {resume.jobApplications} job applications
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <button
                              onClick={() => downloadResumeAsPDF(resume)}
                              className="flex-1 py-1.5 bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors"
                            >
                              Download
                            </button>
                            <button
                              onClick={() => confirmDelete(resume.id)}
                              className="flex-1 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-background border border-border rounded-xl">
                <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No resumes yet</h3>
                <p className="mt-1 text-muted-foreground">Create your first resume to get started</p>
                <Link
                  href="/resume-builder/create"
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Resume
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 