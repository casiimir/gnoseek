"use client";
import ComponentLoader from "@/app/components/molecules/ComponentLoader";

/**
 * Loading component - Renders a loading skeleton with a ComponentLoader
 *
 * This component is used to display a loading state while the main content
 * of the page is being fetched or rendered. It shows a full-screen skeleton
 * with a centered ComponentLoader.
 *
 * @returns {JSX.Element} The rendered Loading component
 */
export default function Loading(): JSX.Element {
  return (
    <div className="skeleton flex flex-col justify-center items-center w-full h-[calc(100vh-10rem)] bg-pine-cone-100 md:h-[calc(100vh-2rem)]">
      <ComponentLoader name="" />
    </div>
  );
}
