import { cookies } from "next/headers";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";
import { currentUser } from "@clerk/nextjs/server";
import { slugify } from "@/app/utils"; // Import the slugify function

import PdfGenComponent from "@/app/components/molecules/PdfGenComponent";
import SocialShare from "@/app/components/molecules/SocialShare";
import AddToLibraryButton from "@/app/components/molecules/AddToLibraryButton";
import SummarySection from "@/app/components/organisms/SummarySection";
import FlashcardsSection from "@/app/components/organisms/FlashcardsSection";
import KeywordsSection from "@/app/components/organisms/KeywordsSection";
import FlowchartSection from "@/app/components/organisms/FlowchartSection";
import StudySheetSection from "@/app/components/organisms/StudySheetSection";
import { SummaryData } from "@/types/components/main";

/**
 * Props for the ArgumentPage component
 * @interface ArgumentPageProps
 * @property {Object} params - URL parameters
 * @property {string} params.topic - The topic of the page
 * @property {string} params.section - The section of the topic
 */
interface ArgumentPageProps {
  params: { topic: string; section: string };
}

/**
 * ArgumentPage component
 * Renders a page with various sections related to a specific topic and section
 * @param {ArgumentPageProps} props - The component props
 * @returns {Promise<JSX.Element>} The rendered ArgumentPage component
 */
export default async function ArgumentPage({
  params,
}: ArgumentPageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const client = convexClient();
  const { topic, section } = params;

  const lang = cookieStore.get("lang")?.value || "en";
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
      <div className="flex justify-between items-center mb-4 h-12 md:mx-8">
        <div className="flex gap-2">
          <PdfGenComponent />
          <SocialShare
            title={parsedSummaryData.title}
            url={`https://gnoseek.vercel.app/start/search/${slugify(parsedSummaryData.title)}`}
          />
        </div>
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
