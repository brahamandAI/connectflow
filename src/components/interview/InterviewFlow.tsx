'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, CheckCircle, Clock, Mic, Video, Brain, Target, Bot, User, MessageCircle } from 'lucide-react';
import VideoRecorder from './VideoRecorder';
import FeedbackDisplay from './FeedbackDisplay';
import QuestionDisplay from './QuestionDisplay';
import InterviewComplete from './InterviewComplete';
import InterviewFeedback from './InterviewFeedback';

interface InterviewFlowProps {
  session: any;
  onComplete: () => void;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function InterviewFlow({ session, onComplete, onBack }: InterviewFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState<any>(null);
  const [textInput, setTextInput] = useState('');
  const [isSubmittingText, setIsSubmittingText] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // For new interview flow, we don't use predefined questions
  const totalQuestions = 1; // We'll track progress differently
  const currentQuestion = { id: 'dynamic', text: 'Dynamic Interview Question' };

  useEffect(() => {
    // Calculate progress based on question count
    const progress = Math.min((questionCount / 15) * 100, 100); // Max 15 questions
    setSessionProgress(progress);
  }, [questionCount]);

  // Initialize with professional greeting
  useEffect(() => {
    if (chatMessages.length === 0) {
                      const greetingMessage: ChatMessage = {
                  id: 'greeting',
                  type: 'ai',
                  content: "Good morning! Thank you for taking the time to speak with me today. I'm excited to learn more about your background and experience in the field. Let's begin - could you please tell me about yourself, your technical background, and what brings you to this interview today?",
                  timestamp: new Date()
                };
      setChatMessages([greetingMessage]);
      
      // Auto-speak the initial greeting after a short delay
      setTimeout(() => {
        speakText(greetingMessage.content);
      }, 1000);
    }
  }, [chatMessages.length]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleRecordingComplete = (blob: Blob) => {
    setRecordedBlob(blob);
    setIsRecording(false);
  };

  const handleTranscriptGenerated = (transcript: string) => {
    setTranscript(transcript);
    
    // Add user message to chat immediately when transcript is generated
    if (transcript.trim()) {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: transcript,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, userMessage]);
    }
  };

  const handleSubmitAnswer = async (blob: Blob, transcriptText?: string) => {
    // The transcription is already handled by VideoRecorder
    // This function is called after transcription is complete
    console.log('=== handleSubmitAnswer called ===');
    console.log('Transcript parameter:', transcriptText);
    console.log('Current transcript state:', transcript);
    console.log('Blob size:', blob.size);
    
    // Use the transcript parameter if provided, otherwise use the state
    const currentTranscript = transcriptText || transcript;
    console.log('Using transcript:', currentTranscript);
    
    if (currentTranscript.trim()) {
      // Temporarily set the transcript if it's provided as parameter
      if (transcriptText && transcriptText !== transcript) {
        console.log('Setting transcript state to:', transcriptText);
        setTranscript(transcriptText);
      }
      console.log('Calling submitAnswer with transcript:', currentTranscript);
      await submitAnswer(currentTranscript);
    } else {
      console.log('No transcript available, cannot submit answer');
      alert('No transcript available. Please try recording again.');
    }
  };



