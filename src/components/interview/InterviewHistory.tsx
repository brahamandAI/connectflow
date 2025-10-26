'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Clock, Star, TrendingUp, Trash2, Eye, BarChart3, CheckCircle } from 'lucide-react';

interface InterviewHistoryProps {
  onBack: () => void;
}

interface InterviewSession {
  id: string;
  role: string;
  domain: string;
  status: string;
  totalQuestions: number;
  currentQuestion: number;
  totalScore: number;
  averageScore: number;
  startedAt: string;
  completedAt?: string;
  questions: Array<{
    id: string;
    text: string;
    category: string;
    difficulty: string;
    answers: Array<{
      id: string;
      transcript: string;
      feedback: {
        score: number;
        strengths: string[];
        weaknesses: string[];
        suggestions: string[];
      };
    }>;
  }>;
}

export default function InterviewHistory({ onBack }: InterviewHistoryProps) {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchInterviewHistory();
  }, []);

  const fetchInterviewHistory = async () => {
    try {
      const response = await fetch('/api/interview/history');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error('Error fetching interview history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this interview session?')) {
      return;
    }

    try {
      const response = await fetch(`/api/interview/history?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (selectedSession?.id === sessionId) {
          setSelectedSession(null);
          setShowDetails(false);
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showDetails && selectedSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Header */}
          <div className="bg-card/80 backdrop-blur-sm border-0 shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button onClick={() => setShowDetails(false)} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to History
              </Button>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedSession.role} Interview Details
                </h2>
                <p className="text-muted-foreground">{selectedSession.domain}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(selectedSession.status)}>
                  {selectedSession.status}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {selectedSession.averageScore.toFixed(1)}/10
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-2xl font-bold text-foreground">
                  {selectedSession.currentQuestion}/{selectedSession.totalQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Questions and Answers */}
          <div className="space-y-6">
            {selectedSession.questions.map((question, index) => {
              const answer = question.answers[0];
              const feedback = answer?.feedback;
              
              return (
                <Card key={question.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="secondary">{question.category}</Badge>
                      </div>
                      {feedback && (
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{feedback.score}/10</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Question:</h4>
                      <p className="text-muted-foreground">{question.text}</p>
                    </div>
                    
                    {answer && (
                      <>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Your Answer:</h4>
                          <p className="text-muted-foreground bg-slate-50 p-3 rounded-lg">
                            {answer.transcript}
                          </p>
                        </div>
                        
                        {feedback && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-foreground">AI Feedback:</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-medium text-green-700 mb-2">Strengths:</h5>
                                <ul className="space-y-1">
                                  {feedback.strengths.map((strength, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                                      <span className="text-green-500 mr-2">•</span>
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-red-700 mb-2">Areas for Improvement:</h5>
                                <ul className="space-y-1">
                                  {feedback.weaknesses.map((weakness, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                                      <span className="text-red-500 mr-2">•</span>
                                      {weakness}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-blue-700 mb-2">Suggestions:</h5>
                              <ul className="space-y-1">
                                {feedback.suggestions.map((suggestion, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start">
                                    <span className="text-blue-500 mr-2">💡</span>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="bg-card/80 backdrop-blur-sm border-0 shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Interview History</h2>
              <p className="text-muted-foreground">Review your past interviews and track your progress</p>
            </div>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Setup
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {sessions.filter(s => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.averageScore ? stats.averageScore.toFixed(1) : '0.0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.max(...sessions.map(s => s.averageScore), 0).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No interviews yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first mock interview to see your history here
              </p>
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                Start Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {session.role}
                        </h3>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        <Badge variant="outline">{session.domain}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(session.startedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Q{session.currentQuestion}/{session.totalQuestions}</span>
                        </div>
                        {session.averageScore > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{session.averageScore.toFixed(1)}/10</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedSession(session);
                          setShowDetails(true);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        onClick={() => deleteSession(session.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{Math.round((session.currentQuestion / session.totalQuestions) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(session.currentQuestion / session.totalQuestions) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
