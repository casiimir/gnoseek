"use client";
import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { api } from "@/convex/_generated/api";

interface ComponentLoaderProps {
  name: string;
}

/**
 * ComponentLoader displays a loading state with a random fact
 * @param {ComponentLoaderProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  name,
}: ComponentLoaderProps): JSX.Element => {
  const { language: lang } = useLanguage();
  const randomFactData = useAction(api.ai.fetchRandomFact);
  const [randomFact, setRandomFact] = useState<string>("");

  useEffect(() => {
    const fetchRandomFact = async () => {
      const data = await randomFactData({ lang });
      setRandomFact(data);
    };

    fetchRandomFact();
  }, [lang, randomFactData]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4 h-full animate-pulse">
      <em className="text-pine-cone-700 text-xl font-serif text-center">
        {randomFact}
      </em>
      <div>
        <progress
          className="progress w-56 bg-pine-cone-400"
          max="100"
        ></progress>
        <p className="text-md text-pine-cone-500 text-center">
          Gnoseeking {name}...
        </p>
      </div>
    </div>
  );
};

export default ComponentLoader;
