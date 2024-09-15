import { Metadata } from "next";
import { SummaryData } from "@/types/components/main";

/**
 * Metadata for the About page
 */
export const metadata: Metadata = {
  title: "About Gnoseek - Your Comprehensive Learning Platform",
  description:
    "Learn about Gnoseek, our mission, and how we're revolutionizing online learning with our comprehensive and engaging platform.",
  keywords:
    "gnoseek, learning, platform, comprehensive, engaging, online learning",
};

/**
 * Displays information about the platform, its features, and learning experience
 * @returns {JSX.Element} The rendered About page
 */
export default function About() {
  // Array of summary data objects for the About page
  const summariesData: SummaryData[] = [
    {
      title: "Welcome to Gnoseek",
      subtitle: "Your Comprehensive Learning Platform 🌲",
      paragraphs: [
        `<strong class="border-b-2 border-pine-cone-500">Gnoseek</strong> is designed to offer a comprehensive learning experience, making information <strong>quickly accessible</strong>, <strong>engaging</strong>, and <strong>educational</strong>. Our platform serves as a versatile tool for fast, effective, and engaging learning across various subjects.`,
        `Created by <a href="https://github.com/casiimir" target="_blank" rel="noopener noreferrer"><strong class="text-asparagus-500">Cas</strong></a>, a software engineer with a passion for education and technology.`,
      ],
    },
    {
      title: "Platform Overview",
      subtitle: "Navigating Gnoseek 🌐",
      paragraphs: [
        `<strong class="flex gap-2 items-center"><img class="w-5" src="/icons/logo.svg" alt="About" />ABOUT</strong>Learn about our platform and mission.`,
        `<strong class="flex gap-2 items-center"><img class="w-5" src="/icons/home.svg" alt="Homepage" />HOMEPAGE</strong> Access the main sections of Gnoseek.`,
        `<strong class="flex gap-2 items-center"><img class="w-5" src="/icons/explore.svg" alt="Explore" />EXPLORE</strong>Discover a diverse range of topics.`,
        `<strong class="flex gap-2 items-center"><img class="w-5" src="/icons/dashboard.svg" alt="Dashboard" />DASHBOARD</strong>Personalized area for logged-in users, including saved articles.`,
        `<strong class="flex gap-2 items-center"><img class="w-5" src="/icons/search.svg" alt="Search" />SEARCH</strong>Find information on any topic.`,
      ],
    },
    {
      title: "Topic Pages",
      subtitle: "In-depth Learning Experience 📖",
      paragraphs: [
        `Each topic page on Gnoseek includes:`,
        `- <strong>SUMMARY</strong>: Concise overview of the topic.`,
        `- <strong>FLASHCARDS</strong>: Test your knowledge.`,
        `- <strong>KEYWORDS</strong>: Expandable key concepts.`,
        `- <strong>FLOWCHART</strong>: Interactive visual representation.`,
        `- <strong>STUDYSHEET</strong>: Detailed study sheet. Code examples if programming related.`,
      ],
    },
    {
      title: "Continuous Improvement",
      subtitle: "Empowering Your Learning Journey 🚀",
      paragraphs: [
        `We are committed to enhancing Gnoseek by:`,
        `• Regularly updating content to ensure relevance.`,
        `• Introducing new features like user-specific content customization.`,
        `• Implementing learning statistics.`,
        `• And much more to come!`,
        `<em class="text-pine-cone-300">Thank you for being part of our journey in revolutionizing online learning.</em>`,
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-12 p-8 bg-pine-cone-100 rounded-2xl overflow-y-scroll no-scrollbar md:h-[calc(100vh-2rem)] md:show-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {summariesData?.map(({ title, subtitle, paragraphs }, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <h3 className="text-xl text-gray-600 mb-4">{subtitle}</h3>
            {paragraphs?.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
