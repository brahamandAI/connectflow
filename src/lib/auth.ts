import type { Session, User, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code: string, ...message: unknown[]) {
      console.error(`[NextAuth] Error ${code}:`, ...message);
    },
    warn(code: string, ...message: unknown[]) {
      console.warn(`[NextAuth] Warning ${code}:`, ...message);
    },
    debug(code: string, ...message: unknown[]) {
      console.log(`[NextAuth] Debug ${code}:`, ...message);
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          throw new Error("Email, password, and role are required");
        }
        
        // Normalize email: trim whitespace and convert to lowercase
        const normalizedEmail = credentials.email.toLowerCase().trim();
        console.log(`[Auth] Login attempt for: ${normalizedEmail} (original: ${credentials.email})`);
        
        // For now, we'll use the separate models but create a unified user entry
        // This maintains backward compatibility while supporting the new unified system
        let user = null;
        if (credentials.role === "recruiter") {
          // Try case-insensitive search for recruiter
          const recruiter = await prisma.recruiter.findFirst({
            where: {
              email: {
                equals: normalizedEmail,
                mode: 'insensitive'
              }
            },
          });
          
          if (!recruiter) {
            console.log(`[Auth] Recruiter not found with email: ${normalizedEmail}`);
            throw new Error("Invalid email or password");
          }
          
          user = recruiter;
          console.log(`[Auth] Found recruiter: ${user.id}`);
        } else if (credentials.role === "jobseeker") {
          // Try case-insensitive search for job seeker
          const jobSeeker = await prisma.jobSeeker.findFirst({
            where: {
              email: {
                equals: normalizedEmail,
                mode: 'insensitive'
              }
            },
            select: {
              id: true,
              email: true,
              password: true,
              fullName: true,
              currentJobTitle: true,
              city: true,
            }
          });
          
          if (!jobSeeker) {
            console.log(`[Auth] Job seeker not found with email: ${normalizedEmail}`);
            throw new Error("Invalid email or password");
          }
          
          user = jobSeeker;
          console.log(`[Auth] Found job seeker: ${user.id}`);
        }
        
        if (!user) {
          throw new Error("Invalid email or password");
        }
        if (!user.password) {
          throw new Error("Invalid email or password");
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log(`[Auth] Invalid password for: ${normalizedEmail}`);
          throw new Error("Invalid email or password");
        }
        
        console.log(`[Auth] Password valid for: ${normalizedEmail}`);
        
        // Check if user exists in unified User table, create if not
        let unifiedUser = await prisma.user.findFirst({
          where: {
            email: {
              equals: normalizedEmail,
              mode: 'insensitive'
            }
          },
        });
        
        if (!unifiedUser) {
          unifiedUser = await prisma.user.create({
            data: {
              email: normalizedEmail,
              fullName: user.fullName,
              role: credentials.role,
              headline: credentials.role === 'jobseeker' ? (user as any).currentJobTitle : undefined,
              companyName: credentials.role === 'recruiter' ? (user as any).companyName : undefined,
              location: credentials.role === 'jobseeker' ? user.city : undefined,
            },
          });
        }
        
        // Remove password from user object and return unified user data
        return {
          id: unifiedUser.id,
          email: unifiedUser.email,
          fullName: unifiedUser.fullName,
          role: unifiedUser.role,
          profileImage: unifiedUser.profileImage,
          headline: unifiedUser.headline,
          location: unifiedUser.location,
          companyName: unifiedUser.companyName,
        };
      },
    }),
  ],
    callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      console.log("SignIn callback called:", { user: user?.email, account: account?.provider });  
      
      // Always allow sign in for now
      return true;
    },
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: any }) {
      console.log("JWT callback called:", { 
        hasUser: !!user, 
        userEmail: user?.email, 
        provider: account?.provider,
        tokenId: token.id 
      });
      
      if (user) {
        // Handle Google OAuth
        if (account?.provider === "google") {
          const normalizedEmail = user.email!.toLowerCase().trim();
          console.log("Processing Google OAuth user:", normalizedEmail);
          
          try {
            // Check if user exists in unified User table (case-insensitive)
            let unifiedUser = await prisma.user.findFirst({
              where: {
                email: {
                  equals: normalizedEmail,
                  mode: 'insensitive'
                }
              },
            });
            
            if (!unifiedUser) {
              // Check legacy tables first (case-insensitive)
              const existingJobSeeker = await prisma.jobSeeker.findFirst({
                where: {
                  email: {
                    equals: normalizedEmail,
                    mode: 'insensitive'
                  }
                },
              });
              
              const existingRecruiter = await prisma.recruiter.findFirst({
                where: {
                  email: {
                    equals: normalizedEmail,
                    mode: 'insensitive'
                  }
                },
              });
              
              let role = "jobseeker"; // Default role
              let legacyData = null;
              
              if (existingJobSeeker) {
                console.log("Found existing job seeker, migrating to unified model");
                role = "jobseeker";
                legacyData = existingJobSeeker;
              } else if (existingRecruiter) {
                console.log("Found existing recruiter, migrating to unified model");
                role = "recruiter";
                legacyData = existingRecruiter;
              }
              
              // Create unified user entry
              console.log("Creating unified user for Google user:", normalizedEmail);
              unifiedUser = await prisma.user.create({
                data: {
                  email: normalizedEmail,
                  fullName: user.name || normalizedEmail.split('@')[0] || "Google User",
                  role: role,
                  headline: (legacyData as any)?.currentJobTitle || undefined,
                  companyName: (legacyData as any)?.companyName || undefined,
                  location: legacyData?.city || undefined,
                },
              });
              console.log("Created unified user with ID:", unifiedUser.id);
            } else {
              console.log("Found existing unified user:", unifiedUser.id);
            }
            
            token.id = unifiedUser.id;
            token.email = user.email;
            token.role = unifiedUser.role;
            token.name = user.name;
            token.profileImage = unifiedUser.profileImage;
            token.headline = unifiedUser.headline;
            token.companyName = unifiedUser.companyName;
            
            console.log("Set token with ID:", token.id, "and role:", token.role);
          } catch (error) {
            console.error("Error processing Google OAuth user:", error);
            // Don't throw error, just log it and continue
            console.log("Continuing without user creation...");
          }
        } else {
                   // Handle credentials login
         token.id = user.id;
         token.email = user.email;
         token.role = (user as any).role;
         token.name = (user as any).name;
         token.profileImage = (user as any).profileImage;
         token.headline = (user as any).headline;
         token.companyName = (user as any).companyName;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback called:", { 
        tokenId: token.id, 
        tokenRole: token.role, 
        tokenEmail: token.email 
      });
      
             if (token) {
         // Ensure session user exists
         if (!session.user) {
           session.user = {} as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string };
         }
         
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).id = token.id as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).role = token.role as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).email = token.email as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).name = token.name as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).profileImage = token.profileImage as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).headline = token.headline as string;
         (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).companyName = token.companyName as string;
         
         console.log("Session user set:", {
           id: (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).id,
           role: (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).role,
           email: (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).email,
           name: (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).name,
           profileImage: (session.user as { id?: string; role?: string; email?: string; name?: string; profileImage?: string; headline?: string; companyName?: string }).profileImage
         });
       }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("NextAuth redirect called with:", { url, baseUrl });
      
      // Handle Google OAuth callback
      if (url.includes("/api/auth/callback/google")) {
        console.log("Google OAuth callback detected");
        // We'll let the client-side handle the redirect based on user role
        return `${baseUrl}/auth/role-redirect`;
      }
      
      // Handle other redirects
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      
      // Default redirect
      return `${baseUrl}/posts`;
    },
  },
  pages: {
    signIn: "/auth/jobseeker/login", // Redirect to job seeker login page
  },
  secret: process.env.NEXTAUTH_SECRET || "your-nextauth-secret-key-change-in-production",
};
