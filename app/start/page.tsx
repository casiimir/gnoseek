import { cookies } from "next/headers";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";

import { Topic } from "@/types/components/main";
import TopicBubble from "../components/atoms/TopicBubble";

interface StartPageProps {}

/**
 * StartPage component - Renders the main topics page
 *
 * This component fetches and displays a list of topics based on the user's language preference.
 * It uses the Convex client to query topics and renders them as TopicBubble components.
 *
 * @returns {JSX.Element} The rendered StartPage component
 */
export default async function StartPage({}: StartPageProps): Promise<JSX.Element> {
  const client = convexClient();

  // Get user's language preference from cookies, default to 'en' if not set
  const language = cookies().get("lang")?.value || "en";

  const topicsData: Topic[] = await client.query(api.topics.get);

  const topics: string[] = topicsData.map(
    (topic: any) => topic.translations[language]
  );

  return (
    <div className="flex flex-col gap-12 p-8 bg-pine-cone-100 rounded-2xl overflow-y-scroll no-scrollbar md:h-[calc(100vh-2rem)] md:show-scrollbar">
      <header>
        <h1 className="font-sans text-3xl tracking-wide lg:w-5/6 sm:text-5xl">
          Topics
        </h1>
      </header>
      <main>
        <ul className="flex justify-center items-center flex-wrap gap-2">
          {topics?.map((topic: string) => (
            <TopicBubble topic={topic} key={topic} />
          ))}
        </ul>
      </main>
    </div>
  );
}
