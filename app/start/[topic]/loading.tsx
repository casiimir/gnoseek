"use client";
import ComponentLoader from "@/app/components/molecules/ComponentLoader";

/**
 * Loading component for the start/[topic] page.
 * Displays a loading skeleton with a ComponentLoader.
 * @returns {JSX.Element} The Loading component
 */
export default function Loading(): JSX.Element {
  return (
    <div className="skeleton flex flex-col justify-center items-center w-full h-[calc(100vh-10rem)] bg-pine-cone-100  md:h-[calc(100vh-2rem)]">
      <ComponentLoader name="" />
    </div>
  );
}
