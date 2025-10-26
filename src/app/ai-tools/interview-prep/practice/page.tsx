"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Target, Play, Pause, Mic, MicOff, BookOpen, RotateCcw, ArrowRight, CheckCircle } from "lucide-react";

interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  suggestedAnswer?: string;
  tips?: string[];
}

interface PracticeData {
  questions: InterviewQuestion[];
  jobTitle?: string;
  company?: string;
}

const PRACTICE_STORAGE_KEY = "interviewPracticeData";

export default function PracticePage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [confidenceByQuestion, setConfidenceByQuestion] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PRACTICE_STORAGE_KEY);
      if (!raw) {
        router.replace("/ai-tools/interview-prep");
        return;
      }
      const parsed: PracticeData = JSON.parse(raw);
      if (!parsed.questions || parsed.questions.length === 0) {
        router.replace("/ai-tools/interview-prep");
        return;
      }
      setQuestions(parsed.questions);
      setJobTitle(parsed.jobTitle || "");
      setCompany(parsed.company || "");
    } catch {
      router.replace("/ai-tools/interview-prep");
    }
  }, [router]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setShowAnswer(false);
      setUserAnswer("");
    } else {
      setIsTimerRunning(false);
      setIsFinished(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      setShowAnswer(false);
      setUserAnswer("");
    }
  };

  const setConfidence = (questionId: string, value: number) => {
    setConfidenceByQuestion((prev) => ({ ...prev, [questionId]: value }));
  };

  const restartPractice = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswer("");
    setTimer(0);
    setIsTimerRunning(true);
    setIsFinished(false);
    setConfidenceByQuestion({});
  };

  const exitToSetup = () => {
    router.push("/ai-tools/interview-prep");
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No practice session found.</p>
          <Button className="mt-4" onClick={exitToSetup}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Practice Session</h1>
            {(jobTitle || company) && (
              <p className="text-sm text-muted-foreground mt-1">
                {jobTitle && <span className="font-medium">{jobTitle}</span>} {jobTitle && company && <span>at</span>} {company && <span className="font-medium">{company}</span>}
              </p>
            )}
          </div>

          {!isFinished ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">{formatTime(timer)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">{currentQuestionIndex + 1} / {questions.length}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsRecording((r) => !r)} className={isRecording ? "text-red-600 border-red-600" : ""}>
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsTimerRunning((r) => !r)}>
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{currentQuestion.category}</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    currentQuestion.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" :
                    currentQuestion.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" :
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-card-foreground mb-4">{currentQuestion.question}</h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">Your Answer</label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here or use voice recording..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">Confidence</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={confidenceByQuestion[currentQuestion.id] ?? 50}
                  onChange={(e) => setConfidence(currentQuestion.id, Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-muted-foreground mt-1">{confidenceByQuestion[currentQuestion.id] ?? 50}%</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                  <Button variant="outline" onClick={() => setShowAnswer((s) => !s)}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    {showAnswer ? "Hide" : "Show"} Suggested Answer
                  </Button>
                </div>
                <Button onClick={nextQuestion} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium transition-all">
                  {currentQuestionIndex === questions.length - 1 ? "Finish Practice" : "Next Question"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <AnimatePresence>
                {showAnswer && currentQuestion.suggestedAnswer && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Suggested Answer:</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">{currentQuestion.suggestedAnswer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-soft-lg p-8 border border-border text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-card-foreground mb-2">Practice Session Complete!</h2>
              <p className="text-muted-foreground mb-6">Great job completing your interview practice session.</p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{questions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions Practiced</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(timer)}</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(
                    Object.keys(confidenceByQuestion).length > 0
                      ? Object.values(confidenceByQuestion).reduce((a, b) => a + b, 0) / Object.values(confidenceByQuestion).length
                      : 0
                  )}%</div>
                  <div className="text-sm text-muted-foreground">Avg. Confidence</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={restartPractice} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-6 py-2 rounded-lg font-medium transition-all">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button variant="outline" onClick={exitToSetup}>Back to Setup</Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


