"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award, 
  MapPin, 
  Clock, 
  Star,
  ArrowRight,
  Sparkles,
  Brain,
  Users,
  Briefcase,
  GraduationCap,
  Zap,
  CheckCircle,
  ExternalLink,
  Download,
  Share2,
  School,
  Calendar,
  Trophy,
  Lightbulb,
  UserCheck
} from "lucide-react";
import { toast } from "react-hot-toast";

interface CareerPath {
  title: string;
  description: string;
  timeToAchieve: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  salaryRange: string;
  growthPotential: number;
  skills: string[];
  certifications: string[];
  nextSteps: string[];
}

interface StudentRoadmap {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  careerOutcomes: string[];
  milestones: {
    phase: string;
    duration: string;
    activities: string[];
    skills: string[];
  }[];
  resources: {
    courses: string[];
    books: string[];
    projects: string[];
    internships: string[];
  };
  certifications: string[];
  nextSteps: string[];
}

interface CareerAnalysis {
  currentLevel: string;
  strengths: string[];
  improvementAreas: string[];
  careerPaths: CareerPath[];
  upskillingRecommendations: {
    skills: string[];
    courses: string[];
    certifications: string[];
  };
  marketInsights: {
    demand: string;
    trends: string[];
    opportunities: string[];
  };
  studentRoadmaps?: StudentRoadmap[];
}

