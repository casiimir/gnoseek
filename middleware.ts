/**
 * Middleware configuration for Clerk authentication.
 * @module middleware
 */

import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Default export of the Clerk middleware.
 * This middleware handles authentication and user sessions.
 */
export default clerkMiddleware();

/**
 * Configuration object for the middleware.
 * @property {string[]} matcher - Array of path patterns to match for middleware execution.
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
