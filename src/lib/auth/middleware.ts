import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  if (!token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(url);
  }

  // Handle guest access to deal rooms
  if (request.nextUrl.pathname.startsWith('/d/')) {
    const dealRoomSlug = request.nextUrl.pathname.split('/')[2];
    // Verify deal room access here
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/d/:path*',
    '/admin/:path*'
  ]
}