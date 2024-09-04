import type { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import Navbar from "./components/molecules/Navbar";
import "./globals.css";

/**
 * Metadata for the app, each page will inherit these metadata
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Gnoseek - Learning platform with ai powered content",
  description:
    "Gnoseek is a learning platform with ai powered content, flashcards, study sheets, flowcharts and more. It's your fast, effective and engaging learning platform.",
  keywords:
    "gnoseek, learning, platform, comprehensive, engaging, online learning, ai, artificial intelligence",
  authors: [{ name: "Cas", url: "https://github.com/casiimir" }],
  openGraph: {
    title: "Gnoseek",
    description: "Learning platform with ai powered content",
    type: "website",
    url: "https://gnoseek.vercel.app",
  },
  twitter: {
    site: "@casiimir",
    creator: "@casiimir",
  },
};

/**
 * Root layout component for the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The root layout structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="light">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="min-h-screen flex flex-col">
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow flex gap-4 mb-24 p-4 no-scrollbar md:ml-20 md:pl-8 md:mb-0">
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </main>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
