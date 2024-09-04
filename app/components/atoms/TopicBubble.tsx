import Link from "next/link";
import { slugify } from "@/app/utils";
import { generateBubbleClass } from "@/app/utils";

/**
 * Props for the TopicBubble component
 * @interface TopicBubbleProps
 * @property {string} topic - The topic text to display
 */
interface TopicBubbleProps {
  topic: string;
}

/**
 * TopicBubble component displays a clickable bubble with a topic
 * @param {TopicBubbleProps} props - The component props
 * @returns {JSX.Element | null} The rendered component or null if no topic
 */
const TopicBubble: React.FC<TopicBubbleProps> = ({
  topic,
}: TopicBubbleProps): JSX.Element | null => {
  if (!topic) return null;

  return (
    <Link href={`/start/${slugify(topic)}`}>
      <li
        className={`flex justify-center items-center ${generateBubbleClass(topic)} shadow-gray-nickel-700 rounded-full text-sm text-center drag-none hover:font-bold`}
        style={{
          animation: `loop 2s linear 0s infinite alternate`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      >
        {topic}
      </li>
    </Link>
  );
};

export default TopicBubble;
