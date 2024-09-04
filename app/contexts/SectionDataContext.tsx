"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { SectionData } from "@/types/components/main";

/**
 * Represents the shape of the SectionDataContext
 * @interface SectionDataContextType
 * @property {SectionData} sectionSelectedData - The current section data
 * @property {React.Dispatch<React.SetStateAction<SectionData>>} setSectionSelectedData - Function to update section data
 */
interface SectionDataContextType {
  sectionSelectedData: SectionData;
  setSectionSelectedData: React.Dispatch<React.SetStateAction<SectionData>>;
}

// Create a context for section data
const SectionDataContext = createContext<SectionDataContextType | undefined>(
  undefined
);

/**
 * Provider component for SectionDataContext
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components
 * @returns {JSX.Element} The provider component
 */
export const SectionDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state for section data
  const [sectionSelectedData, setSectionSelectedData] = useState<SectionData>(
    {}
  );

  return (
    <SectionDataContext.Provider
      value={{ sectionSelectedData, setSectionSelectedData }}
    >
      {children}
    </SectionDataContext.Provider>
  );
};

/**
 * Custom hook to use the SectionDataContext
 * @returns {SectionDataContextType} The section data context
 * @throws {Error} If used outside of SectionDataProvider
 */
export const useSectionData = () => {
  const context = useContext(SectionDataContext);
  if (context === undefined) {
    throw new Error("useSectionData must be used within a SectionDataProvider");
  }
  return context;
};
