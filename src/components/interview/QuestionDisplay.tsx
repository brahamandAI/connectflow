'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Brain, Clock, MessageSquare } from 'lucide-react';

interface QuestionDisplayProps {
  question: any;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function QuestionDisplay({ question, currentQuestionIndex, totalQuestions }: QuestionDisplayProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return <Brain className="w-4 h-4" />;
      case 'behavioral':
        return <MessageSquare className="w-4 h-4" />;
      case 'domain-specific':
        return <Target className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200';
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-lg px-4 py-2 border-2 border-primary/20 text-primary font-semibold">
              Q{currentQuestionIndex + 1}
            </Badge>
            <Badge className={`${getDifficultyColor(question.difficulty)} border-2 font-medium`}>
              {question.difficulty}
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-2 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200">
              {getCategoryIcon(question.category)}
              <span className="font-medium">{question.category}</span>
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
        </div>
        
        <CardTitle className="text-xl md:text-2xl text-foreground leading-relaxed font-bold">
          {question.text}
        </CardTitle>
      </CardHeader>
      
      {question.tips && question.tips.length > 0 && (
        <CardContent className="pt-0">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 text-lg">Tips for this Question</h4>
                <p className="text-sm text-blue-700">Use these guidelines to structure your answer</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.tips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-card/60 rounded-lg border border-blue-200/50">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-blue-800 text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

