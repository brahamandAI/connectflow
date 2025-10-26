"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Users,
  Briefcase,
  Star
} from "lucide-react";
import { Button } from "../ui/button";

interface JobRecommendationAnalysisProps {
  analysis: {
    overallAssessment: string;
    skillGaps: string[];
    strengths: string[];
    marketInsights: {
      demand: string;
      trends: string[];
      opportunities: string[];
    };
    recommendations: string[];
    nextSteps: string[];
  };
  className?: string;
}

export const JobRecommendationAnalysis = ({ analysis, className }: JobRecommendationAnalysisProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">AI Career Analysis</h3>
          <p className="text-sm text-muted-foreground">Personalized insights for your job search</p>
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-foreground">Overall Assessment</h4>
        </div>
        <p className="text-sm text-muted-foreground bg-white/50 rounded-lg p-3 border border-blue-100">
          {analysis.overallAssessment}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-foreground">Your Strengths</h4>
          </div>
          <div className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-foreground">Areas for Growth</h4>
          </div>
          <div className="space-y-2">
            {analysis.skillGaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{gap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold text-foreground">Market Insights</h4>
        </div>
        <div className="bg-white/50 rounded-lg p-4 border border-purple-100">
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground mb-2">Current Demand</p>
            <p className="text-sm text-muted-foreground">{analysis.marketInsights.demand}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground mb-2">Industry Trends</p>
            <div className="flex flex-wrap gap-2">
              {analysis.marketInsights.trends.map((trend, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {trend}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Opportunities</p>
            <div className="flex flex-wrap gap-2">
              {analysis.marketInsights.opportunities.map((opportunity, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {opportunity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold text-foreground">AI Recommendations</h4>
        </div>
        <div className="space-y-2">
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-orange-100">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-orange-600">{index + 1}</span>
              </div>
              <span className="text-sm text-muted-foreground">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-foreground">Next Steps</h4>
        </div>
        <div className="space-y-2">
          {analysis.nextSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-green-100">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          <Briefcase className="w-4 h-4 mr-2" />
          View All Jobs
        </Button>
        <Button variant="outline" className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50">
          <Star className="w-4 h-4 mr-2" />
          Update Profile
        </Button>
      </div>
    </motion.div>
  );
};
