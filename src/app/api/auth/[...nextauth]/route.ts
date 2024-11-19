import NextAuth from 'next-auth';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo purposes, hardcoded credentials
        if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
          const [user] = await db.select()
            .from(users)
            .where(eq(users.email, 'demo@example.com'));

          if (!user) {
            // Create demo user if it doesn't exist
            const [newUser] = await db.insert(users)
              .values({
                email: 'demo@example.com',
                name: 'Demo User',
                orgId: 'demo-org',
                role: 'admin'
              })
              .returning();
            
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              orgId: newUser.orgId,
              role: newUser.role
            };
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            orgId: user.orgId,
            role: user.role
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.orgId = user.orgId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.orgId = token.orgId as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };