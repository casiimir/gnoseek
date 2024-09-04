"use client";
import Image from "next/image";
import Link from "next/link";

interface LibraryStatusProps {
  numElementsRead: number;
}

/**
 * LibraryStatus component displays the current status of the user's library
 * @param {LibraryStatusProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const LibraryStatus: React.FC<LibraryStatusProps> = ({
  numElementsRead,
}: LibraryStatusProps): JSX.Element => {
  return (
    <Link
      href="/start/library"
      className="flex justify-start items-center gap-4 p-3 w-full border border-gray-300 bg-white rounded-xl font-semibold text-sm shadow-inner cursor-pointer select-none"
    >
      <Image
        src="/icons/library.svg"
        alt="Library icon"
        width={30}
        height={30}
        priority
      />
      <p>Elements in library: {numElementsRead}</p>
    </Link>
  );
};

export default LibraryStatus;
