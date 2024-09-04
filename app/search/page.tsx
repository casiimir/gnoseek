import Image from "next/image";
import SearchInput from "@/app/components/molecules/SearchInput";

/**
 * Search component that displays a search page with a background image and search input
 * @returns {Promise<JSX.Element>} The rendered Search component
 */
export default async function Search(): Promise<JSX.Element> {
  return (
    <div className="relative flex flex-col gap-12 p-8 w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-2em)]">
      <Image
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        src={"/images/search_light.jpg"}
        alt="hero"
        width={1280}
        height={1280}
      />
      <h1 className="font-sans text-3xl tracking-wide lg:w-5/6 sm:text-5xl z-[1]">
        Search
      </h1>
      <SearchInput />
    </div>
  );
}
