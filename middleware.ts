import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (isPublicPath) {
    if (isAuthenticated) {
      // Redirect to dashboard if user is already logged in
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!isAuthenticated) {
    let callbackUrl = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      callbackUrl += request.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};