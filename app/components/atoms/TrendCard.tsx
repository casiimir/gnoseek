"use client";
import Link from "next/link";
import { slugify, generateBackgroundColor } from "@/app/utils";

interface TrendCardProps {
  sectionName: string;
  title: string;
  time: string;
}

/**
 * TrendCard component displays a card with trending information
 * @param {TrendCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const TrendCard: React.FC<TrendCardProps> = ({ sectionName, title, time }) => (
  <Link
    href={`/start/search/${slugify(title)}`}
    className={`flex flex-col gap-5 grow p-8 w-full h-38 rounded-2xl shadow-pine-cone-200 shadow-sm md:w-[290px] ${generateBackgroundColor()}`}
  >
    <div className="flex justify-between font-bold text-xs">
      <h4 className="w-2/3">{sectionName}</h4>
      <p className="font-normal text-gray-500">{time || ""}</p>
    </div>
    <h2 className="text-xl">{title}</h2>
  </Link>
);

export default TrendCard;
