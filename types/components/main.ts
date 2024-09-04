import { Id } from "@/convex/_generated/dataModel";

/**
 * Represents the structure of summary data.
 * @interface SummaryData
 */
export interface SummaryData {
  /** The main title of the summary */
  title: string;
  /** The subtitle or secondary heading of the summary */
  subtitle: string;
  /** An array of paragraph strings that make up the summary content */
  paragraphs: string[];
}

/**
 * Represents a section of content.
 * @interface Section
 */
export interface Section {
  /** The title of the section */
  title: string;
  /** The name or identifier of the section */
  sectionName: string;
}

/**
 * Represents the structure of content items.
 * @interface Content
 */
export interface Content {
  /** The title of the content item */
  title: string;
  /** A description of the content */
  description: string;
  /** An array of example strings related to the content */
  examples: string[];
}

/**
 * Represents the structure of flowchart data.
 * @interface FlowchartData
 */
export interface FlowchartData {
  /** The title of the flowchart */
  title: string;
  /** An array of Step objects that make up the flowchart */
  steps: Step[];
}

/**
 * Represents a step in a flowchart.
 * @interface Step
 */
export interface Step {
  /** The step number or identifier */
  step: string;
  /** A description of the step */
  description: string;
  /** An example related to the step */
  example: string;
}

/**
 * Represents the structure of study sheet data.
 * @interface StudySheetData
 */
export interface StudySheetData {
  /** The title of the study sheet */
  title: string;
  /** An array of StudySheetSection objects that make up the study sheet */
  sections: StudySheetSection[];
}

/**
 * Represents a section within a study sheet.
 * @interface StudySheetSection
 */
export interface StudySheetSection {
  /** The title of the study sheet section */
  title: string;
  /** An array of Content objects that make up the section */
  content: Content[];
}

/**
 * Represents the structure of content items with programming examples.
 * @interface Content
 */
export interface Content {
  /** The title of the content item */
  title: string;
  /** A description of the content */
  description: string;
  /** An example related to the content */
  example: string;
  /** The programming language used in the example */
  programmingLanguage: string;
}

/**
 * Represents the structure of keywords data.
 * @interface KeywordsData
 */
export interface KeywordsData {
  /** An array of Keyword objects */
  keywords: Keyword[];
}

/**
 * Represents a keyword and its description.
 * @interface Keyword
 */
export interface Keyword {
  /** The title or term of the keyword */
  title: string;
  /** A description of the keyword */
  description: string;
}

/**
 * Represents the structure of flashcards data.
 * @interface FlashcardsData
 */
export interface FlashcardsData {
  /** An array of Flashcard objects */
  flashcards: Flashcard[];
}

/**
 * Represents a single flashcard.
 * @interface Flashcard
 */
export interface Flashcard {
  /** The unique identifier of the flashcard */
  id: number;
  /** The HTML content for the front of the flashcard */
  frontHTML: string;
  /** The HTML content for the back of the flashcard */
  backHTML: string;
}

/**
 * Represents a flashcard with front and back content.
 * @interface Card
 */
export interface Card {
  /** The unique identifier of the card */
  id: number;
  /** The content for the front of the card, can be a string or JSX Element */
  frontHTML: string | JSX.Element;
  /** The content for the back of the card, can be a string or JSX Element */
  backHTML: string | JSX.Element;
}

/**
 * Represents the structure of a books list, categorized by skill level.
 * @interface BooksListData
 */
export interface BooksListData {
  /** An array of Book objects for beginners */
  beginners: Book[];
  /** An array of Book objects for intermediate level */
  intermediate: Book[];
  /** An array of Book objects for advanced level */
  advanced: Book[];
  /** Allows for additional categories of books */
  [key: string]: Book[];
}

/**
 * Represents a book in the books list.
 * @interface Book
 */
export interface Book {
  /** The title of the book */
  title: string;
  /** The ISBN (International Standard Book Number) of the book */
  isbn: string;
  /** The skill level or category of the book */
  skill: string;
}

/**
 * Represents the structure of contexts data.
 * @interface ContextsData
 */
export interface ContextsData {
  /** An Argument object containing contexts of use */
  argument: Argument;
}

/**
 * Represents an argument with contexts of use.
 * @interface Argument
 */
export interface Argument {
  /** An array of Context objects */
  contexts_of_use: Context[];
}

/**
 * Represents a context and its description.
 * @interface Context
 */
export interface Context {
  /** The context or situation */
  context: string;
  /** A description of the context */
  description: string;
}

/**
 * Represents the structure of glossary data.
 * @interface GlossaryData
 */
export interface GlossaryData {
  /** An array of GlossaryItem objects */
  glossary: GlossaryItem[];
}

/**
 * Represents a glossary item with a term and its definition.
 * @interface GlossaryItem
 */
export interface GlossaryItem {
  /** The term or word being defined */
  term: string;
  /** The definition of the term */
  definition: string;
}

/**
 * Represents the structure of sections data.
 * @interface SectionsData
 */
export interface SectionsData {
  /** An array of Section objects */
  sections: Section[];
}

/**
 * Represents a topic with translations.
 * @interface Topic
 */
export interface Topic {
  /** The unique identifier of the topic */
  _id: string;
  /** The creation timestamp of the topic */
  _creationTime: number;
  /** The main text of the topic */
  text: string;
  /** An object containing translations of the topic */
  translations: Translations;
}

export interface SectionData {
  summaryData?: SummaryData;
  flashCardsData?: FlashcardsData;
  keywordsData?: KeywordsData;
  flowchartData?: FlowchartData;
  studySheetData?: StudySheetData;
}

/**
 * Represents translations of a topic in various languages.
 * @interface Translations
 */
export interface Translations {
  ar: string;
  bn: string;
  ca: string;
  cy: string;
  de: string;
  en: string;
  eo: string;
  es: string;
  eu: string;
  fr: string;
  gl: string;
  hi: string;
  id: string;
  it: string;
  ja: string;
  ko: string;
  la: string;
  ms: string;
  pa: string;
  pt: string;
  ru: string;
  ta: string;
  te: string;
  th: string;
  tr: string;
  ur: string;
  vi: string;
  zh: string;
}

/**
 * Represents a user's basic information.
 * @interface User
 */
export interface User {
  /** The unique identifier of the user */
  userId: Id<"userData">;
  /** The user's first name */
  firstName: string;
  /** The user's second name or surname */
  secondName: string;
  /** The URL of the user's profile image */
  imgUrl: string;
}
