import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";
import { currentUser } from "@clerk/nextjs/server";
import { fetchGoogleTrends, TrendData } from "@/app/utils/googleTrends";

import LanguageSelector from "@/app/components/molecules/LanguageSelector";
import HeroSection from "@/app/components/organisms/HeroSection";
import TopicsSection from "@/app/components/organisms/TopicsSection";
import TrendsSection from "@/app/components/organisms/TrendsSection";
import DynamicUserSection from "@/app/components/molecules/DynamicUserSection";
import SearchInput from "@/app/components/molecules/SearchInput";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Metadata for the Home page
 */
export const metadata: Metadata = {
  title: "Gnoseek - Your Comprehensive Learning Platform",
  description:
    "Gnoseek is an AI-powered knowledge explorer that generates comprehensive reports on any topic, formats code snippets beautifully, provides keywords, flashcards, study flowcharts, and examples.",
  keywords:
    "gnoseek, learning, platform, comprehensive, engaging, online learning",
};

/**
 * Home component - The main page of the Gnoseek application
 *
 * This component renders the home page, including sections for topics, trends,
 * and user-specific content. It also handles user authentication and data storage.
 *
 * @returns {Promise<JSX.Element>} The rendered Home component
 */
export default async function Home(): Promise<JSX.Element> {
  const client = convexClient();
  const loggedUser = await currentUser();
  const selectedTrends: TrendData[] = await fetchGoogleTrends("t");

  // Store user data in the database if a user is logged in
  if (loggedUser) {
    await client.mutation(api.users.store, {
      userId: loggedUser.id as Id<"userData">,
      firstName: loggedUser.firstName as string,
      secondName: loggedUser.lastName as string,
      imgUrl: loggedUser.imageUrl as string,
    });
  }

  return (
    <>
      <section id="content" className="flex flex-col gap-2 w-full lg:w-4/6">
        <div className="lg:hidden">
          <LanguageSelector />
        </div>
        <HeroSection />
        <TopicsSection />
        <div className="divider my-0"></div>
        <TrendsSection selectedTrends={selectedTrends} />
      </section>
      <section
        id="user"
        className="flex-col justify-start items-center gap-6 w-2/6 py-8 px-4 rounded-2xl bg-pine-cone-200 shadow-pine-cone-400 shadow-sm hidden lg:flex"
      >
        <LanguageSelector />
        <SearchInput />
        <DynamicUserSection userId={loggedUser?.id} />
      </section>
    </>
  );
}
