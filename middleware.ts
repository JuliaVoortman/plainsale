import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/api/deal-rooms/:path*",
    "/api/team/:path*",
    "/api/settings/:path*",
  ],
};