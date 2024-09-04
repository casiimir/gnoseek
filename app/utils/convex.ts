import { ConvexHttpClient } from "convex/browser";

/**
 * Creates and returns a new ConvexHttpClient instance.
 *
 * This function initializes a ConvexHttpClient using the Convex URL
 * specified in the NEXT_PUBLIC_CONVEX_URL environment variable.
 *
 * @returns {ConvexHttpClient} A new instance of ConvexHttpClient.
 * @throws {Error} If NEXT_PUBLIC_CONVEX_URL is not defined in the environment.
 */
export const convexClient = (): ConvexHttpClient => {
  // Ensure that the Convex URL is defined in the environment
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined in the environment");
  }

  // Create and return a new ConvexHttpClient instance
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
};
