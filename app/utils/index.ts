/**
 * Converts a string to a URL-friendly slug.
 * @param {string} str - The string to be slugified.
 * @returns {string} The slugified string.
 */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

/**
 * Converts a slugified string back to a readable format.
 * @param {string} str - The slugified string to be converted.
 * @returns {string} The unslugified string with the first letter capitalized.
 */
export const unSlugify = (str: string): string => {
  const formattedString = str.replace(/-/g, " "); // Replace hyphens with spaces

  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

/**
 * Parses a string of keywords into an array.
 * @param {string} keywords - The string of keywords to be parsed.
 * @returns {string[]} An array of individual keywords.
 */
export const keywordsListParser = (keywords: string): string[] => {
  return keywords.split("- ").splice(1); // Split by "- " and remove the first empty element
};

/**
 * Extracts the domain name from a given URL.
 * @param {string} url - The URL to extract the domain from.
 * @returns {string} The extracted domain name.
 */
export const extractDomainNameFromURL = (url: string): string => {
  const domain = url.split("/")[2];
  return domain;
};

/**
 * Checks the validity of an image URL by attempting to load it.
 * @param {string} url - The URL of the image to check.
 * @returns {number} The width of the image if valid, 0 otherwise.
 */
export const checkImageValidity = (url: string): number => {
  // Client side only!
  if (typeof window !== "undefined") {
    let image = new Image();
    let width;

    image.src = url;
    width = image.width;

    return image.width;
  }
  return 0;
};

/**
 * Generates CSS classes for the topic bubble based on the text length
 * @param {string} text - The topic text
 * @returns {string} The generated CSS classes
 */
export const generateBubbleClass = (text: string): string => {
  const length = text.length;

  let sizeClass = "";
  let colorClass = "";

  if (length > 10) {
    sizeClass = "w-32 h-32 m-4";
  } else if (length > 5) {
    sizeClass = "w-24 h-24 m-2";
  } else {
    sizeClass = "w-14 h-14 m-1 text-xs";
  }

  colorClass =
    Math.random() < 0.5
      ? "bg-pine-cone-600 text-white font-normal"
      : "bg-asparagus-300 font-normal text-white shadow-inner";

  return `${sizeClass} ${colorClass} text-${length}`;
};

/**
 * Generates a random background color class from a predefined list.
 * @returns {string} A Tailwind CSS class for a background color.
 */
export const generateBackgroundColor = () => {
  const colors = [
    "bg-pine-cone-50",
    "bg-pine-cone-100",
    "bg-pine-cone-200",
    "bg-asparagus-50",
    "bg-asparagus-100",
    "bg-asparagus-200",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * An array of language options with their corresponding codes and labels.
 */
export const languageOptions = [
  { value: "ar", label: "العربية" },
  { value: "bn", label: "বাংলা" },
  { value: "ca", label: "Català" },
  { value: "cy", label: "Cymraeg" },
  { value: "de", label: "Deutsch" },
  { value: "en", label: "English" },
  { value: "eo", label: "Esperanto" },
  { value: "es", label: "Español" },
  { value: "eu", label: "Euskara" },
  { value: "fr", label: "Français" },
  { value: "gl", label: "Galego" },
  { value: "hi", label: "हिन्दी" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "la", label: "Latin" },
  { value: "ms", label: "Bahasa Melayu" },
  { value: "pa", label: "ਪੰਜਾਬੀ" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
  { value: "ta", label: "தமிழ்" },
  { value: "te", label: "తెలుగు" },
  { value: "th", label: "ภาษาไทย" },
  { value: "tr", label: "Türkçe" },
  { value: "ur", label: "اردو" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "zh", label: "简体中文" },
];
