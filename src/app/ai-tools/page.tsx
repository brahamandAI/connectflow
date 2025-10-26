"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Users, 
  ArrowRight, 
  Zap,
  Target,
  Star,
  Brain,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

const aiTools = [
  {
    name: "Job Recommendations",
    description: "Get AI-powered job recommendations tailored to your profile, skills, and career goals",
    icon: <Brain className="w-8 h-8" />,
    href: "/ai-tools/job-recommendations",
    color: "from-purple-500 to-blue-500",
    status: "active",
    features: ["Personalized Matches", "Career Analysis", "Smart Filtering"]
  },
  {
    name: "Resume Enhancer",
    description: "Transform your resume with AI-powered enhancements and professional language optimization",
    icon: <Wand2 className="w-8 h-8" />,
    href: "/ai-tools/resume-enhancer",
    color: "from-emerald-500 to-teal-500",
    status: "active",
    features: ["ATS Optimization", "Professional Language", "Smart Suggestions"]
  },
  {
    name: "Job Description Enhancer",
    description: "Assists recruiters in writing clear, professional, and bias-free job descriptions optimized for ATS",
    icon: <FileText className="w-8 h-8" />,
    href: "/ai-tools/job-description-enhancer",
    color: "from-green-500 to-blue-500",
    status: "active",
    features: ["Bias Detection", "ATS Optimization", "Professional Language"]
  },
  {
    name: "Career Path Advisor",
    description: "Get personalized career guidance, discover growth opportunities, and find the perfect path to advance your professional journey",
    icon: <TrendingUp className="w-8 h-8" />,
    href: "/ai-tools/career-path-advisor",
    color: "from-indigo-500 to-purple-500",
    status: "active",
    features: ["Career Analysis", "Growth Opportunities", "Skill Recommendations"]
  },
  {
    name: "Cover Letter Generator",
    description: "Generate personalized cover letters tailored to specific job requirements",
    icon: <FileText className="w-8 h-8" />,
    href: "/ai-tools/cover-letter",
    color: "from-cyan-500 to-blue-500",
    status: "coming-soon",
    features: ["AI-Powered Generation", "Job-Specific Customization", "Multiple Templates"]
  },
  {
    name: "Interview Prep",
    description: "Get AI-powered interview questions tailored to specific job descriptions and practice with confidence",
    icon: <Users className="w-8 h-8" />,
    href: "/ai-tools/interview-prep",
    color: "from-orange-500 to-red-500",
    status: "active",
    features: ["Job-Specific Questions", "Practice Sessions", "Answer Guidance"]
  }
];

const benefits = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Intelligence",
    description: "Leverage advanced AI to optimize your job search materials"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "ATS Optimization",
    description: "Ensure your applications pass through Applicant Tracking Systems"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Higher Success Rate",
    description: "Increase your chances of getting interviews and job offers"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Time Saving",
    description: "Save hours of manual work with automated AI assistance"
  }
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Supercharge your job search with our cutting-edge AI-powered tools. 
            From resume enhancement to interview preparation, we've got you covered.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Coming Soon</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Tool - Job Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold">New: AI Job Recommendations</h2>
            </div>
            <p className="text-xl mb-6 opacity-90">
              Get personalized job recommendations based on your profile, skills, and career goals. 
              Let AI find the perfect opportunities for you.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/ai-tools/job-recommendations"
                className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Get Job Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-3 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">AI-Powered</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={tool.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-r ${tool.color} rounded-xl`}>
                        <div className="text-white">
                          {tool.icon}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {tool.status === "active" ? (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">
                            Coming Soon
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Our AI Tools?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the future of job searching with intelligent automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start with our Resume Enhancer and see the difference AI can make
            </p>
            <Link
              href="/ai-tools/resume-enhancer"
              className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 