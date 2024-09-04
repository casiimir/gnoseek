"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { useSectionData } from "@/app/contexts/SectionDataContext";
import KeywordsList from "@/app/components/molecules/KeywordsList";
import PreSection from "@/app/components/atoms/PreSection";
import { KeywordsData } from "@/types/components/main";

/**
 * Props for the KeywordsSection component
 * @interface KeywordsSectionProps
 * @property {string} section - The text section to extract keywords from
 */
interface KeywordsSectionProps {
  section: string;
}

/**
 * KeywordsSection component
 * Displays either a list of keywords or a button to fetch keywords
 * @param {KeywordsSectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const KeywordsSection = ({ section }: KeywordsSectionProps): JSX.Element => {
  const { language: lang } = useLanguage();
  const { setSectionSelectedData } = useSectionData();
  const [keywordsData, setKeywordsData] = useState<KeywordsData>();
  const fetchKeywords = useAction(api.ai.fetchKeywords);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the action of fetching keywords
   * Sets loading state, fetches keywords, and updates state with the result
   */
  const onGetKeywords = async () => {
    setIsLoading(true);
    try {
      const data = await fetchKeywords({ text: encodeURI(section), lang });

      setKeywordsData(JSON.parse(data));
      setSectionSelectedData((prevData) => ({
        ...prevData,
        keywordsData: JSON.parse(data),
      }));
    } catch (error) {
      console.error("Error fetching keywords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        keywordsData
          ? "flex justify-center items-center flex-wrap gap-4 py-4 w-full overflow-hidden"
          : "w-full"
      }
    >
      {keywordsData ? (
        <KeywordsList keywordsData={keywordsData} />
      ) : (
        <PreSection
          name="Keywords"
          isLoading={isLoading}
          onHandleClick={onGetKeywords}
        />
      )}
    </div>
  );
};

export default KeywordsSection;
