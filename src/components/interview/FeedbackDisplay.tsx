'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, MessageSquare, CheckCircle, AlertCircle, Lightbulb, Target, Brain } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: any;
  questionText: string;
}

export default function FeedbackDisplay({ feedback, questionText }: FeedbackDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getScoreText = (score: number) => {
    if (score >= 9) return 'Excellent';
    if (score >= 8) return 'Very Good';
    if (score >= 7) return 'Good';
    if (score >= 6) return 'Satisfactory';
    if (score >= 5) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>AI Feedback</span>
          </CardTitle>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border-2 ${getScoreBackground(feedback.score)}`}>
              <Star className="w-5 h-5 mr-2" />
              {feedback.score}/10
            </div>
            <p className="text-xs text-muted-foreground mt-2">{getScoreText(feedback.score)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Overall Assessment</h3>
              <p className="text-sm text-muted-foreground">Comprehensive evaluation of your answer</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
                {feedback.score}
              </div>
              <div className="text-xs text-muted-foreground">Overall Score</div>
            </div>
            {feedback.communicationScore && (
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(feedback.communicationScore)}`}>
                  {feedback.communicationScore}
                </div>
                <div className="text-xs text-muted-foreground">Communication</div>
              </div>
            )}
            {feedback.technicalScore && (
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(feedback.technicalScore)}`}>
                  {feedback.technicalScore}
                </div>
                <div className="text-xs text-muted-foreground">Technical</div>
              </div>
            )}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Strengths</h3>
              <p className="text-sm text-green-700">What you did well</p>
            </div>
          </div>
          <div className="space-y-2">
            {feedback.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-green-800 text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-900">Areas for Improvement</h3>
              <p className="text-sm text-yellow-700">What you can work on</p>
            </div>
          </div>
          <div className="space-y-2">
            {feedback.weaknesses.map((weakness: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-yellow-800 text-sm">{weakness}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Actionable Suggestions</h3>
              <p className="text-sm text-blue-700">Specific steps to improve</p>
            </div>
          </div>
          <div className="space-y-2">
            {feedback.suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-blue-800 text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Feedback */}
        {feedback.overallFeedback && (
          <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Overall Feedback</h3>
                <p className="text-sm text-purple-700">Summary of your performance</p>
              </div>
            </div>
            <p className="text-purple-800 text-sm leading-relaxed">{feedback.overallFeedback}</p>
          </div>
        )}

        {/* Question Context */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-slate-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Question Context</h3>
              <p className="text-sm text-slate-700">What you were asked</p>
            </div>
          </div>
          <p className="text-slate-800 text-sm italic leading-relaxed">"{questionText}"</p>
        </div>

        {/* General Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900">General Interview Tips</h3>
              <p className="text-sm text-indigo-700">Best practices for future interviews</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-indigo-800">Structure your answers with clear examples</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-indigo-800">Show confidence through your tone and body language</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-indigo-800">Connect your experience to the question asked</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-indigo-800">Be honest about areas you're still learning</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

