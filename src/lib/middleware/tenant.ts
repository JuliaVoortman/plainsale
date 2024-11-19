import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function withTenant(
  handler: (req: Request, orgId: string) => Promise<Response>,
  req: Request
) {
  const session = await getSession();
  
  if (!session?.user?.orgId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return handler(req, session.user.orgId);
}