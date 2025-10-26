import { prisma } from './prisma';

export async function seedFeedData() {
  try {
    // Create sample users
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'john.doe@example.com' },
        update: {},
        create: {
          email: 'john.doe@example.com',
          fullName: 'John Doe',
          headline: 'Senior Software Engineer',
          role: 'jobseeker',
          companyName: 'Tech Corp',
          location: 'San Francisco, CA',
        },
      }),
      prisma.user.upsert({
        where: { email: 'sarah.smith@example.com' },
        update: {},
        create: {
          email: 'sarah.smith@example.com',
          fullName: 'Sarah Smith',
          headline: 'Product Manager',
          role: 'jobseeker',
          companyName: 'Innovation Labs',
          location: 'New York, NY',
        },
      }),
      prisma.user.upsert({
        where: { email: 'mike.johnson@example.com' },
        update: {},
        create: {
          email: 'mike.johnson@example.com',
          fullName: 'Mike Johnson',
          headline: 'Recruiting Manager',
          role: 'recruiter',
          companyName: 'HireFast Inc',
          location: 'Austin, TX',
        },
      }),
    ]);

    // Create sample posts
    const posts = await Promise.all([
      prisma.post.create({
        data: {
          content: 'Excited to share that I just completed my React certification! Looking forward to applying these new skills in my next project. #React #WebDevelopment #Learning',
          postType: 'general',
          authorId: users[0].id,
          authorRole: users[0].role,
        },
      }),
      prisma.post.create({
        data: {
          content: 'We\'re hiring! Looking for a talented Full Stack Developer to join our team. Remote work available, competitive salary, and amazing benefits. Check out the job posting for more details!',
          postType: 'job_update',
          authorId: users[2].id,
          authorRole: users[2].role,
        },
      }),
      prisma.post.create({
        data: {
          content: 'Just wrapped up an amazing product launch! The team worked incredibly hard and I\'m proud of what we accomplished together. Thanks to everyone who supported us along the way.',
          postType: 'announcement',
          authorId: users[1].id,
          authorRole: users[1].role,
        },
      }),
      prisma.post.create({
        data: {
          content: 'Attending the React Conference 2024 next week! Can\'t wait to learn about the latest trends and network with fellow developers. Anyone else going?',
          postType: 'general',
          authorId: users[0].id,
          authorRole: users[0].role,
        },
      }),
    ]);

    console.log('Feed data seeded successfully!');
    return { users, posts };
  } catch (error) {
    console.error('Error seeding feed data:', error);
    throw error;
  }
}

