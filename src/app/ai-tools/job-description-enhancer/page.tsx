"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wand2, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Users, 
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { toast } from "react-hot-toast";

interface EnhancementResult {
  enhancedDescription: string;
  biasAnalysis: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  atsOptimization: {
    score: number;
    keywords: string[];
    suggestions: string[];
  };
  readabilityScore: number;
  suggestions: string[];
}

export default function JobDescriptionEnhancerPage() {
  const [originalDescription, setOriginalDescription] = useState("");
  const [enhancedDescription, setEnhancedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleEnhance = async () => {
    if (!originalDescription.trim()) {
      toast.error("Please enter a job description to enhance");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-tools/enhance-job-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: originalDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance job description");
      }

      const data = await response.json();
      setEnhancedDescription(data.enhancedDescription);
      setResult(data);
      toast.success("Job description enhanced successfully!");
    } catch (error) {
      console.error("Error enhancing job description:", error);
      toast.error("Failed to enhance job description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "bg-green-100 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-4">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Job Description Enhancer
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your job descriptions with AI-powered enhancements. 
            Ensure they're bias-free, ATS-optimized, and attract the best candidates.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-emerald-600" />
                  Original Job Description
                </h2>
                <textarea
                  value={originalDescription}
                  onChange={(e) => setOriginalDescription(e.target.value)}
                  placeholder="Paste your job description here... We'll help you make it more professional, bias-free, and ATS-optimized."
                  className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {originalDescription.length} characters
                  </span>
                  <button
                    onClick={handleEnhance}
                    disabled={isLoading || !originalDescription.trim()}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{isLoading ? "Enhancing..." : "Enhance Description"}</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-teal-600" />
                    Enhanced Description
                  </h2>
                  {enhancedDescription && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCopy(enhancedDescription)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(enhancedDescription, "enhanced-job-description.txt")}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-80">
                  {enhancedDescription ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans">
                        {enhancedDescription}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Enhanced job description will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Toggle */}
              {result && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowAnalysis(!showAnalysis)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-emerald-600" />
                      Analysis & Insights
                    </h3>
                    {showAnalysis ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {showAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 space-y-6"
                    >
                      {/* Bias Analysis */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-blue-600" />
                            Bias Analysis
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(result.biasAnalysis.score)} ${getScoreColor(result.biasAnalysis.score)}`}>
                            {result.biasAnalysis.score}/10
                          </span>
                        </div>
                        {result.biasAnalysis.issues.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">Issues Found:</p>
                            <ul className="space-y-1">
                              {result.biasAnalysis.issues.map((issue, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <AlertTriangle className="w-3 h-3 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.biasAnalysis.suggestions.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">Suggestions:</p>
                            <ul className="space-y-1">
                              {result.biasAnalysis.suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* ATS Optimization */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                            ATS Optimization
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(result.atsOptimization.score)} ${getScoreColor(result.atsOptimization.score)}`}>
                            {result.atsOptimization.score}/10
                          </span>
                        </div>
                        {result.atsOptimization.keywords.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Key Keywords:</p>
                            <div className="flex flex-wrap gap-2">
                              {result.atsOptimization.keywords.map((keyword, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.atsOptimization.suggestions.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">Suggestions:</p>
                            <ul className="space-y-1">
                              {result.atsOptimization.suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Readability Score */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                            Readability Score
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(result.readabilityScore)} ${getScoreColor(result.readabilityScore)}`}>
                            {result.readabilityScore}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {result.readabilityScore >= 8 
                            ? "Excellent readability - easy to understand for all candidates"
                            : result.readabilityScore >= 6 
                            ? "Good readability - consider simplifying some sentences"
                            : "Needs improvement - consider using simpler language and shorter sentences"
                          }
                        </p>
                      </div>

                      {/* General Suggestions */}
                      {result.suggestions.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <Users className="w-4 h-4 mr-2 text-indigo-600" />
                            General Suggestions
                          </h4>
                          <ul className="space-y-2">
                            {result.suggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-indigo-500 flex-shrink-0" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Why Use Our Job Description Enhancer?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Create job descriptions that attract top talent and pass ATS filters
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Bias Detection",
                  description: "Identify and eliminate unconscious bias in your job descriptions to attract diverse candidates"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "ATS Optimization",
                  description: "Ensure your job descriptions are optimized for Applicant Tracking Systems"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Readability Enhancement",
                  description: "Improve clarity and readability to reach a broader audience"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Keyword Optimization",
                  description: "Include relevant keywords that candidates and ATS systems look for"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Candidate Attraction",
                  description: "Craft compelling descriptions that attract the right candidates"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Professional Language",
                  description: "Enhance tone and language to sound more professional and engaging"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
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