  const generateFinalFeedback = async () => {
    try {
      setIsAiTyping(true);
      
      // Create comprehensive feedback based on all responses
      const allResponses = chatMessages
        .filter(msg => msg.type === 'user')
        .map(msg => msg.content)
        .join(' ');
      
      const feedbackPrompt = `Based on this interview conversation, provide comprehensive feedback:

      ROLE: ${session.role}
      DOMAIN: ${session.domain}
      TOTAL QUESTIONS: ${questionCount}
      
      CANDIDATE RESPONSES: "${allResponses}"
      
      Please provide a detailed assessment including:
      1. Overall performance score (1-10)
      2. Technical knowledge evaluation
      3. Communication skills assessment
      4. Key strengths demonstrated
      5. Areas for improvement
      6. Specific suggestions for development
      7. Recommendation for next steps
      
      Format as a professional interview feedback report with clear sections.`;

      // Use the correct API endpoint
      const response = await fetch('/api/interview/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: session.role || 'Software Developer',
          domain: session.domain || 'Technology',
          transcript: allResponses,
          conversationHistory: chatMessages,
          generateFollowUp: false, // This is final feedback, not a follow-up
          isFinalFeedback: true
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Final feedback API response:', data);
        
        // Use the finalFeedback from API response
        const feedback = data.finalFeedback || {
          overallScore: 7.5,
          technicalAssessment: 'Good technical foundation demonstrated with room for growth in specific areas.',
          communicationAssessment: 'Clear communication with good structure and examples.',
          strengths: ['Strong problem-solving approach', 'Good use of examples', 'Clear technical explanations'],
          improvements: ['Provide more technical depth', 'Include specific implementation details', 'Share more real-world examples'],
          suggestions: ['Practice explaining complex technical concepts', 'Build more hands-on projects', 'Stay updated with latest technologies'],
          nextSteps: 'Continue building your technical portfolio and practice explaining your projects in detail.'
        };
        
        // Add comprehensive feedback message
        const finalFeedbackMessage: ChatMessage = {
          id: `ai-feedback-${Date.now()}`,
          type: 'ai',
          content: `## 📊 **Interview Performance Assessment**

**Overall Score: ${feedback.overallScore || '7.5'}/10**

### 🎯 **Technical Knowledge**
${feedback.technicalAssessment || 'Good technical foundation demonstrated with room for growth in specific areas.'}

### 💬 **Communication Skills**
${feedback.communicationAssessment || 'Clear communication with good structure and examples.'}

### ✅ **Key Strengths**
${feedback.strengths ? feedback.strengths.map((s: string) => `• ${s}`).join('\n') : '• Strong problem-solving approach\n• Good use of examples\n• Clear technical explanations'}

### 🔧 **Areas for Improvement**
${feedback.improvements ? feedback.improvements.map((i: string) => `• ${i}`).join('\n') : '• Provide more technical depth\n• Include specific implementation details\n• Share more real-world examples'}

### 📈 **Development Suggestions**
${feedback.suggestions ? feedback.suggestions.map((s: string) => `• ${s}`).join('\n') : '• Practice explaining complex technical concepts\n• Build more hands-on projects\n• Stay updated with latest technologies'}

### 🎯 **Next Steps**
${feedback.nextSteps || 'Continue building your technical portfolio and practice explaining your projects in detail.'}`,
          timestamp: new Date()
        };
        
        // Store the feedback and show the feedback page
        setFinalFeedback(feedback);
        setShowFeedback(true);
        
      } else {
        throw new Error('Failed to generate feedback');
      }
    } catch (error) {
      console.error('Error generating final feedback:', error);
      const errorMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        type: 'ai',
        content: `## 📊 **Interview Performance Assessment**

**Overall Score: 7.5/10**

### 🎯 **Technical Knowledge**
Good technical foundation demonstrated with room for growth in specific areas.

### 💬 **Communication Skills**
Clear communication with good structure and examples.

### ✅ **Key Strengths**
• Strong problem-solving approach
• Good use of examples
• Clear technical explanations

### 🔧 **Areas for Improvement**
• Provide more technical depth
• Include specific implementation details
• Share more real-world examples

### 📈 **Development Suggestions**
• Practice explaining complex technical concepts
• Build more hands-on projects
• Stay updated with latest technologies

### 🎯 **Next Steps**
Continue building your technical portfolio and practice explaining your projects in detail.`,
        timestamp: new Date()
      };
      // Use fallback feedback and show feedback page
      const fallbackFeedback = {
        overallScore: 7.5,
        technicalAssessment: 'Good technical foundation demonstrated with room for growth in specific areas.',
        communicationAssessment: 'Clear communication with good structure and examples.',
        strengths: ['Strong problem-solving approach', 'Good use of examples', 'Clear technical explanations'],
        improvements: ['Provide more technical depth', 'Include specific implementation details', 'Share more real-world examples'],
        suggestions: ['Practice explaining complex technical concepts', 'Build more hands-on projects', 'Stay updated with latest technologies'],
        nextSteps: 'Continue building your technical portfolio and practice explaining your projects in detail.'
      };
      setFinalFeedback(fallbackFeedback);
      setShowFeedback(true);
    } finally {
      setIsAiTyping(false);
    }
  };



  const speakText = (text: string) => {
    // Stop any current speech
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
    }

    // Create new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;

    // Configure speech settings
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Try to use a professional voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Alex')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      speechSynthesisRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      speechSynthesisRef.current = null;
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speechSynthesisRef.current = null;
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim() || isSubmittingText || isInterviewComplete) return;
    
    setIsSubmittingText(true);
    
    try {
      // Add user message to chat
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: textInput.trim(),
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      
      // Process the text response
      await submitAnswer(textInput.trim());
      
      // Clear the text input
      setTextInput('');
      
    } catch (error) {
      console.error('Error submitting text response:', error);
      alert('Failed to submit response. Please try again.');
    } finally {
      setIsSubmittingText(false);
    }
  };

  const submitAnswer = async (transcriptText?: string) => {
    console.log('=== submitAnswer called ===');
    const currentTranscript = transcriptText || transcript;
    console.log('Current transcript:', currentTranscript);
    console.log('Transcript length:', currentTranscript.length);
    
    if (!currentTranscript.trim()) {
      console.log('No transcript available in submitAnswer');
      alert('Please record your answer and ensure transcript is generated');
      return;
    }

    console.log('Starting submitAnswer process...');
    setIsTranscribing(true);
    setIsAiTyping(true);

    try {
      // Generate follow-up question based on the response
      const requestBody = {
        role: session.role || 'Software Developer',
        domain: session.domain || 'Technology',
        transcript: currentTranscript,
        conversationHistory: chatMessages,
        generateFollowUp: true,
        isIntroduction: chatMessages.length === 1 // First response is introduction
      };
      
      console.log('Sending request to API:', requestBody);
      console.log('Session data:', session);
      console.log('Chat messages length:', chatMessages.length);
      console.log('Is introduction:', chatMessages.length === 1);

      const response = await fetch('/api/interview/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData: any = await response.json();
        throw new Error(errorData?.error || 'Failed to submit answer');
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Response status:', response.status);
      console.log('Has followUpQuestion:', !!data.followUpQuestion);
      console.log('FollowUpQuestion content:', data.followUpQuestion);
      
      // Store feedback for display
      if (data.feedback) {
      setCurrentFeedback(data.feedback);
        setAnswers([...answers, { 
          question: chatMessages[chatMessages.length - 1]?.content || "Interview Question", 
          answer: transcript, 
          feedback: data.feedback 
        }]);
      }
      
      // Increment question count
      const newQuestionCount = questionCount + 1;
      setQuestionCount(newQuestionCount);
      
      // Check if interview should end (10-15 questions)
      const shouldEndInterview = newQuestionCount >= 10 && (newQuestionCount >= 15 || Math.random() < 0.3);
      
      if (shouldEndInterview) {
        console.log('Interview ending after', newQuestionCount, 'questions');
        setIsInterviewComplete(true);
        
        // Add interview completion message
        const completionMessage: ChatMessage = {
          id: `ai-completion-${Date.now()}`,
          type: 'ai',
          content: "Thank you for your responses. We've covered a good range of topics. Let me provide you with comprehensive feedback on your interview performance.",
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, completionMessage]);
        
        // Generate final comprehensive feedback
        setTimeout(async () => {
          await generateFinalFeedback();
        }, 2000);
        
        return;
      }
      
      // Add AI follow-up question to chat
      if (data.followUpQuestion && data.followUpQuestion.trim()) {
        console.log('Adding follow-up question:', data.followUpQuestion);
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: data.followUpQuestion,
          timestamp: new Date()
        };
        setChatMessages(prev => {
          console.log('Current chat messages before adding:', prev);
          const newMessages = [...prev, aiMessage];
          console.log('New chat messages after adding:', newMessages);
          
          // Auto-speak the AI question after a short delay
          setTimeout(() => {
            speakText(data.followUpQuestion);
          }, 500);
          
          return newMessages;
        });
      } else {
        console.log('No follow-up question received, using fallback');
        console.log('FollowUpQuestion value:', data.followUpQuestion);
        // Fallback if no follow-up question generated
        const fallbackMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: "Can you walk me through the technical details of that project? I'd like to understand your approach and the challenges you faced.",
          timestamp: new Date()
        };
        setChatMessages(prev => {
          console.log('Adding fallback message');
          const newMessages = [...prev, fallbackMessage];
          
          // Auto-speak the fallback question after a short delay
          setTimeout(() => {
            speakText(fallbackMessage.content);
          }, 500);
          
          return newMessages;
        });
      }
      
      // Clear the transcript for the next question
      setTranscript('');
      setRecordedBlob(null);
      
      setIsTranscribing(false);
      setIsAiTyping(false);
    } catch (error) {
      console.error('Error submitting answer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to submit answer: ${errorMessage}`);
      setIsTranscribing(false);
      setIsAiTyping(false);
    }
  };

  // For dynamic interview flow, we don't need question navigation
  const endInterview = () => {
      setShowCompletion(true);
  };

  const resetQuestion = () => {
    setRecordedBlob(null);
    setTranscript('');
    setCurrentFeedback(null);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setRecordedBlob(null);
    setTranscript('');
    setCurrentFeedback(null);
    setAnswers([]);
    setSessionProgress(0);
    setShowCompletion(false);
  };

  const handleViewHistory = () => {
    onComplete();
  };

  const handleGoHome = () => {
    onBack();
  };

  if (showCompletion) {
    return (
      <InterviewComplete
        session={session}
        onRestart={handleRestart}
        onViewHistory={handleViewHistory}
        onGoHome={handleGoHome}
      />
    );
  }

  if (showFeedback && finalFeedback) {
    return (
      <InterviewFeedback
        feedback={finalFeedback}
        questionCount={questionCount}
        role={session.role || 'Software Developer'}
        domain={session.domain || 'Technology'}
        onBack={() => setShowFeedback(false)}
        onRestart={() => {
          setShowFeedback(false);
          setFinalFeedback(null);
          setIsInterviewComplete(false);
          setQuestionCount(0);
          setChatMessages([]);
          setTextInput('');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">Mock Interview</h1>
            <p className="text-sm text-muted-foreground">
              {session.role || 'Software Developer'} • {session.domain || 'Technology'}
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <MessageCircle className="w-3 h-3" />
                <span>{questionCount} questions</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{Math.floor((Date.now() - session.startTime) / 60000)} min</span>
              </div>
            </div>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Interview Progress</span>
            <span>{Math.round(sessionProgress)}%</span>
          </div>
          <Progress value={sessionProgress} className="h-2" />
        </div>

        {/* Simple Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Column - Camera */}
          <div className="flex flex-col">
            <Card className="flex-1 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 h-full">
                {isInterviewComplete ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Interview Complete!</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Thank you for participating. Check the chat for your comprehensive feedback and suggestions.
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Questions: {questionCount}
                    </div>
                  </div>
                ) : (
                <VideoRecorder
                  onRecordingComplete={handleRecordingComplete}
                  onTranscriptGenerated={handleTranscriptGenerated}
                    onSubmitAnswer={handleSubmitAnswer}
                    onExit={() => {
                      // Reset recording state
                      setRecordedBlob(null);
                      setTranscript('');
                      setCurrentFeedback(null);
                    }}
                  />
                )}
              </CardContent>
            </Card>

                        {/* Transcript Preview */}
            {transcript && (
              <Card className="mt-4 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Your Response</span>
                    </div>
                    <p className="text-sm text-green-700 bg-white/50 p-3 rounded-lg border border-green-200">
                      {transcript}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            
          </div>

          {/* Right Column - Chat Interface */}
          <div className="flex flex-col">
            <Card className="flex-1 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                    </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">AI Interviewer</h3>
                    <p className="text-xs text-muted-foreground">
                      {chatMessages.length === 0 ? 'Ready to start your interview' : 
                       isAiTyping ? 'Thinking of your next question...' : 
                       isUserTyping ? 'You are typing...' :
                       'Ask me anything about your experience'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      isAiTyping ? 'bg-green-500 animate-pulse' : 
                      isUserTyping ? 'bg-blue-500 animate-pulse' : 
                      'bg-gray-400'
                    }`}></div>
                    <span className="text-xs text-muted-foreground">
                      {isAiTyping ? 'AI Active' : isUserTyping ? 'You Typing' : 'Ready'}
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[400px] min-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgb(156 163 175) rgb(243 244 246)'
                  } as React.CSSProperties}
                >
                  {/* Welcome Message */}
                  {chatMessages.length === 0 && (
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Welcome to your interview!</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          I'll conduct a professional technical interview based on your responses. I'll ask about your experience, technical skills, and problem-solving abilities. Speak naturally and provide specific examples from your work.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Current Transcript Display */}
                  {transcript && !chatMessages.some(msg => msg.content === transcript) && (
                    <div className="flex justify-end">
                      <div className="flex items-start space-x-2 max-w-[80%] flex-row-reverse space-x-reverse">
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        
                        {/* Message Bubble */}
                        <div className="rounded-2xl px-4 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white">
                          <p className="text-sm leading-relaxed">{transcript}</p>
                          <p className="text-xs mt-1 text-green-100">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-br from-green-500 to-green-600' 
                            : 'bg-gradient-to-br from-blue-500 to-purple-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
            )}
          </div>

                        {/* Message Bubble */}
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                            : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800 border border-slate-200'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className={`flex items-center justify-between mt-2 ${
                            message.type === 'user' ? 'text-green-100' : 'text-slate-500'
                          }`}>
                            <p className="text-xs">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {message.type === 'ai' && (
                              <button
                                onClick={() => {
                                  if (isSpeaking) {
                                    stopSpeaking();
                                  } else {
                                    speakText(message.content);
                                  }
                                }}
                                className="flex items-center space-x-1 text-xs hover:text-slate-700 transition-colors"
                                title={isSpeaking ? 'Stop speaking' : 'Listen to question'}
                              >
                                {isSpeaking ? (
                                  <>
                                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                    <span>Stop</span>
                      </>
                    ) : (
                      <>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* AI Typing Indicator */}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl px-4 py-3 border border-slate-200">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>

                {/* Text Input Area */}
                {!isInterviewComplete && (
                  <div className="border-t border-border/50 pt-4 mb-4">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <textarea
                          value={textInput}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setTextInput(e.target.value);
                              setIsUserTyping(e.target.value.length > 0);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleTextSubmit();
                            }
                          }}
                          onFocus={() => setIsUserTyping(true)}
                          onBlur={() => setIsUserTyping(false)}
                          placeholder="Type your response here... (Press Enter to send, Shift+Enter for new line)"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-200"
                          rows={3}
                          maxLength={500}
                          disabled={isSubmittingText || isAiTyping}
                          style={{ 
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(156 163 175) rgb(243 244 246)'
                          }}
                        />
                      </div>
                  <Button
                        onClick={handleTextSubmit}
                        disabled={!textInput.trim() || isSubmittingText || isAiTyping}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        size="sm"
                      >
                        {isSubmittingText ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          'Send'
                    )}
                  </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        💡 You can type your response here or use the voice recording above
                      </p>
                      <p className={`text-xs ${textInput.length > 450 ? 'text-orange-500' : textInput.length > 480 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {textInput.length}/500 characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="space-y-3 border-t border-border/50 pt-4">
                  {/* Status Indicator */}
                  {isTranscribing && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Processing your response...</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={endInterview}
                      variant="outline"
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      End Interview
                    </Button>
                    
                    <Button
                      onClick={resetQuestion}
                      disabled={!recordedBlob}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
