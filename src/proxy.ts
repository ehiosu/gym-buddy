import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";
import {
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth(.*)"]);
const isProtectedRoute = createRouteMatcher(["/dashboard"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/dashboard");
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/auth/signin");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
