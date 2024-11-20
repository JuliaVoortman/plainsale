import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/api/deal-rooms/:path*",
    "/api/team/:path*",
    "/api/settings/:path*",
  ],
};