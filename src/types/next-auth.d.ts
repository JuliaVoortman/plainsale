import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      orgId: string;
      role: string;
    }
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    orgId: string;
    role: string;
  }
}