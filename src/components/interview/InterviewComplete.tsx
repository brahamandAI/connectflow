'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, BarChart3, RotateCcw, Home, Trophy, Target, Brain } from 'lucide-react';

interface InterviewCompleteProps {
  session: any;
  onRestart: () => void;
  onViewHistory: () => void;
  onGoHome: () => void;
}

export default function InterviewComplete({ session, onRestart, onViewHistory, onGoHome }: InterviewCompleteProps) {
  const totalScore = session.questions.reduce((acc: number, question: any) => {
    const answer = question.answers?.[0];
    return acc + (answer?.feedback?.score || 0);
  }, 0);
  
  const averageScore = totalScore / session.questions.length;
  
  const bestQuestion = session.questions.reduce((best: any, question: any) => {
    const answer = question.answers?.[0];
    const score = answer?.feedback?.score || 0;
    if (!best || score > best.score) {
      return { ...question, score };
    }
    return best;
  }, null);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-28 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interview Complete! 🎉
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Great job completing your {session.role} interview in {session.domain}. 
            Here's how you performed and what you can learn from this experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{averageScore.toFixed(1)}/10</h3>
                <p className="text-primary font-medium mb-1">Average Score</p>
                <p className="text-sm text-muted-foreground">{getScoreText(averageScore)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">{session.questions.length}</h3>
                <p className="text-green-700 font-medium mb-1">Questions Answered</p>
                <p className="text-sm text-green-600">Full interview completed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{totalScore.toFixed(1)}</h3>
                <p className="text-blue-700 font-medium mb-1">Total Points</p>
                <p className="text-sm text-blue-600">Combined score</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Question-by-Question Breakdown */}
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Question Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {session.questions.map((question: any, index: number) => {
                    const answer = question.answers?.[0];
                    const score = answer?.feedback?.score || 0;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-sm px-2 py-1">
                            Q{index + 1}
                          </Badge>
                          <span className="text-sm text-slate-700 font-medium">
                            {question.text.substring(0, 40)}...
                          </span>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                          {score}/10
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Best Performance */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-900">
                  <Trophy className="w-5 h-5" />
                  <span>Best Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bestQuestion ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(bestQuestion.score)} mb-2`}>
                        {bestQuestion.score}/10
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {bestQuestion.category}
                      </Badge>
                    </div>
                    <div className="bg-card/60 rounded-lg p-4 border border-green-200/50">
                      <p className="text-green-800 text-sm leading-relaxed">
                        "{bestQuestion.text}"
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-700">
                        Great job on this {bestQuestion.difficulty.toLowerCase()} question!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-green-700">
                    <p>Complete your first interview to see your best performance!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Key Takeaways */}
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-purple-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-900">
                <Brain className="w-5 h-5" />
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-800">What You Did Well</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Completed all questions with confidence</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Demonstrated knowledge in your field</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Showed commitment to improvement</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-800">Areas to Focus On</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Review feedback for each question</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Practice similar questions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-700 text-sm">Work on identified weaknesses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-indigo-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-indigo-900">
                <Target className="w-5 h-5" />
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-card/60 rounded-lg border border-indigo-200/50">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-indigo-900 mb-2">Review Performance</h4>
                  <p className="text-indigo-700 text-sm">Go through your detailed feedback to understand areas for improvement</p>
                </div>
                
                <div className="text-center p-4 bg-card/60 rounded-lg border border-indigo-200/50">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-indigo-900 mb-2">Practice More</h4>
                  <p className="text-indigo-700 text-sm">Take more interviews to build confidence and improve your skills</p>
                </div>
                
                <div className="text-center p-4 bg-card/60 rounded-lg border border-indigo-200/50">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-indigo-900 mb-2">Track Progress</h4>
                  <p className="text-indigo-700 text-sm">Monitor your improvement over time with detailed analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onRestart}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                size="lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Practice Again
              </Button>
              
              <Button
                onClick={onViewHistory}
                variant="outline"
                className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 px-8 py-3 text-lg"
                size="lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View History
              </Button>
              
              <Button
                onClick={onGoHome}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300 px-8 py-3 text-lg"
                size="lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Keep Growing! 🌱
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every interview is a learning opportunity. You've taken the first step towards improving your skills. 
                Remember, practice makes perfect, and with each interview, you're getting closer to your career goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

