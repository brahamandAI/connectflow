"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  BookOpen,
  Lightbulb,
  Star,
  TrendingUp,
  MessageSquare,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  suggestedAnswer?: string;
  tips?: string[];
}

interface JobDescription {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  company?: string;
  industry?: string;
}

function InterviewPrepContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [practiceSession, setPracticeSession] = useState<{
    totalQuestions: number;
    answeredQuestions: number;
    timeSpent: number;
    confidence: number;
  } | null>(null);

  // Generate interview questions
  const generateQuestions = async () => {
    if (!jobDescription.trim() || !jobTitle.trim()) {
      alert("Please provide both job title and description");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/interview-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: {
            title: jobTitle,
            description: jobDescription,
            company: company,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setIsPracticeMode(false);
        setShowAnswer(false);
        setUserAnswer("");
        setTimer(0);
        setIsTimerRunning(false);
      } else {
        throw new Error("Failed to generate questions");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Start practice session
  const startPractice = () => {
    if (questions.length === 0) return;
    
    // Persist questions for the dedicated practice page
    const dataToStore = {
      questions,
      jobTitle,
      company,
    };
    try {
      sessionStorage.setItem("interviewPracticeData", JSON.stringify(dataToStore));
    } catch {}
    router.push("/ai-tools/interview-prep/practice");
  };

  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setUserAnswer("");
    } else {
      // End of practice session
      setIsPracticeMode(false);
      setIsTimerRunning(false);
      setPracticeSession(prev => prev ? {
        ...prev,
        answeredQuestions: prev.answeredQuestions + 1,
        timeSpent: timer,
      } : null);
    }
  };

  // Previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
      setUserAnswer("");
    }
  };

  // Toggle answer visibility
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Load job data from URL parameters
  useEffect(() => {
    const jobParam = searchParams.get('job');
    if (jobParam) {
      try {
        const jobData = JSON.parse(decodeURIComponent(jobParam));
        setJobTitle(jobData.title || "");
        setCompany(jobData.company || "");
        setJobDescription(jobData.description || "");
        
        // Auto-generate questions if we have job data
        if (jobData.title && jobData.description) {
          setTimeout(() => {
            generateQuestionsFromJobData(jobData);
          }, 500);
        }
      } catch (error) {
        console.error("Error parsing job data:", error);
      }
    }
  }, [searchParams]);

  // Generate questions from job data
  const generateQuestionsFromJobData = async (jobData: any) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/interview-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: {
            title: jobData.title,
            description: jobData.description,
            company: jobData.company,
            requirements: jobData.requirements || [],
            responsibilities: jobData.responsibilities || []
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setIsPracticeMode(false);
        setShowAnswer(false);
        setUserAnswer("");
        setTimer(0);
        setIsTimerRunning(false);
      } else {
        throw new Error("Failed to generate questions");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-primary to-primary/90 rounded-full mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI Interview Preparation
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get AI-powered interview questions tailored to your job description and practice with confidence
          </p>

          {/* Job Description Input */}
          {!isPracticeMode && questions.length === 0 && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border mb-8"
            >
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">
                Enter Job Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Google, Microsoft"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here. Include requirements, responsibilities, and any other relevant details..."
                  rows={8}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                />
              </div>
              
              <Button
                onClick={generateQuestions}
                disabled={isGenerating || !jobTitle.trim() || !jobDescription.trim()}
                className="mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Questions...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Interview Questions
                  </div>
                )}
              </Button>
            </motion.div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border mb-8 text-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                Generating Interview Questions
              </h2>
              <p className="text-muted-foreground">
                Our AI is analyzing the job description and creating personalized interview questions...
              </p>
            </motion.div>
          )}

          {/* Questions Display */}
          {questions.length > 0 && !isPracticeMode && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-card-foreground">
                    Generated Questions ({questions.length})
                  </h2>
                  {jobTitle && company && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on: <span className="font-medium">{jobTitle}</span> at <span className="font-medium">{company}</span>
                    </p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuestions([]);
                      setJobDescription("");
                      setJobTitle("");
                      setCompany("");
                    }}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Job
                  </Button>
                  <Button
                    variant="outline"
                    onClick={generateQuestions}
                    disabled={isGenerating || !jobTitle.trim() || !jobDescription.trim()}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={startPractice}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium transition-all"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Practice Session
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/50 rounded-lg p-6 border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {question.category}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                           question.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" :
                           question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" :
                           "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">Q{index + 1}</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-card-foreground mb-3">
                      {question.question}
                    </h3>
                    
                    {question.tips && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                          Tips for answering:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {question.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Practice Mode */}
          {isPracticeMode && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border"
            >
              {/* Practice Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">{formatTime(timer)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {currentQuestionIndex + 1} / {questions.length}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className={isRecording ? "text-red-600 border-red-600" : ""}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsTimerRunning(!isTimerRunning);
                    }}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    {currentQuestion.category}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    currentQuestion.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" :
                    currentQuestion.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" :
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Answer
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here or use voice recording..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={toggleAnswer}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {showAnswer ? "Hide" : "Show"} Suggested Answer
                  </Button>
                </div>
                
                <Button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium transition-all"
                >
                  {currentQuestionIndex === questions.length - 1 ? "Finish Practice" : "Next Question"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Suggested Answer */}
              <AnimatePresence>
                {showAnswer && currentQuestion.suggestedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Suggested Answer:
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                      {currentQuestion.suggestedAnswer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Practice Session Results */}
          {practiceSession && !isPracticeMode && questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border"
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-card-foreground mb-2">
                  Practice Session Complete!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Great job completing your interview practice session.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {practiceSession.totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground">Questions Practiced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatTime(practiceSession.timeSpent)}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round((practiceSession.answeredQuestions / practiceSession.totalQuestions) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={startPractice}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium transition-all"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Practice Again
                  </Button>
                  <Button
                    onClick={() => {
                      setQuestions([]);
                      setPracticeSession(null);
                      setJobDescription("");
                      setJobTitle("");
                      setCompany("");
                    }}
                    variant="outline"
                  >
                    Start New Session
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Section intentionally removed */}
        </motion.div>
      </div>
    </div>
  );
}

export default function InterviewPrepPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading interview preparation...</p>
        </div>
      </div>
    }>
      <InterviewPrepContent />
    </Suspense>
  );
} 