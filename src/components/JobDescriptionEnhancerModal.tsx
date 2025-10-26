"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Wand2, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Users, 
  Sparkles,
  Copy,
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

interface JobDescriptionEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  onApplyEnhancement: (enhancedDescription: string) => void;
}

export default function JobDescriptionEnhancerModal({
  isOpen,
  onClose,
  originalDescription,
  onApplyEnhancement
}: JobDescriptionEnhancerModalProps) {
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

  const handleApply = () => {
    if (enhancedDescription) {
      onApplyEnhancement(enhancedDescription);
      onClose();
      toast.success("Enhanced description applied!");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  AI Job Description Enhancer
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Make your job description more professional, bias-free, and ATS-optimized
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Original Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-emerald-600" />
                  Original Description
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans">
                    {originalDescription || "No description provided"}
                  </pre>
                </div>
                <button
                  onClick={handleEnhance}
                  disabled={isLoading || !originalDescription.trim()}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{isLoading ? "Enhancing..." : "Enhance Description"}</span>
                </button>
              </div>

              {/* Enhanced Description */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-teal-600" />
                    Enhanced Description
                  </h3>
                  {enhancedDescription && (
                    <button
                      onClick={() => handleCopy(enhancedDescription)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
                  {enhancedDescription ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans">
                      {enhancedDescription}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Enhanced description will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            {result && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full flex items-center justify-between text-left mb-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
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
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Bias Analysis */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-blue-600" />
                            Bias Analysis
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(result.biasAnalysis.score)} ${getScoreColor(result.biasAnalysis.score)}`}>
                            {result.biasAnalysis.score}/10
                          </span>
                        </div>
                        {result.biasAnalysis.issues.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs text-red-600 dark:text-red-400 font-medium">Issues Found:</p>
                            <ul className="space-y-1">
                              {result.biasAnalysis.issues.slice(0, 2).map((issue, index) => (
                                <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                  <AlertTriangle className="w-3 h-3 mr-1 mt-0.5 text-red-500 flex-shrink-0" />
                                  {issue}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(result.atsOptimization.score)} ${getScoreColor(result.atsOptimization.score)}`}>
                            {result.atsOptimization.score}/10
                          </span>
                        </div>
                        {result.atsOptimization.keywords.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Key Keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {result.atsOptimization.keywords.slice(0, 3).map((keyword, index) => (
                                <span key={index} className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Readability Score */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                            Readability
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(result.readabilityScore)} ${getScoreColor(result.readabilityScore)}`}>
                            {result.readabilityScore}/10
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {result.readabilityScore >= 8 
                            ? "Excellent readability"
                            : result.readabilityScore >= 6 
                            ? "Good readability"
                            : "Needs improvement"
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!enhancedDescription}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Enhancement
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
