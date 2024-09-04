"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

// Create a context for language management
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/**
 * LanguageProvider component to manage language state and provide it to children
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // State to hold the current language
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Fetch the initial language from the API when component mounts
    fetch("/api/setLanguage")
      .then((response) => response.json())
      .then((data) => setLanguage(data.lang));
  }, []);

  /**
   * Function to update language both in state and on the server
   * @param {string} lang - The new language to set
   */
  const updateLanguage = (lang: string) => {
    setLanguage(lang);
    // Update the language on the server
    fetch("/api/setLanguage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang }),
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to use the language context
 * @returns {LanguageContextType} The language context value
 * @throws {Error} If used outside of LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
