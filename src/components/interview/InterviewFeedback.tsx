import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  CheckCircle, 
  Target, 
  MessageCircle, 
  TrendingUp, 
  Lightbulb, 
  BookOpen, 
  Users, 
  Award,
  Star,
  BarChart3,
  Brain,
  Mic,
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface InterviewFeedbackProps {
  feedback: {
    overallScore: number;
    technicalAssessment: string;
    communicationAssessment: string;
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    nextSteps: string;
  };
  questionCount: number;
  role: string;
  domain: string;
  onBack: () => void;
  onRestart: () => void;
}

export default function InterviewFeedback({ 
  feedback, 
  questionCount, 
  role, 
  domain, 
  onBack, 
  onRestart 
}: InterviewFeedbackProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interview
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Interview Results</h1>
            <p className="text-muted-foreground">
              {role} • {domain} • {questionCount} Questions
            </p>
          </div>
          
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Target className="w-4 h-4 mr-2" />
            New Interview
          </Button>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full ${getScoreBgColor(feedback.overallScore)} flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Overall Performance</h2>
                  <p className="text-muted-foreground">Out of 10</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-foreground">Performance Rating</span>
                </div>
                <Progress 
                  value={feedback.overallScore * 10} 
                  className="w-32 h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Technical Assessment */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Brain className="w-5 h-5" />
                <span>Technical Knowledge</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 leading-relaxed">
                {feedback.technicalAssessment}
              </p>
            </CardContent>
          </Card>

          {/* Communication Assessment */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <MessageCircle className="w-5 h-5" />
                <span>Communication Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 leading-relaxed">
                {feedback.communicationAssessment}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle className="w-5 h-5" />
                <span>Key Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <span className="text-emerald-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-800">
                <TrendingUp className="w-5 h-5" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <span className="text-orange-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Development Suggestions */}
        <Card className="mb-8 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Lightbulb className="w-5 h-5" />
              <span>Development Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedback.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                  <span className="text-purple-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-indigo-800">
              <Target className="w-5 h-5" />
              <span>Next Steps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-700 leading-relaxed text-lg">
              {feedback.nextSteps}
            </p>
          </CardContent>
        </Card>

        {/* Tips and Resources Section */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <BookOpen className="w-5 h-5" />
              <span>Tips & Resources for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Interview Preparation */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Interview Preparation</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Practice the STAR method (Situation, Task, Action, Result)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Prepare 3-5 detailed project stories with technical challenges</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Research the company and role-specific technologies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Practice coding problems relevant to your field</span>
                  </li>
                </ul>
              </div>

              {/* Communication Tips */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center space-x-2">
                  <Mic className="w-4 h-4" />
                  <span>Communication Tips</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Speak clearly and at a moderate pace</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Use specific examples rather than general statements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Explain your thought process when solving problems</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Ask clarifying questions if you don't understand</span>
                  </li>
                </ul>
              </div>

              {/* Learning Resources */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Learning Resources</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Online courses: Coursera, Udemy, Pluralsight</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Practice platforms: LeetCode, HackerRank</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Technical blogs and industry podcasts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <span>Books and certifications in your field</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Career Development */}
            <div className="mt-8 p-6 bg-white/50 rounded-lg">
              <h3 className="font-semibold text-slate-800 flex items-center space-x-2 mb-4">
                <Users className="w-4 h-4" />
                <span>Career Development</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="space-y-2">
                  <p className="font-medium">Short-term Goals (3-6 months):</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Set specific learning goals for technical skills</li>
                    <li>• Build 2-3 hands-on projects to showcase</li>
                    <li>• Practice explaining technical concepts clearly</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Long-term Goals (6-12 months):</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Network with professionals in your field</li>
                    <li>• Attend meetups and conferences</li>
                    <li>• Consider relevant certifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            <Target className="w-5 h-5 mr-2" />
            Take Another Interview
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
