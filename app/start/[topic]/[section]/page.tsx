import { cookies } from "next/headers";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";
import { currentUser } from "@clerk/nextjs/server";
import { slugify } from "@/app/utils";

import AddToLibraryButton from "@/app/components/molecules/AddToLibraryButton";
import SocialShare from "@/app/components/molecules/SocialShare";
import FlashcardsSection from "@/app/components/organisms/FlashcardsSection";
import SummarySection from "@/app/components/organisms/SummarySection";
import KeywordsSection from "@/app/components/organisms/KeywordsSection";
import FlowchartSection from "@/app/components/organisms/FlowchartSection";
import StudySheetSection from "@/app/components/organisms/StudySheetSection";
import { SummaryData } from "@/types/components/main";

interface ArgumentPageProps {
  params: { topic: string; section: string };
}

/**
 * ArgumentPage component - Renders a page for a specific topic and section
 *
 * This component fetches and displays various study materials for a given topic and section,
 * including summary, flashcards, keywords, flowchart, and studysheet.
 *
 * @param {ArgumentPageProps} props - The props for the ArgumentPage component
 * @param {Object} props.params - The parameters passed to the page
 * @param {string} props.params.topic - The topic name
 * @param {string} props.params.section - The section name
 * @returns {Promise<JSX.Element>} The rendered ArgumentPage component
 */
export default async function ArgumentPage({
  params,
}: ArgumentPageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const client = convexClient();
  const { topic, section } = params;

  // Get the user's language preference from cookies, defaulting to 'en'
  const lang = cookieStore.get("lang")?.value || "en";

  // Add to last read for logged-in users
  const loggedUser = await currentUser();

  if (loggedUser) {
    await client.mutation(api.userData.addToLastRead, {
      lastRead: { title: topic, sectionName: section },
      id: loggedUser.id,
    });
  }

  const summaryData = await client.action(api.ai.fetchSummary, {
    text: section,
    lang,
  });

  const parsedSummaryData: SummaryData = JSON.parse(summaryData);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 h-12 md:mx-8">
        <SocialShare
          title={parsedSummaryData.title}
          url={`https://gnoseek.vercel.app/start/search/${slugify(parsedSummaryData.title)}`}
        />
        <AddToLibraryButton title={topic} sectionName={section} />
      </div>
      <div className="flex flex-col gap-4 w-full lg:flex-row">
        <SummarySection summaryData={parsedSummaryData} />
        <div className="divider mt-12 lg:hidden">
          <h1 className="text-xl font-bold">Flashcards</h1>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-2/5">
          <FlashcardsSection section={section} />
          <div className="divider mt-12 lg:hidden">
            <h1 className="text-xl font-bold">Keywords</h1>
          </div>
          <KeywordsSection section={section} />
        </div>
      </div>
      <div className="divider mt-12">
        <h1 className="text-xl font-bold">Flowchart</h1>
      </div>
      <FlowchartSection flowchartArgument={section} />
      <div className="divider mt-12">
        <h1 className="text-xl font-bold">Studysheet</h1>
      </div>
      <StudySheetSection studySheetArgument={section} />
    </div>
  );
}
