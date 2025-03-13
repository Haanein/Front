import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login"], // Pages that don't require authentication
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL("/login", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Apply middleware to all pages except API and static files
};