export async function seedJobsData() {
  try {
    // First, get or create a recruiter user
    const recruiter = await prisma.recruiter.upsert({
      where: { email: 'recruiter@techcorp.com' },
      update: {},
      create: {
        email: 'recruiter@techcorp.com',
        fullName: 'Sarah Johnson',
        companyName: 'TechCorp Solutions',
        phone: '+1-555-0123',
        position: 'Senior Recruiter',
        companySize: '100-500',
        industry: 'Technology',
        website: 'https://techcorp.com',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        profileComplete: true,
        emailVerified: true,
      },
    });

    // Create sample jobs
    const jobs = await Promise.all([
      prisma.job.create({
        data: {
          title: 'Senior Full Stack Developer',
          department: 'Engineering',
          company: 'TechCorp Solutions',
          companyId: recruiter.id,
          location: 'San Francisco, CA',
          locationType: 'Hybrid',
          employmentType: 'Full-time',
          experienceLevel: 'Senior',
          salaryMin: 120000,
          salaryMax: 180000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          description: 'We are looking for a Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining our web applications using modern technologies.',
          responsibilities: [
            'Develop and maintain web applications using React and Node.js',
            'Collaborate with cross-functional teams to define and implement new features',
            'Write clean, maintainable, and efficient code',
            'Participate in code reviews and technical discussions',
            'Mentor junior developers'
          ],
          requirements: [
            '5+ years of experience in full-stack development',
            'Proficiency in React, Node.js, and TypeScript',
            'Experience with databases (PostgreSQL, MongoDB)',
            'Knowledge of cloud platforms (AWS, Azure)',
            'Strong problem-solving and communication skills'
          ],
          benefits: [
            'Health insurance',
            'Dental and vision coverage',
            '401(k) with company matching',
            'Flexible work hours',
            'Remote work options',
            'Professional development budget'
          ],
          applicationDeadline: '2024-02-15',
          postedBy: recruiter.id,
          applicantsCount: 0,
        },
      }),
      prisma.job.create({
        data: {
          title: 'Product Manager',
          department: 'Product',
          company: 'TechCorp Solutions',
          companyId: recruiter.id,
          location: 'New York, NY',
          locationType: 'Remote',
          employmentType: 'Full-time',
          experienceLevel: 'Mid-level',
          salaryMin: 100000,
          salaryMax: 150000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          description: 'Join our product team as a Product Manager and help shape the future of our platform. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.',
          responsibilities: [
            'Define product strategy and roadmap',
            'Gather and analyze user requirements',
            'Work with engineering teams to prioritize features',
            'Conduct market research and competitive analysis',
            'Collaborate with stakeholders across the organization'
          ],
          requirements: [
            '3+ years of product management experience',
            'Strong analytical and problem-solving skills',
            'Experience with agile development methodologies',
            'Excellent communication and presentation skills',
            'Technical background preferred'
          ],
          benefits: [
            'Competitive salary and equity',
            'Health and wellness benefits',
            'Flexible PTO policy',
            'Learning and development opportunities',
            'Team building events'
          ],
          applicationDeadline: '2024-02-20',
          postedBy: recruiter.id,
          applicantsCount: 0,
        },
      }),
      prisma.job.create({
        data: {
          title: 'Frontend Developer',
          department: 'Engineering',
          company: 'TechCorp Solutions',
          companyId: recruiter.id,
          location: 'Austin, TX',
          locationType: 'On-site',
          employmentType: 'Full-time',
          experienceLevel: 'Mid-level',
          salaryMin: 80000,
          salaryMax: 120000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          description: 'We are seeking a talented Frontend Developer to join our team. You will be responsible for creating beautiful, responsive user interfaces and ensuring excellent user experiences.',
          responsibilities: [
            'Develop responsive web applications using React',
            'Implement UI/UX designs with pixel-perfect accuracy',
            'Optimize applications for maximum speed and scalability',
            'Collaborate with designers and backend developers',
            'Write unit and integration tests'
          ],
          requirements: [
            '2+ years of frontend development experience',
            'Proficiency in React, JavaScript, and CSS',
            'Experience with modern build tools (Webpack, Vite)',
            'Knowledge of responsive design principles',
            'Familiarity with version control (Git)'
          ],
          benefits: [
            'Health insurance',
            'Dental coverage',
            '401(k) plan',
            'Paid time off',
            'Professional development',
            'Gym membership'
          ],
          applicationDeadline: '2024-02-25',
          postedBy: recruiter.id,
          applicantsCount: 0,
        },
      }),
      prisma.job.create({
        data: {
          title: 'Data Scientist',
          department: 'Data Science',
          company: 'TechCorp Solutions',
          companyId: recruiter.id,
          location: 'Seattle, WA',
          locationType: 'Hybrid',
          employmentType: 'Full-time',
          experienceLevel: 'Senior',
          salaryMin: 130000,
          salaryMax: 200000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          description: 'Join our data science team and help us extract insights from large datasets. You will work on machine learning models, statistical analysis, and data visualization projects.',
          responsibilities: [
            'Develop machine learning models and algorithms',
            'Analyze large datasets to extract business insights',
            'Create data visualizations and reports',
            'Collaborate with engineering teams to deploy models',
            'Stay up-to-date with latest data science techniques'
          ],
          requirements: [
            '4+ years of data science experience',
            'Proficiency in Python, R, and SQL',
            'Experience with machine learning frameworks (TensorFlow, PyTorch)',
            'Knowledge of statistical analysis and modeling',
            'Strong communication and presentation skills'
          ],
          benefits: [
            'Competitive salary and bonus',
            'Comprehensive health benefits',
            'Flexible work arrangements',
            'Conference and training budget',
            'Stock options',
            'Relocation assistance'
          ],
          applicationDeadline: '2024-03-01',
          postedBy: recruiter.id,
          applicantsCount: 0,
        },
      }),
      prisma.job.create({
        data: {
          title: 'DevOps Engineer',
          department: 'Engineering',
          company: 'TechCorp Solutions',
          companyId: recruiter.id,
          location: 'Remote',
          locationType: 'Remote',
          employmentType: 'Full-time',
          experienceLevel: 'Mid-level',
          salaryMin: 90000,
          salaryMax: 140000,
          salaryCurrency: 'USD',
          salaryPeriod: 'yearly',
          description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work on automation, monitoring, and deployment pipelines.',
          responsibilities: [
            'Design and implement CI/CD pipelines',
            'Manage cloud infrastructure (AWS, Azure)',
            'Automate deployment and monitoring processes',
            'Ensure system reliability and performance',
            'Collaborate with development teams'
          ],
          requirements: [
            '3+ years of DevOps experience',
            'Experience with cloud platforms (AWS, Azure, GCP)',
            'Knowledge of containerization (Docker, Kubernetes)',
            'Proficiency in scripting languages (Bash, Python)',
            'Experience with monitoring tools (Prometheus, Grafana)'
          ],
          benefits: [
            'Health and dental insurance',
            '401(k) with matching',
            'Unlimited PTO',
            'Home office stipend',
            'Learning and development budget',
            'Annual team retreats'
          ],
          applicationDeadline: '2024-03-05',
          postedBy: recruiter.id,
          applicantsCount: 0,
        },
      }),
    ]);

    console.log('Jobs data seeded successfully!');
    return { recruiter, jobs };
  } catch (error) {
    console.error('Error seeding jobs data:', error);
    throw error;
  }
}