export default function CareerPathAdvisorPage() {
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [isStudentMode, setIsStudentMode] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<StudentRoadmap | null>(null);

  const handleAnalyze = async () => {
    if (!currentRole || !experience || !skills) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai-tools/career-path-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentRole,
          experience,
          skills,
          goals
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze career path");
      }

      const data = await response.json();
      setAnalysis(data);
      toast.success("Career analysis completed successfully!");
    } catch (error) {
      console.error("Error analyzing career path:", error);
      toast.error("Failed to analyze career path. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "Intermediate": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "Advanced": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth >= 8) return "text-green-600";
    if (growth >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Path Advisor
            </h1>
          </div>
          <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto mb-8">
            Get personalized career guidance, discover growth opportunities, and find the perfect path to advance your professional journey.
          </p>
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setIsStudentMode(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                !isStudentMode
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-2 inline" />
              Professional
            </button>
            <button
              onClick={() => setIsStudentMode(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isStudentMode
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              <School className="w-4 h-4 mr-2 inline" />
              Student
            </button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {!analysis ? (
            /* Input Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
            >
              <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-indigo-600" />
                {isStudentMode ? "Tell Us About Your Educational Journey" : "Tell Us About Your Career"}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    {isStudentMode ? "Field of Study/Interest" : "Current Role/Position"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full px-4 py-3 border border-[hsl(var(--input))] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    placeholder={isStudentMode ? "e.g., Computer Science, Business, Medicine" : "e.g., Software Developer, Marketing Manager"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    {isStudentMode ? "Education Level" : "Years of Experience"} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 border border-[hsl(var(--input))] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                  >
                    <option value="">Select {isStudentMode ? "education level" : "experience level"}</option>
                    {isStudentMode ? (
                      <>
                        <option value="high-school">High School</option>
                        <option value="undergraduate">Undergraduate (Bachelor's)</option>
                        <option value="graduate">Graduate (Master's)</option>
                        <option value="phd">PhD/Doctorate</option>
                        <option value="self-taught">Self-Taught</option>
                      </>
                    ) : (
                      <>
                        <option value="0-1">0-1 years (Entry Level)</option>
                        <option value="2-3">2-3 years (Junior)</option>
                        <option value="4-6">4-6 years (Mid Level)</option>
                        <option value="7-10">7-10 years (Senior)</option>
                        <option value="10+">10+ years (Expert)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    {isStudentMode ? "Current Skills & Knowledge" : "Current Skills & Technologies"} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[hsl(var(--input))] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    placeholder={isStudentMode ? "e.g., Mathematics, Programming, Research, Communication, Problem Solving" : "e.g., React, Python, Project Management, Data Analysis, Leadership"}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    {isStudentMode ? "Career Aspirations (Optional)" : "Career Goals (Optional)"}
                  </label>
                  <textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[hsl(var(--input))] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    placeholder={isStudentMode ? "e.g., Become a Software Engineer, Work in AI/ML, Start a tech company, Research career" : "e.g., Become a Tech Lead, Start my own company, Transition to Data Science"}
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Your Career Path...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Analyze My Career Path</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Analysis Results */
            <div className="space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
              >
                <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-indigo-600" />
                  Your Career Analysis
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      {analysis.currentLevel}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Current Level</div>
                  </div>
                  
                  <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {analysis.strengths.length}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Key Strengths</div>
                  </div>
                  
                  <div className="text-center p-4 bg-[hsl(var(--muted))] rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      {analysis.improvementAreas.length}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Growth Areas</div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Your Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <Star className="w-3 h-3 mr-2 text-yellow-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                      Areas for Growth
                    </h3>
                    <ul className="space-y-2">
                      {analysis.improvementAreas.map((area, index) => (
                        <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-500" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Career Paths */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
              >
                <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                  Recommended Career Paths
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  {analysis.careerPaths.map((path, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPath === path 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400' 
                          : 'border-[hsl(var(--border))] hover:border-indigo-300 dark:hover:border-indigo-400'
                      }`}
                      onClick={() => setSelectedPath(selectedPath === path ? null : path)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                          {path.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                          {path.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-[hsl(var(--muted-foreground))] mb-4 text-sm">
                        {path.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm text-[hsl(var(--muted-foreground))]">Time to Achieve</div>
                          <div className="font-semibold text-[hsl(var(--card-foreground))]">{path.timeToAchieve}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-[hsl(var(--muted-foreground))]">Growth Potential</div>
                          <div className={`font-semibold ${getGrowthColor(path.growthPotential)}`}>
                            {path.growthPotential}/10
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Salary Range</div>
                        <div className="font-semibold text-[hsl(var(--card-foreground))]">{path.salaryRange}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Detailed Path View */}
              {selectedPath && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
                >
                  <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                    {selectedPath.title} - Detailed Roadmap
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                        Required Skills
                      </h3>
                      <div className="space-y-2">
                        {selectedPath.skills.map((skill, index) => (
                          <div key={index} className="flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-purple-500" />
                        Recommended Certifications
                      </h3>
                      <div className="space-y-2">
                        {selectedPath.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                            <BookOpen className="w-3 h-3 mr-2 text-blue-500" />
                            {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-indigo-500" />
                      Next Steps
                    </h3>
                    <div className="space-y-3">
                      {selectedPath.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-start text-sm text-[hsl(var(--muted-foreground))]">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                              {index + 1}
                            </span>
                          </div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Upskilling Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
              >
                <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-indigo-600" />
                  Upskilling Recommendations
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Skills to Learn
                    </h3>
                    <div className="space-y-2">
                      {analysis.upskillingRecommendations.skills.map((skill, index) => (
                        <div key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2 text-yellow-500" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                      Recommended Courses
                    </h3>
                    <div className="space-y-2">
                      {analysis.upskillingRecommendations.courses.map((course, index) => (
                        <div key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <ExternalLink className="w-3 h-3 mr-2 text-blue-500" />
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-purple-500" />
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {analysis.upskillingRecommendations.certifications.map((cert, index) => (
                        <div key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-purple-500" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Market Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
              >
                <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
                  Market Insights
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-3">Job Demand</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{analysis.marketInsights.demand}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-3">Industry Trends</h3>
                    <ul className="space-y-1">
                      {analysis.marketInsights.trends.map((trend, index) => (
                        <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <Star className="w-3 h-3 mr-2 text-orange-500" />
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-3">Opportunities</h3>
                    <ul className="space-y-1">
                      {analysis.marketInsights.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Student Roadmaps Section */}
              {isStudentMode && analysis?.studentRoadmaps && analysis.studentRoadmaps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
                >
                  <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                    <School className="w-6 h-6 mr-2 text-indigo-600" />
                    Student Roadmaps
                  </h2>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    {analysis.studentRoadmaps.map((roadmap, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedRoadmap === roadmap 
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400' 
                            : 'border-[hsl(var(--border))] hover:border-indigo-300 dark:hover:border-indigo-400'
                        }`}
                        onClick={() => setSelectedRoadmap(selectedRoadmap === roadmap ? null : roadmap)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                            {roadmap.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(roadmap.difficulty)}`}>
                            {roadmap.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-[hsl(var(--muted-foreground))] mb-4 text-sm">
                          {roadmap.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm text-[hsl(var(--muted-foreground))]">Duration</div>
                            <div className="font-semibold text-[hsl(var(--card-foreground))]">{roadmap.duration}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-[hsl(var(--muted-foreground))]">Career Outcomes</div>
                            <div className="font-semibold text-[hsl(var(--card-foreground))]">{roadmap.careerOutcomes.length}</div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Key Milestones</div>
                          <div className="font-semibold text-[hsl(var(--card-foreground))]">{roadmap.milestones.length} Phases</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Detailed Roadmap View */}
              {selectedRoadmap && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]"
                >
                  <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] mb-6 flex items-center">
                    <School className="w-6 h-6 mr-2 text-indigo-600" />
                    {selectedRoadmap.title} - Detailed Roadmap
                  </h2>
                  
                  {/* Milestones Timeline */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      Learning Milestones
                    </h3>
                    <div className="space-y-6">
                      {selectedRoadmap.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-[hsl(var(--card-foreground))]">{milestone.phase}</h4>
                              <span className="text-sm text-[hsl(var(--muted-foreground))]">{milestone.duration}</span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Activities:</p>
                                <ul className="space-y-1">
                                  {milestone.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="text-sm text-[hsl(var(--muted-foreground))] flex items-start">
                                      <ArrowRight className="w-3 h-3 mr-2 mt-0.5 text-indigo-500 flex-shrink-0" />
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Skills to Develop:</p>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                        Learning Resources
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-2">Courses:</p>
                          <ul className="space-y-1">
                            {selectedRoadmap.resources.courses.map((course, index) => (
                              <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-2">Books:</p>
                          <ul className="space-y-1">
                            {selectedRoadmap.resources.books.map((book, index) => (
                              <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                                <BookOpen className="w-3 h-3 mr-2 text-blue-500" />
                                {book}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-purple-500" />
                        Practical Experience
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-2">Projects:</p>
                          <ul className="space-y-1">
                            {selectedRoadmap.resources.projects.map((project, index) => (
                              <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                                <Lightbulb className="w-3 h-3 mr-2 text-yellow-500" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[hsl(var(--card-foreground))] mb-2">Internships:</p>
                          <ul className="space-y-1">
                            {selectedRoadmap.resources.internships.map((internship, index) => (
                              <li key={index} className="text-sm text-[hsl(var(--muted-foreground))] flex items-center">
                                <UserCheck className="w-3 h-3 mr-2 text-orange-500" />
                                {internship}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Career Outcomes */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-indigo-500" />
                      Career Outcomes
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedRoadmap.careerOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  {selectedRoadmap.certifications.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-purple-500" />
                        Recommended Certifications
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedRoadmap.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                            <Award className="w-4 h-4 mr-2 text-purple-500" />
                            {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--card-foreground))] mb-4 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-indigo-500" />
                      Immediate Next Steps
                    </h3>
                    <div className="space-y-3">
                      {selectedRoadmap.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-start text-sm text-[hsl(var(--muted-foreground))]">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                              {index + 1}
                            </span>
                          </div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center space-x-4"
              >
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Start New Analysis
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement download functionality
                    toast.success("Career report downloaded!");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement share functionality
                    toast.success("Career insights shared!");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg font-semibold transition-all flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Insights
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
