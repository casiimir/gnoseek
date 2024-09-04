"use client";
import { useEffect } from "react";
import { useSectionData } from "@/app/contexts/SectionDataContext";
import { SummaryData } from "@/types/components/main";
/**
 * Props for the SummarySection component
 * @interface SummarySectionProps
 * @property {SummaryData} summaryData - The data to be displayed in the summary section
 */
interface SummarySectionProps {
  summaryData: SummaryData;
}

/**
 * SummarySection component
 * Displays a summary with title, subtitle, and paragraphs
 * @param {SummarySectionProps} props - The component props
 * @returns {JSX.Element} The rendered SummarySection component
 */

const SummarySection = ({ summaryData }: SummarySectionProps): JSX.Element => {
  const { title, subtitle, paragraphs } = summaryData;
  const { setSectionSelectedData } = useSectionData();

  useEffect(() => {
    setSectionSelectedData((prevData) => ({
      ...prevData,
      summaryData: summaryData,
    }));
  }, [summaryData, setSectionSelectedData]);

  return (
    <div className="flex flex-col gap-4 lg:mx-8 w-full lg:w-3/5">
      <header className="mb-8">
        <h1 className="mb-2 font-bold text-3xl md:mb-4 md:text-4xl">{title}</h1>
        <h4 className="px-4 text-xl border-l-pine-cone-400 border-l-4 md:px-8 md:text-2xl">
          {subtitle}
        </h4>
      </header>

      {paragraphs?.map((paragraph, index) => (
        <div className="text-lg md:px-8" key={index}>
          {index > 0 && index < paragraphs.length - 1 && (
            <div className="divider mx-auto my-4"></div>
          )}
          <p dangerouslySetInnerHTML={{ __html: paragraph }} />
        </div>
      ))}
    </div>
  );
};

export default SummarySection;
