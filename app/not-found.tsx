import Image from "next/image";

/**
 * Custom 404 Not Found page component
 * Displays a full-screen image for the 404 error page
 * @returns {JSX.Element} The rendered 404 page component
 */
export default function NotFoundPage(): JSX.Element {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-[calc(100vh-132px)] bg-pine-cone-100 shadow-pine-cone-400 shadow-sm md:h-[calc(100vh-2rem)] rounded-xl">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
        src="/images/hero_light.jpg"
        alt="Page 404"
        width={1280}
        height={1280}
      />
      <div className="flex flex-col justify-center items-center gap-4 z-[1]">
        <h1 className="font-sans text-4xl tracking-wide font-bold lg:text-6xl">
          404
        </h1>
        <h2 className="font-sans text-2xl tracking-wide lg:text-4xl">
          Page not found
        </h2>
      </div>
    </div>
  );
}
