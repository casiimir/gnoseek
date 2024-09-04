"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

/**
 * Provides the Convex client to the application.
 * @param {ReactNode} children - The child elements to be wrapped by the ConvexProvider.
 * @returns {ReactNode} - The ConvexProvider component wrapping the children.
 */
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
