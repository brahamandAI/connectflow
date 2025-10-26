"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Wand2, 
  Upload, 
  Download, 
  Sparkles, 
  Copy, 
  Check,
  FileText,
  Target,
  Zap,
  Star,
  ArrowRight,
  Loader2,
  File,
  Briefcase,
  X,
  AlertCircle,
  Search,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple PDF text extraction using browser capabilities
const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // For now, we'll show a helpful message and let users paste manually
    // This avoids all the complex PDF parsing issues in the browser
    resolve(`PDF file "${file.name}" uploaded successfully!

To extract text from your PDF resume, please:
1. Open your PDF file in a PDF reader
2. Select all text (Ctrl+A / Cmd+A)
3. Copy the text (Ctrl+C / Cmd+C)
4. Paste it in the text area below

This ensures the best text extraction quality and avoids browser compatibility issues.`);
  });
};

interface EnhancementSuggestion {
  id: string;
  type: "content" | "style" | "grammar" | "format" | "keyword" | "achievement";
  section: string;
  original: string;
  suggestion: string;
  explanation: string;
  priority: "high" | "medium" | "low";
  action: "replace" | "add" | "remove" | "reorganize";
}

interface AIResponse {
  suggestions: EnhancementSuggestion[];
  summary: string;
}

export default function ResumeEnhancerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [enhancedText, setEnhancedText] = useState("");
  const [suggestions, setSuggestions] = useState<EnhancementSuggestion[]>([]);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isExtractingPDF, setIsExtractingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file extension instead of MIME type for better compatibility
      const fileName = file.name.toLowerCase();
      const isTextFile = fileName.endsWith('.txt');
      const isPdfFile = fileName.endsWith('.pdf');
      
      if (isTextFile || isPdfFile) {
        setUploadedFile(file);
        setFileName(file.name);
        setError("");
        
        // Read text file content
        if (isTextFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            setResumeText(text);
          };
          reader.onerror = () => {
            setError("Failed to read the text file. Please try again.");
          };
          reader.readAsText(file);
        } else if (isPdfFile) {
          // Extract text from PDF
          setIsExtractingPDF(true);
          try {
            const extractedText = await extractTextFromPDF(file);
            setResumeText(extractedText);
            setError("");
          } catch (error) {
            console.error('PDF extraction error:', error);
            setError("Failed to extract text from PDF. Please copy and paste your resume content manually.");
            setResumeText("");
          } finally {
            setIsExtractingPDF(false);
          }
        }
      } else {
        setError("Please upload a .txt or .pdf file");
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileName("");
    setResumeText("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const fileName = file.name.toLowerCase();
      const isTextFile = fileName.endsWith('.txt');
      const isPdfFile = fileName.endsWith('.pdf');
      
      if (isTextFile || isPdfFile) {
        setUploadedFile(file);
        setFileName(file.name);
        setError("");
        
        if (isTextFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            setResumeText(text);
          };
          reader.onerror = () => {
            setError("Failed to read the text file. Please try again.");
          };
          reader.readAsText(file);
        } else if (isPdfFile) {
          // Extract text from PDF
          setIsExtractingPDF(true);
          try {
            const extractedText = await extractTextFromPDF(file);
            setResumeText(extractedText);
            setError("");
          } catch (error) {
            console.error('PDF extraction error:', error);
            setError("Failed to extract text from PDF. Please copy and paste your resume content manually.");
            setResumeText("");
          } finally {
            setIsExtractingPDF(false);
          }
        }
      } else {
        setError("Please upload a .txt or .pdf file");
      }
    }
  };

  const handleEnhance = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both resume content and job description");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/ai/enhance-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance resume');
      }

      const data: AIResponse = await response.json();
      setSuggestions(data.suggestions || []);
      setEnhancedText(""); // We're not showing a complete enhanced resume anymore
    } catch (error) {
      console.error('Error enhancing resume:', error);
      setError('Failed to enhance resume. Please try again.');
      
      // Fallback to comprehensive enhancement for demo
      const enhanced = resumeText
        .replace(/\b(managed|led|coordinated)\b/gi, "orchestrated")
        .replace(/\b(helped|assisted)\b/gi, "facilitated")
        .replace(/\b(made|created)\b/gi, "developed")
        .replace(/\b(good|great)\b/gi, "exceptional")
        .replace(/\b(big|large)\b/gi, "substantial")
        .replace(/\b(worked on|did)\b/gi, "delivered")
        .replace(/\b(improved|made better)\b/gi, "optimized")
        .replace(/\b(used|utilized)\b/gi, "leveraged")
        .replace(/\b(learned|studied)\b/gi, "mastered")
        .replace(/\b(worked with|collaborated with)\b/gi, "partnered with");
      
      setEnhancedText(enhanced);
      
      const sampleSuggestions: EnhancementSuggestion[] = [
        {
          id: "1",
          type: "content",
          section: "Experience",
          original: "Helped customers with their problems",
          suggestion: "Facilitated customer success through proactive problem resolution",
          explanation: "More professional and action-oriented language that better matches job requirements",
          priority: "high",
          action: "replace"
        },
        {
          id: "2",
          type: "keyword",
          section: "Skills",
          original: "Good communication skills",
          suggestion: "Exceptional communication and interpersonal skills",
          explanation: "Stronger adjective and more specific language for ATS optimization",
          priority: "medium",
          action: "replace"
        },
        {
          id: "3",
          type: "achievement",
          section: "Experience",
          original: "Worked on big projects",
          suggestion: "Delivered substantial enterprise-level initiatives",
          explanation: "More impactful language with quantifiable context for better impact",
          priority: "high",
          action: "replace"
        }
      ];
      
      setSuggestions(sampleSuggestions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (enhancedText) {
      await navigator.clipboard.writeText(enhancedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (enhancedText) {
      const blob = new Blob([enhancedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "enhanced-resume.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-yellow-600 dark:text-yellow-400";
      case "low": return "text-green-600 dark:text-green-400";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grammar": return <FileText className="w-4 h-4" />;
      case "style": return <Target className="w-4 h-4" />;
      case "content": return <Zap className="w-4 h-4" />;
      case "format": return <Star className="w-4 h-4" />;
      case "keyword": return <Search className="w-4 h-4" />;
      case "achievement": return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-primary/90 rounded-full mr-4">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI Resume Enhancer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and job description to get AI-powered enhancements tailored to the specific role.
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="text-destructive">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Resume Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Upload className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-card-foreground">Upload Resume</h2>
                </div>
                
                {!uploadedFile ? (
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground/70 mb-4">
                      Supports .txt and .pdf files (PDF requires manual text copy)
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="mb-2"
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground/60">
                      Or simply paste your resume content below
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <File className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-card-foreground">{fileName}</span>
                        {isExtractingPDF && (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground">Extracting text...</span>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={removeFile}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                        disabled={isExtractingPDF}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Resume Content
                      </label>
                      {isExtractingPDF ? (
                        <div className="w-full h-64 p-4 border border-input rounded-lg bg-muted flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Extracting text from PDF...</p>
                          </div>
                        </div>
                      ) : (
                        <textarea
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                          placeholder="Your resume content will appear here after upload, or you can paste it directly..."
                          className="w-full h-64 p-4 border border-input rounded-lg resize-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                        />
                      )}
                      {!isExtractingPDF && (
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {resumeText.length} characters
                          </span>
                          {resumeText.length > 0 && (
                            <Button
                              onClick={() => setResumeText("")}
                              variant="ghost"
                              size="sm"
                              className="text-xs text-muted-foreground hover:text-destructive"
                            >
                              Clear
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Manual Text Input - Always Available */}
                {!uploadedFile && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Or Paste Your Resume Content Here
                    </label>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your resume content here...&#10;&#10;Example:&#10;• Managed a team of 5 developers&#10;• Helped customers with technical issues&#10;• Created new features for the product&#10;• Good communication skills"
                      className="w-full h-48 p-4 border border-input rounded-lg resize-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {resumeText.length} characters
                      </span>
                      {resumeText.length > 0 && (
                        <Button
                          onClick={() => setResumeText("")}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Job Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-card-foreground">Job Description</h2>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to tailor your resume...&#10;&#10;Example:&#10;We are looking for a Software Engineer with:&#10;• 3+ years of experience in React and Node.js&#10;• Strong problem-solving skills&#10;• Experience with cloud platforms (AWS/Azure)&#10;• Excellent communication skills"
                  className="w-full h-80 p-4 border border-input rounded-lg resize-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {jobDescription.length} characters
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-xl font-semibold text-card-foreground">Resume Improvement Suggestions</h2>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 min-h-80">
                  {suggestions.length > 0 ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                        <p className="text-sm text-primary font-medium">
                          💡 Here are specific improvements to make your resume more effective for this job:
                        </p>
                      </div>
                      {suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="border border-border rounded-lg p-4 bg-background">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              {getTypeIcon(suggestion.type)}
                              <span className="text-sm font-medium text-card-foreground capitalize">
                                {suggestion.type} Improvement
                              </span>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {suggestion.section}
                              </span>
                              <span className={`text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                                {suggestion.priority} priority
                              </span>
                            </div>
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded capitalize">
                              {suggestion.action}
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Current:</p>
                              <p className="text-sm bg-destructive/10 p-2 rounded border-l-4 border-destructive/30">
                                {suggestion.original}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Suggested Change:</p>
                              <p className="text-sm bg-primary/10 p-2 rounded border-l-4 border-primary/30">
                                {suggestion.suggestion}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Why this helps:</p>
                              <p className="text-sm text-card-foreground">
                                {suggestion.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your improvement suggestions will appear here</p>
                        <p className="text-xs mt-2">AI will analyze your resume and provide specific changes</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhance Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Button
              onClick={handleEnhance}
              disabled={!resumeText.trim() || !jobDescription.trim() || isLoading}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50 mx-auto shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              <span>{isLoading ? "Analyzing..." : "Get Improvement Suggestions"}</span>
            </Button>
          </motion.div>

          {/* Suggestions Section */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <div className="bg-card rounded-2xl shadow-soft-lg p-6 border border-border">
                <div className="flex items-center mb-6">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-card-foreground">Changes Applied to Your Resume</h2>
                </div>
                
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 mb-3">
                          {getTypeIcon(suggestion.type)}
                          <span className="text-sm font-medium text-card-foreground capitalize">
                            {suggestion.type} Improvement
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                            {suggestion.priority} priority
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Before:</p>
                          <p className="text-sm bg-destructive/10 p-2 rounded border-l-4 border-destructive/30">
                            {suggestion.original}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">After (Applied):</p>
                          <p className="text-sm bg-primary/10 p-2 rounded border-l-4 border-primary/30">
                            {suggestion.suggestion}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Why this change:</p>
                          <p className="text-sm text-card-foreground">
                            {suggestion.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Why Use AI Resume Enhancement?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Stand out from the crowd with AI-powered resume optimization
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "ATS Optimization",
                  description: "Optimize your resume for Applicant Tracking Systems to increase interview chances"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Professional Language",
                  description: "Transform basic language into powerful, action-oriented professional terms"
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Smart Suggestions",
                  description: "Get personalized recommendations based on industry best practices"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 