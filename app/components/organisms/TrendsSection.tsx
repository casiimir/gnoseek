"use client";

import { useState, useEffect, useCallback } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/app/contexts/LanguageContext";

import TrendCard from "@/app/components/atoms/TrendCard";
import ComponentLoader from "@/app/components/molecules/ComponentLoader";
import PreSection from "@/app/components/atoms/PreSection";
import { Section } from "@/types/components/main";

/**
 * Props for the TrendsSection component
 */
interface TrendsSectionProps {
  selectedTrends: Array<{ title: string; time: string }>;
}

/**
 * TrendsSection component displays a section of trend cards based on selected trends
 * @param {TrendsSectionProps} props - The props for the TrendsSection component
 * @returns {JSX.Element} The rendered TrendsSection component
 */
const TrendsSection = ({ selectedTrends }: TrendsSectionProps): JSX.Element => {
  const { language: lang } = useLanguage();
  const [cardSectionsData, setCardSectionsData] = useState<Section[]>();
  const [isLoading, setIsLoading] = useState(true);
  const trendsData = useAction(api.ai.fetchTrendSections);

  /**
   * Fetches trends data from the API and updates the state
   */
  const fetchTrendsData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await trendsData({ list: selectedTrends, lang });
      const parsedData = JSON.parse(data);
      setCardSectionsData(parsedData.sections);
    } catch (error) {
      console.error("Error fetching trends data:", error);
    } finally {
      // Add a minimum loading time of 1 second for better UX
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [selectedTrends, trendsData, lang]);

  // Fetch trends data when language changes or when the component mounts
  useEffect(() => {
    fetchTrendsData();
  }, [lang, fetchTrendsData]);

  // Render PreSection component if data is not available or still loading
  if (!selectedTrends || !cardSectionsData) {
    return (
      <PreSection
        name="Trends"
        isLoading={isLoading}
        onHandleClick={fetchTrendsData}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <ComponentLoader name="" />
      ) : (
        <>
          <h3 className="my-4 p-0 font-semibold text-sm">Trends</h3>
          <div className="flex flex-wrap gap-2">
            {cardSectionsData?.map(
              ({ sectionName, title }: Section, index: number) => (
                <TrendCard
                  key={title}
                  sectionName={sectionName}
                  title={title}
                  time={selectedTrends[index]?.time}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrendsSection;
