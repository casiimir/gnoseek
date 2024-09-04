"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import ComponentLoader from "@/app/components/molecules/ComponentLoader";

/**
 * Props for the HeroSection component.
 * Currently empty, but can be extended in the future if needed.
 */
interface HeroSectionProps {}

/**
 * HeroSection component displays a hero section with a random fact and a call-to-action button.
 * It fetches a random fact based on the current language and displays a loader while fetching.
 *
 * @component
 */
const HeroSection = ({}: HeroSectionProps) => {
  const [randomFact, setRandomFact] = useState<string>("");
  const { language: lang } = useLanguage();
  const fetchRandomFact = useAction(api.ai.fetchRandomFact);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchRandomFact({ lang }).then((fact) => {
      setRandomFact(fact);
      setIsLoading(false);
    });
  }, [lang, fetchRandomFact]);

  return (
    <section
      id="hero"
      className="relative flex flex-col gap-8 p-8 w-full min-h-60 select-none md:h-[340px]"
    >
      {isLoading ? (
        <ComponentLoader name="" />
      ) : (
        <div className="flex flex-col justify-center gap-8 h-full">
          <header className="flex flex-col gap-2 z-10">
            <h1 className="flex items-center font-sans text-3xl tracking-wide font-bold text-pine-cone-700 lg:w-5/6 sm:text-4xl">
              Welcome to Gnoseek
            </h1>
            <h2 className="flex items-center font-serif text-lg tracking-wide text-pine-cone-500 italic lg:w-5/6 sm:text-2xl">
              {randomFact}
            </h2>
          </header>
          <Link className="z-10 w-full sm:w-40" href="/start">
            <button className="btn w-full bg-asparagus-400 border-asparagus-400 text-pine-cone-50 sm:w-40">
              Start
            </button>
          </Link>

          <div className="absolute top-0 left-0 w-full h-full bg-asparagus-50 opacity-10 z-[1] rounded-2xl"></div>
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            src={"/images/hero_light.jpg"}
            alt="hero"
            width={600}
            height={340}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
