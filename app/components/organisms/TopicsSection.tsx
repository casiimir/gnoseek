"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { convexClient } from "@/app/utils/convex";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Topic } from "@/types/components/main";

interface TopicSectionProps {}

/**
 * TopicsSection component displays a horizontally scrollable list of topics.
 * It fetches topics from the API and allows navigation through left and right scroll buttons.
 *
 * @component
 */
const TopicsSection: React.FC<TopicSectionProps> = () => {
  // State to store the fetched topics
  const [topicsData, setTopicsData] = useState<string[]>([]);
  // Get the current language from the LanguageContext
  const { language } = useLanguage();

  const typedLanguage = language as keyof Topic["translations"];

  useEffect(() => {
    /**
     * Fetches topics data from the API and updates the state.
     */
    const fetchData = async () => {
      const client = convexClient();
      const data: Topic[] = await client.query(api.topics.get);
      // Extract topic names in the current language
      const topics: string[] = data?.map(
        (topic: Topic) => topic?.translations[typedLanguage] as string
      );

      setTopicsData(topics);
    };

    fetchData();
  }, [language]);

  /**
   * Scrolls the topics container left or right.
   * @param {('left'|'right')} direction - The direction to scroll
   */
  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    topicsData?.length > 0 && (
      <section className="flex items-center justify-center gap-1 scroll-smooth">
        {/* Left scroll button */}
        <button
          onClick={() => scrollContainer("left")}
          className="hidden md:block"
        >
          <Image
            className="w-32 opacity-20"
            src="/icons/arrow_left.svg"
            alt="Previous"
            width={32}
            height={32}
          />
        </button>
        <div
          id="scrollable-container"
          className="flex gap-2 overflow-auto no-scrollbar"
        >
          {topicsData?.map((text, index) => (
            <Link
              className="cursor-pointer"
              key={index}
              href={`/start/${text}`}
            >
              <button className="btn h-[10px] min-w-32 bg-pine-cone-600 rounded-3xl text-xs text-white">
                {text}
              </button>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scrollContainer("right")}
          className="hidden md:block"
        >
          <Image
            className="w-32 opacity-20"
            src="/icons/arrow_right.svg"
            alt="Previous"
            width={32}
            height={32}
          />
        </button>
      </section>
    )
  );
};

export default TopicsSection;
