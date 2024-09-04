"use client";
import { CSSProperties, useState } from "react";
import { useAction } from "convex/react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { api } from "@/convex/_generated/api";

import { useLanguage } from "@/app/contexts/LanguageContext";
import PreSection from "@/app/components/atoms/PreSection";
import { Card } from "@/types/components/main";

/**
 * Styles for the front of the flashcard
 */
const frontCardStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20px",
  color: "#655953",
  fontSize: "1.3rem",
  fontWeight: "bold",
  textAlign: "center",
  userSelect: "none",
  border: "2px solid #C1BDBA",
  margin: "0",
};

/**
 * Styles for the back of the flashcard
 */
const backCardStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20px",
  color: "#3D3532",
  fontSize: "1.1rem",
  textAlign: "center",
  userSelect: "none",
  border: "2px solid #C1BDBA",
};

/**
 * Props for the FlashcardsSection component
 */
interface FlashcardsSectionProps {
  section: string;
}

/**
 * FlashcardsSection component displays flashcards for a given section
 * @param {FlashcardsSectionProps} props - The component props
 * @returns {JSX.Element} The rendered FlashcardsSection component
 */
const FlashcardsSection = ({
  section,
}: FlashcardsSectionProps): JSX.Element => {
  const { language: lang } = useLanguage();
  const [flashcardsData, setFlashcardsData] = useState<Card[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFlashcards = useAction(api.ai.fetchFlashcards);

  /**
   * Fetches flashcards data from the API
   */
  const onGetFlashcards = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await fetchFlashcards({ text: section, lang });
      setFlashcardsData(JSON.parse(data).flashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {flashcardsData ? (
        <div className="flex justify-center items-center pt-12 w-full rounded-xl">
          <div className="flex justify-center items-center w-[calc(100%-7rem)] overflow-hidden">
            <FlashcardArray
              cards={flashcardsData}
              frontContentStyle={frontCardStyle}
              backContentStyle={backCardStyle}
            />
          </div>
        </div>
      ) : (
        <PreSection
          name="Flashcards"
          isLoading={isLoading}
          onHandleClick={onGetFlashcards}
        />
      )}
    </div>
  );
};

export default FlashcardsSection;
