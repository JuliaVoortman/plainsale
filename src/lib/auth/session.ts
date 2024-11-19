import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true }
  });

  if (!user) return null;

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      orgId: user.orgId
    },
    organization: {
      id: user.organization.id,
      name: user.organization.name,
      slug: user.organization.slug
    }
  };
}