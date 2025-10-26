'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Mic, Video, Clock, Star, TrendingUp, History, Brain, Target, Zap, Volume2, VolumeX, Wifi, WifiOff, Eye, EyeOff, CheckCircle } from 'lucide-react';
import InterviewFlow from '@/components/interview/InterviewFlow';
import InterviewHistory from '@/components/interview/InterviewHistory';

const jobRoles = [
  { value: 'frontend-developer', label: 'Frontend Developer', domain: 'Web Development', icon: <Brain className="w-5 h-5" /> },
  { value: 'backend-developer', label: 'Backend Developer', domain: 'Web Development', icon: <Target className="w-5 h-5" /> },
  { value: 'fullstack-developer', label: 'Full Stack Developer', domain: 'Web Development', icon: <Zap className="w-5 h-5" /> },
  { value: 'data-analyst', label: 'Data Analyst', domain: 'Data Science', icon: <Brain className="w-5 h-5" /> },
  { value: 'data-scientist', label: 'Data Scientist', domain: 'Data Science', icon: <Target className="w-5 h-5" /> },
  { value: 'machine-learning-engineer', label: 'Machine Learning Engineer', domain: 'AI/ML', icon: <Zap className="w-5 h-5" /> },
  { value: 'devops-engineer', label: 'DevOps Engineer', domain: 'Infrastructure', icon: <Brain className="w-5 h-5" /> },
  { value: 'product-manager', label: 'Product Manager', domain: 'Product Management', icon: <Target className="w-5 h-5" /> },
  { value: 'ui-ux-designer', label: 'UI/UX Designer', domain: 'Design', icon: <Zap className="w-5 h-5" /> },
  { value: 'qa-engineer', label: 'QA Engineer', domain: 'Quality Assurance', icon: <Brain className="w-5 h-5" /> },
];

const domains = [
  'Web Development',
  'Data Science',
  'AI/ML',
  'Infrastructure',
  'Product Management',
  'Design',
  'Quality Assurance',
  'Mobile Development',
  'Cybersecurity',
  'Cloud Computing',
];

// Interview rules and suggestions
const interviewRules = [
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Keep Surroundings Calm",
    description: "Find a quiet environment with minimal background noise for clear audio recording"
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Talk Loudly & Clearly",
    description: "Speak at a comfortable volume and enunciate your words clearly"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Look at the Camera",
    description: "Maintain eye contact with the camera to show confidence and engagement"
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Stable Internet Connection",
    description: "Ensure you have a stable internet connection for smooth recording"
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Good Lighting",
    description: "Position yourself in good lighting so your face is clearly visible"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Be Yourself",
    description: "Answer naturally and authentically - this is a practice session"
  }
];

// Interview Rules Component
function InterviewRules({ onComplete }: { onComplete: () => void }) {
  const [currentRule, setCurrentRule] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentRule(prev => {
        if (prev < interviewRules.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 2000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Interview Guidelines</h2>
          <p className="text-muted-foreground">Please follow these tips for the best interview experience</p>
        </div>

        <div className="space-y-4">
          {interviewRules.map((rule, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-in-out transform ${
                index === currentRule
                  ? 'opacity-100 translate-x-0 scale-100'
                  : index < currentRule
                  ? 'opacity-40 translate-x-2 scale-98'
                  : 'opacity-0 translate-x-12 scale-95'
              }`}
              style={{
                transitionDelay: index === currentRule ? '0ms' : '100ms'
              }}
            >
              <Card className={`${
                index === currentRule 
                  ? 'bg-gradient-to-r from-primary/15 to-primary/8 border-primary/40 shadow-xl ring-2 ring-primary/20' 
                  : 'bg-card/60 border-border/60 shadow-sm'
              } transition-all duration-500 ease-in-out`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full transition-all duration-500 ease-in-out ${
                      index === currentRule 
                        ? 'bg-primary/25 text-primary scale-110' 
                        : 'bg-muted text-muted-foreground scale-100'
                    }`}>
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg transition-all duration-500 ${
                        index === currentRule ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {rule.title}
                      </h3>
                      <p className={`text-sm transition-all duration-500 ${
                        index === currentRule ? 'text-foreground/90' : 'text-muted-foreground'
                      }`}>
                        {rule.description}
                      </p>
                    </div>
                    {index < currentRule && (
                      <div className="animate-pulse">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex justify-center space-x-3 mb-4">
            {interviewRules.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ease-in-out ${
                  index <= currentRule 
                    ? 'bg-primary scale-125 shadow-lg' 
                    : 'bg-muted scale-100'
                } ${index === currentRule ? 'animate-pulse' : ''}`}
                style={{
                  width: index <= currentRule ? '12px' : '8px',
                  height: index <= currentRule ? '12px' : '8px',
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>
          <p className={`text-sm transition-all duration-500 ${
            currentRule < interviewRules.length - 1 
              ? 'text-muted-foreground' 
              : 'text-primary font-semibold'
          }`}>
            {currentRule < interviewRules.length - 1 
              ? `Tip ${currentRule + 1} of ${interviewRules.length}`
              : 'Ready to start your interview!'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MockInterviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [showInterview, setShowInterview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/jobseeker/login');
    }
  }, [status, router]);

  const handleStartInterview = async () => {
    if (!selectedRole || !selectedDomain) {
      alert('Please select both role and domain');
      return;
    }

    // Show rules first
    setShowRules(true);
  };

  const handleRulesComplete = async () => {
    try {
      const response = await fetch('/api/interview/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: selectedRole,
          domain: selectedDomain,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start interview');
      }

      const data = await response.json();
      setCurrentSession(data);
      setShowRules(false);
      setShowInterview(true);
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview. Please try again.');
      setShowRules(false);
    }
  };

  const handleRoleChange = (roleValue: string) => {
    setSelectedRole(roleValue);
    const role = jobRoles.find(r => r.value === roleValue);
    if (role) {
      setSelectedDomain(role.domain);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your interview session...</p>
        </div>
      </div>
    );
  }

  if (showInterview && currentSession) {
    return (
      <InterviewFlow 
        session={currentSession} 
        onComplete={() => {
          setShowInterview(false);
          setCurrentSession(null);
          setShowHistory(true);
        }} 
        onBack={() => {
          setShowInterview(false);
          setCurrentSession(null);
        }} 
      />
    );
  }

  if (showRules) {
    return <InterviewRules onComplete={handleRulesComplete} />;
  }

  if (showHistory) {
    return <InterviewHistory onBack={() => setShowHistory(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-28 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-6 shadow-lg">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Mock Interview
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice with AI-powered interviews tailored to your role. Get instant feedback and improve your skills.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">

          {/* Interview Setup */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Start Your Practice Interview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Select your role and domain to begin a personalized interview session
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Select Job Role</label>
                <Select value={selectedRole} onValueChange={handleRoleChange}>
                  <SelectTrigger className="h-12 text-left">
                    <SelectValue placeholder="Choose your job role" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-primary">{role.icon}</span>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.domain}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Domain Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Domain</label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="h-12 text-left">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleStartInterview}
                  disabled={!selectedRole || !selectedDomain}
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Interview
                </Button>
                
                <Button 
                  onClick={() => setShowHistory(true)}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  size="lg"
                >
                  <History className="w-5 h-5 mr-2" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



