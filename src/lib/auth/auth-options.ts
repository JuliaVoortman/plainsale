import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
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

        // For demo purposes, accept a dummy user
        if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
          const user = await prisma.user.upsert({
            where: { email: 'demo@example.com' },
            update: {},
            create: {
              email: 'demo@example.com',
              name: 'Demo User',
              organization: {
                create: {
                  name: 'Demo Organization',
                  slug: 'demo-org'
                }
              }
            },
            include: {
              organization: true
            }
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            orgId: user.orgId
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
        token.orgId = user.orgId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.orgId = token.orgId as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  }
};