"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

import { slugify, generateBackgroundColor } from "@/app/utils";
import { useLanguage } from "@/app/contexts/LanguageContext";
import PreSection from "@/app/components/atoms/PreSection";
import ComponentLoader from "@/app/components/molecules/ComponentLoader";
import { Section } from "@/types/components/main";

/**
 * Props for the SuggestSections component
 * @typedef {Object} SuggestSectionsProps
 * @property {string} sectionName - The name of the section to suggest related sections for
 */

/**
 * Component that suggests related sections based on a given section name
 * @param {SuggestSectionsProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
interface SuggestSectionsProps {
  sectionName: string;
}

const SuggestSections = ({ sectionName }: SuggestSectionsProps) => {
  const { language: lang } = useLanguage();
  const [suggestSectionsData, setSuggestSectionsData] = useState<Section[]>();
  const [isLoading, setIsLoading] = useState(false);

  const suggestData = useAction(api.ai.fetchSuggestedSections);

  /**
   * Fetches suggested sections data
   */
  const fetchSuggestData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await suggestData({ baseTopic: sectionName, num: 4, lang });
      setSuggestSectionsData(JSON.parse(data).sections);
    } catch (error) {
      console.error("Error fetching suggested sections:", error);
      // TODO: Handle error state
    } finally {
      // Add a minimum loading time of 1 second for better UX
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [suggestData, sectionName, lang]);

  useEffect(() => {
    fetchSuggestData();
  }, [lang, fetchSuggestData]);

  if (!sectionName || !suggestSectionsData) {
    return (
      <PreSection
        name="Suggestions"
        isLoading={isLoading}
        onHandleClick={fetchSuggestData}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {isLoading ? (
        <ComponentLoader name="" />
      ) : (
        <>
          <h3 className="mb-1 font-semibold text-sm">
            Latest reading suggestions
          </h3>
          {suggestSectionsData?.map(({ title, sectionName }: Section) => (
            <Link
              href={`/start/search/${slugify(title)}`}
              className={`flex flex-col gap-5 p-8 w-full h-38 bg-white rounded-2xl shadow-gray-300 shadow-sm ${generateBackgroundColor()}`}
              key={sectionName}
            >
              <div className="flex justify-between font-bold text-xs">
                <h4>{sectionName}</h4>
              </div>
              <h2 className="text-xl">{title}</h2>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default SuggestSections;
