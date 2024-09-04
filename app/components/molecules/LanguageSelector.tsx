"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { languageOptions } from "@/app/utils";

/**
 * LanguageSelector component allows users to change the application language
 * @returns {JSX.Element} A select element for language selection
 */
export default function LanguageSelector(): JSX.Element {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  /**
   * Handles language change
   * @param {string} newLang - The new language code
   */
  const handleLanguageChange = (newLang: string): void => {
    setLanguage(newLang);
    router.refresh();
  };

  return (
    <select
      className="select w-full bg-pine-cone-100"
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      aria-label="Select language"
    >
      {languageOptions?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
