import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";
import { currentUser } from "@clerk/nextjs/server";

import { slugify, unSlugify } from "@/app/utils/index";
import { SectionsData } from "@/types/components/main";

// Revalidate the page every 0 seconds. This is useful for static pages that need to be updated frequently.
// Caching is disabled. Useful in combination with <a> tags.
export const revalidate = 0;

interface TopicPageProps {
  params: { topic: string };
}

/**
 * TopicPage component - Renders a page for a specific topic or the user's library
 *
 * This component fetches and displays sections for a given topic or the user's library.
 * It handles user authentication, redirects, and dynamically renders content based on the topic.
 *
 * @param {TopicPageProps} props - The props for the TopicPage component
 * @param {Object} props.params - The parameters passed to the page
 * @param {string} props.params.topic - The topic name or 'library'
 * @returns {Promise<JSX.Element>} The rendered TopicPage component
 */
export default async function TopicPage({
  params,
}: TopicPageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const { topic } = params;

  // Get the user's language preference from cookies, defaulting to 'en'
  const lang = cookieStore.get("lang")?.value || "en";
  const client = convexClient();
  const loggedUser = await currentUser();

  if (topic === "library" && !loggedUser) {
    redirect("/");
  }

  let userData;
  if (loggedUser) {
    userData = await client.query(api.userData.getOne, {
      id: loggedUser.id,
    });
  }

  // Determine sections based on whether it's the library or a topic
  let sections;
  if (topic === "library") {
    sections = userData?.library || [];
  } else {
    const sectionsData = await client.action(api.ai.fetchSections, {
      text: topic,
      lang,
    });
    const { sections: parsedSections }: SectionsData = JSON.parse(sectionsData);
    sections = parsedSections;
  }

  return (
    <div className="flex flex-col gap-12 p-8 w-full bg-pine-cone-100 rounded-2xl">
      <header className="flex justify-between w-full">
        <h1 className="font-sans text-3xl tracking-wide lg:w-5/6 sm:text-5xl">
          {topic === "library" ? "Library" : "Sections"}
        </h1>
        {topic !== "library" && (
          <Link
            href={`/start/${topic}`}
            className="btn bg-asparagus-300 hover:bg-white"
          >
            <Image
              src="/icons/refresh.svg"
              alt="Refresh icon"
              width={40}
              height={40}
            />
          </Link>
        )}
      </header>
      <ul className="flex flex-col gap-4">
        {sections?.map((sectionData, index) => {
          const isLibrary = topic === "library";
          const sectionTitle = isLibrary
            ? sectionData.title
            : sectionData.sectionName;
          const sectionName = isLibrary
            ? sectionData.sectionName
            : sectionData.title;
          const linkHref = `/start/${topic}/${slugify(sectionName)}`;

          return (
            <li key={index}>
              <Link
                className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm shadow-pine-cone-300 hover:bg-asparagus-200 hover:shadow-md"
                href={linkHref}
                rel="preload"
                prefetch={false}
              >
                <pre className="flex justify-center items-center w-10 text-pine-cone-100 text-3xl text-center">
                  {(index + 1).toString().padStart(2, "0")}
                </pre>
                <div>
                  <p className="text-pine-cone-400 text-sm">
                    {unSlugify(sectionTitle)}
                  </p>
                  <p className="font-bold text-pine-cone-700">
                    {unSlugify(sectionName)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
