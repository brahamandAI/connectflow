import { NextRequest, NextResponse } from "next/server";

interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  suggestedAnswer?: string;
  tips?: string[];
}

interface JobDescription {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  company?: string;
  industry?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { jobDescription }: { jobDescription: JobDescription } = await request.json();

    if (!jobDescription || !jobDescription.title || !jobDescription.description) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    // Generate interview questions based on job description
    const questions = generateInterviewQuestions(jobDescription);

    return NextResponse.json({
      success: true,
      questions,
      totalQuestions: questions.length,
      jobTitle: jobDescription.title,
      company: jobDescription.company || "Unknown Company"
    });
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}

function generateInterviewQuestions(jobDescription: JobDescription): InterviewQuestion[] {
  const { title, description, requirements = [], responsibilities = [], company, industry } = jobDescription;
  
  // Extract key skills and technologies from description and requirements
  const text = `${description} ${requirements.join(" ")} ${responsibilities.join(" ")}`.toLowerCase();
  
  // Common technical skills to look for
  const technicalSkills = [
    "javascript", "python", "java", "react", "node.js", "sql", "aws", "docker", "kubernetes",
    "machine learning", "ai", "data analysis", "ui/ux", "agile", "scrum", "git", "api",
    "frontend", "backend", "full stack", "mobile", "ios", "android", "cloud", "devops"
  ];
  
  // Common soft skills
  const softSkills = [
    "leadership", "communication", "teamwork", "problem solving", "time management",
    "collaboration", "mentoring", "project management", "customer service", "analytical"
  ];
  
  // Detect skills mentioned in the job description
  const detectedSkills = technicalSkills.filter(skill => text.includes(skill));
  const detectedSoftSkills = softSkills.filter(skill => text.includes(skill));
  
  const questions: InterviewQuestion[] = [];
  
  // Technical Questions
  if (detectedSkills.length > 0) {
    detectedSkills.slice(0, 3).forEach(skill => {
      questions.push({
        id: `tech-${skill}-1`,
        question: `Can you walk me through your experience with ${skill}? What projects have you worked on using this technology?`,
        category: "Technical",
        difficulty: "Medium",
        suggestedAnswer: `I have worked with ${skill} in several projects. For example, in my previous role, I [describe specific project]. I used ${skill} to [explain how you used it] and achieved [specific results].`,
        tips: [
          "Provide specific examples of projects",
          "Mention the impact and results achieved",
          "Be honest about your skill level",
          "Show enthusiasm for learning new technologies"
        ]
      });
    });
  }
  
  // Behavioral Questions
  questions.push(
    {
      id: "behavioral-1",
      question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
      category: "Behavioral",
      difficulty: "Medium",
      suggestedAnswer: "I worked on a project where [describe the challenge]. I overcame this by [explain your approach] and the result was [describe the outcome]. This taught me [what you learned].",
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on your problem-solving approach",
        "Show resilience and adaptability",
        "Quantify results when possible"
      ]
    },
    {
      id: "behavioral-2",
      question: "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
      category: "Behavioral",
      difficulty: "Medium",
      suggestedAnswer: "I once worked with a colleague who [describe the situation]. I approached this by [explain your strategy] and we were able to [describe the positive outcome].",
      tips: [
        "Focus on collaboration and communication",
        "Show emotional intelligence",
        "Emphasize positive outcomes",
        "Avoid speaking negatively about others"
      ]
    }
  );
  
  // Role-Specific Questions
  if (title.toLowerCase().includes("senior") || title.toLowerCase().includes("lead")) {
    questions.push({
      id: "leadership-1",
      question: "How do you approach mentoring junior team members?",
      category: "Leadership",
      difficulty: "Hard",
      suggestedAnswer: "I believe in creating a supportive environment where junior team members feel comfortable asking questions. I typically [describe your mentoring approach] and focus on [specific strategies].",
      tips: [
        "Show patience and empathy",
        "Mention specific mentoring techniques",
        "Emphasize knowledge sharing",
        "Talk about your own learning journey"
      ]
    });
  }
  
  // Company/Industry Specific Questions
  if (company) {
    questions.push({
      id: "company-1",
      question: `What interests you about working at ${company}?`,
      category: "Company",
      difficulty: "Easy",
      suggestedAnswer: `I'm excited about ${company}'s [mention specific aspects like mission, technology, culture, or recent achievements]. I believe my skills in [your relevant skills] align well with [company's needs or values].`,
      tips: [
        "Research the company beforehand",
        "Mention specific company values or projects",
        "Connect your background to their needs",
        "Show genuine enthusiasm"
      ]
    });
  }
  
  // Problem-Solving Questions
  questions.push({
    id: "problem-solving-1",
    question: "How would you approach debugging a critical issue in production?",
    category: "Problem Solving",
    difficulty: "Hard",
    suggestedAnswer: "I would start by [describe systematic approach] and then [explain investigation steps]. I would also [mention communication and documentation].",
    tips: [
      "Show systematic thinking",
      "Emphasize communication with stakeholders",
      "Mention documentation and learning",
      "Show you prioritize user impact"
    ]
  });
  
  // Culture Fit Questions
  questions.push({
    id: "culture-1",
    question: "How do you stay updated with industry trends and new technologies?",
    category: "Culture Fit",
    difficulty: "Easy",
    suggestedAnswer: "I stay current through [mention specific methods like conferences, courses, blogs, etc.]. I recently learned [specific example] and applied it to [project or work].",
    tips: [
      "Show continuous learning mindset",
      "Mention specific resources you use",
      "Give examples of applying new knowledge",
      "Show enthusiasm for learning"
    ]
  });
  
  // Add some general questions based on job level
  if (title.toLowerCase().includes("junior") || title.toLowerCase().includes("entry")) {
    questions.push({
      id: "junior-1",
      question: "What are your career goals for the next 2-3 years?",
      category: "Career Goals",
      difficulty: "Easy",
      suggestedAnswer: "In the next 2-3 years, I want to [describe specific goals]. I'm particularly interested in [mention areas of interest] and hope to [describe desired growth].",
      tips: [
        "Show realistic and achievable goals",
        "Connect goals to the role",
        "Show ambition but also stability",
        "Mention specific skills you want to develop"
      ]
    });
  }
  
  // Shuffle questions and return
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
} 