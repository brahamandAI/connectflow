// Mock data for when database is not available

export const mockUsers = [
  {
    id: "user1",
    fullName: "John Doe",
    profileImage: "https://via.placeholder.com/150?text=JD",
    headline: "Senior Software Engineer",
    role: "jobseeker",
    companyName: "Tech Corp",
    location: "San Francisco, CA",
  },
  {
    id: "user2", 
    fullName: "Sarah Smith",
    profileImage: "https://via.placeholder.com/150?text=SS",
    headline: "Product Manager",
    role: "jobseeker",
    companyName: "Innovation Labs",
    location: "New York, NY",
  },
  {
    id: "user3",
    fullName: "Mike Johnson", 
    profileImage: "https://via.placeholder.com/150?text=MJ",
    headline: "Recruiting Manager",
    role: "recruiter",
    companyName: "HireFast Inc",
    location: "Austin, TX",
  },
];

export const mockPosts = [
  {
    id: "post1",
    content: "Excited to share that I just completed my React certification! Looking forward to applying these new skills in my next project. #React #WebDevelopment #Learning",
    postType: "general",
    likesCount: 12,
    commentsCount: 3,
    sharesCount: 1,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    author: mockUsers[0],
  },
  {
    id: "post2",
    content: "We're hiring! Looking for a talented Full Stack Developer to join our team. Remote work available, competitive salary, and amazing benefits. Check out the job posting for more details!",
    postType: "job_update",
    likesCount: 8,
    commentsCount: 5,
    sharesCount: 2,
    isLikedByUser: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    author: mockUsers[2],
  },
  {
    id: "post3",
    content: "Just wrapped up an amazing product launch! The team worked incredibly hard and I'm proud of what we accomplished together. Thanks to everyone who supported us along the way.",
    postType: "announcement",
    likesCount: 15,
    commentsCount: 7,
    sharesCount: 3,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    author: mockUsers[1],
  },
];

export const mockJobs = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "New York, NY (Remote)",
    employmentType: "Full-time",
    salaryMin: 120000,
    salaryMax: 150000,
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "job2", 
    title: "UX/UI Designer",
    company: "Design Masters",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    salaryMin: 90000,
    salaryMax: 120000,
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["Figma", "UI/UX", "User Research"],
  },
  {
    id: "job3",
    title: "DevOps Engineer", 
    company: "Cloud Systems",
    location: "Remote",
    employmentType: "Contract",
    salaryMin: 130000,
    salaryMax: 160000,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
  },
];
