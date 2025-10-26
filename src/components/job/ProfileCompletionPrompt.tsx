"use client";

import { motion } from "framer-motion";
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Settings
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProfileCompletionPromptProps {
  missingFields?: {
    skills?: boolean;
    name?: boolean;
    location?: boolean;
    experience?: boolean;
    education?: boolean;
  };
  className?: string;
}

export const ProfileCompletionPrompt = ({ missingFields, className }: ProfileCompletionPromptProps) => {
  const completionSteps = [
    {
      id: 'name',
      title: 'Complete Basic Information',
      description: 'Add your full name and contact details',
      icon: <User className="w-5 h-5" />,
      required: true,
      missing: missingFields?.name,
      href: '/dashboard/job-seeker/profile'
    },
    {
      id: 'skills',
      title: 'Add Your Skills',
      description: 'List your technical and soft skills',
      icon: <Star className="w-5 h-5" />,
      required: true,
      missing: missingFields?.skills,
      href: '/dashboard/job-seeker/profile'
    },
    {
      id: 'location',
      title: 'Set Your Location',
      description: 'Add your city, state, and country',
      icon: <MapPin className="w-5 h-5" />,
      required: false,
      missing: missingFields?.location,
      href: '/dashboard/job-seeker/profile'
    },
    {
      id: 'experience',
      title: 'Add Work Experience',
      description: 'Include your current role and years of experience',
      icon: <Briefcase className="w-5 h-5" />,
      required: false,
      missing: missingFields?.experience,
      href: '/dashboard/job-seeker/profile'
    },
    {
      id: 'education',
      title: 'Add Education',
      description: 'Include your educational background',
      icon: <GraduationCap className="w-5 h-5" />,
      required: false,
      missing: missingFields?.education,
      href: '/dashboard/job-seeker/profile'
    }
  ];

  const requiredSteps = completionSteps.filter(step => step.required);
  const missingRequiredSteps = requiredSteps.filter(step => step.missing);
  const completedSteps = completionSteps.filter(step => !step.missing);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Complete Your Profile
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Add your skills and experience to get personalized AI job recommendations tailored just for you.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className="text-sm text-muted-foreground">
            {completedSteps.length} of {completionSteps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / completionSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Completion Steps */}
      <div className="space-y-4 mb-8">
        {completionSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
              step.missing 
                ? 'bg-red-50 border-red-200' 
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className={`p-2 rounded-full ${
              step.missing 
                ? 'bg-red-100 text-red-600' 
                : 'bg-green-100 text-green-600'
            }`}>
              {step.missing ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground">{step.title}</h4>
                {step.required && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                    Required
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
            
            {step.missing && (
              <Link href={step.href}>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Complete
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard/job-seeker/profile" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Complete Profile Now
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
          onClick={() => window.location.reload()}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Refresh Recommendations
        </Button>
      </div>

      {/* Benefits */}
      <div className="mt-8 pt-6 border-t border-blue-200">
        <h4 className="font-medium text-foreground mb-4">Why complete your profile?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Star className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Better Job Matches</p>
              <p className="text-xs text-muted-foreground">AI can find jobs that match your exact skills</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Briefcase className="w-3 h-3 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Career Insights</p>
              <p className="text-xs text-muted-foreground">Get personalized career advice and analysis</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
