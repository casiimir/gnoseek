import Link from "next/link";
import { slugify, unSlugify } from "@/app/utils";
import { Section } from "@/types/components/main";

interface LatestReadTopicProps {
  suggestSectionsData: Section;
}

/**
 * LatestReadTopic component displays the last read topic
 * @param {LatestReadTopicProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const LatestReadTopic: React.FC<LatestReadTopicProps> = ({
  suggestSectionsData,
}: LatestReadTopicProps): JSX.Element => {
  const { sectionName } = suggestSectionsData;

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold text-sm">Last reading</h3>
      <Link
        href={`/start/search/${slugify(sectionName)}`}
        className="flex flex-col gap-8 p-8 w-full h-38 bg-pine-cone-600 text-white rounded-2xl"
        key={sectionName}
      >
        <h2 className="text-xl">{unSlugify(sectionName)}</h2>
      </Link>
    </div>
  );
};

export default LatestReadTopic;
