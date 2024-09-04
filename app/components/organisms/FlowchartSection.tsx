"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/app/contexts/LanguageContext";

import { slugify } from "@/app/utils";
import PreSection from "@/app/components/atoms/PreSection";
import { FlowchartData } from "@/types/components/main";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface FlowchartSectionProps {
  flowchartArgument: string;
}

/**
 * FlowchartSection component
 *
 * This component renders a flowchart section based on the provided argument.
 * It fetches flowchart data from an API and displays it in a structured format.
 *
 * @param {FlowchartSectionProps} props - The component props
 * @returns {JSX.Element} The rendered FlowchartSection component
 */
const FlowchartSection = ({
  flowchartArgument,
}: FlowchartSectionProps): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { language: lang } = useLanguage();
  const [flowchartData, setFlowchartData] = useState<FlowchartData>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlowchart = useAction(api.ai.fetchFlowchart);

  /**
   * Fetches flowchart data from the API
   */
  const onGetFlowchart = async () => {
    setIsLoading(true);
    await fetchFlowchart({ text: encodeURI(flowchartArgument), lang }).then(
      (data) => {
        setFlowchartData(JSON.parse(data));
        setIsLoading(false);
      }
    );
  };

  /**
   * Handles navigation when a step section is clicked
   *
   * @param {string} section - The selected section
   */
  const onHandleStepSection = (section: string) => {
    let parsedSectionName;

    // Extract the section name
    if (section.includes(": ")) {
      parsedSectionName = section.split(": ")[1];
    } else if (section.includes(". ")) {
      parsedSectionName = section.split(". ")[1];
    } else {
      parsedSectionName = section;
    }

    // Determine the new route
    const newRoute = pathname.includes("~")
      ? `/start/search/${pathname.match(/\/start\/search\/([^~]+)/)?.[1] || ""}~${slugify(parsedSectionName)}`
      : `/start/search/${flowchartArgument}~${slugify(parsedSectionName)}`;

    router.push(newRoute);
  };

  return flowchartData ? (
    <div className="flex flex-col mx-auto my-[60px] py-4 bg-pine-cone-50 font-serif rounded-xl md:mx-[5rem] md:p-[16px] md:px-[56px] lg:px-[72px]">
      {flowchartData?.steps?.map(({ step, description, example }, index) => (
        <div className="relative mt-[24px] pl-[16px] text-[16px]" key={index}>
          <button
            className="p-2 text-pine-cone-800 font-bold font-sans hover:bg-asparagus-600 hover:text-white"
            onClick={() => onHandleStepSection(step)}
          >
            {step}
          </button>
          <p className="mt-2 text-pine-cone-800">{description}</p>
          {example.length > 0 && (
            <span className="flex items-start gap-2 mt-[8px] text-pine-cone-400 border-l-2 border-pine-cone-300 pl-4">
              <pre className="text-sm overflow-x-auto">{example}</pre>
            </span>
          )}
          <div className="absolute top-[12px] left-[-27px] h-[12px] w-[12px] bg-asparagus-600 rounded-full hidden md:block" />
          <div className="absolute top-[-1px] left-[-40px] h-[38px] w-[38px] border-2 border-dotted border-asparagus-300 rounded-full hidden md:block" />
        </div>
      ))}
    </div>
  ) : (
    <PreSection
      name="Flowchart"
      isLoading={isLoading}
      onHandleClick={onGetFlowchart}
    />
  );
};

export default FlowchartSection;
