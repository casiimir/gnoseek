"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import PreSection from "@/app/components/atoms/PreSection";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { StudySheetData } from "@/types/components/main";

/**
 * Props for the StudySheetSection component
 * @typedef {Object} StudySheetSectionProps
 * @property {string} studySheetArgument - The argument used to fetch the study sheet data
 */

/**
 * StudySheetSection component
 * Displays a study sheet with sections and content, or a pre-section if data is not yet loaded
 * @param {StudySheetSectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
interface StudySheetSectionProps {
  studySheetArgument: string;
}

const StudySheetSection = ({ studySheetArgument }: StudySheetSectionProps) => {
  const { language: lang } = useLanguage();
  const [studySheetData, setStudySheetData] = useState<StudySheetData>();
  const fetchStudySheet = useAction(api.ai.fetchStudySheet);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches the study sheet data
   * @async
   */
  const onGetStudySheet = async () => {
    setIsLoading(true);

    try {
      const data = await fetchStudySheet({
        text: encodeURI(studySheetArgument),
        lang,
      });

      setStudySheetData(JSON.parse(data));
    } catch (error) {
      console.error("Error fetching study sheet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return studySheetData ? (
    <div className="flex flex-col mx-auto my-[60px] py-4 bg-pine-cone-50 font-serif rounded-xl md:flex-row-reverse md:gap-4 md:mx-[5rem] md:p-[16px] md:px-[56px] lg:px-[72px]">
      <div className="carousel w-full">
        {studySheetData?.sections?.map((section, sectionIndex) => (
          <div
            id={`item${sectionIndex + 1}`}
            className="carousel-item flex flex-col w-[calc(100%-3rem)] mb-4 p-4 rounded-xl lg:p-6"
            key={sectionIndex}
          >
            <h2 className="mb-4 font-semibold font-sans text-3xl">
              {section.title}
            </h2>
            {section?.content?.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-4">
                <h3 className="mb-2 font-medium font-sans text-xl">
                  {item.title}
                </h3>
                <p className="mb-2">{item.description}</p>
                <div className="mb-4 text-pine-cone-400 italic">
                  {item.programmingLanguage !== "text" &&
                  item.example.length > 0 ? (
                    <SyntaxHighlighter
                      language={item.programmingLanguage}
                      style={atomOneDark}
                    >
                      {item.example}
                    </SyntaxHighlighter>
                  ) : (
                    item.example
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2 md:flex-col md:justify-start md:gap-4 md:w-4 md:mt-6">
        {studySheetData?.sections?.map((_, sectionIndex) => (
          <a
            className="btn btn-sm bg-asparagus-300 text-asparagus-50"
            href={`#item${sectionIndex + 1}`}
            key={sectionIndex}
          >
            {sectionIndex + 1}
          </a>
        ))}
      </div>
    </div>
  ) : (
    <PreSection
      name="Studysheet"
      isLoading={isLoading}
      onHandleClick={onGetStudySheet}
    />
  );
};

export default StudySheetSection;
