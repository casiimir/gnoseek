import { action } from "./_generated/server";
import { v } from "convex/values";
import { slugify } from "@/app/utils";

/**
 * Fetches book cover IDs from the Open Library API based on a list of book titles.
 *
 * @param {Object} args - The arguments for the action.
 * @param {string[]} args.booksListTitle - An array of book titles to search for.
 * @returns {Promise<string[]>} An array of cover IDs or empty strings if no cover is found.
 */
export const fetchSummary = action({
  args: {
    booksListTitle: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Slugify each book title for use in the API URL
    const slugifiedBooksListTitle = args?.booksListTitle?.map((title) =>
      slugify(title)
    );

    // Fetch book data for each slugified title from the Open Library API
    const promises = await Promise.all(
      slugifiedBooksListTitle.map((title) =>
        fetch(`https://openlibrary.org/search.json?q=${title}&limit=1`)
      )
    );

    // Parse the JSON responses
    const booksListPromises = await Promise.all(promises?.map((p) => p.json()));

    // Extract the first book document from each response
    const booksListData = booksListPromises?.map((book) => book?.docs[0] || []);

    // Return an array of cover IDs, or empty strings if no cover is found
    return booksListData?.map((book) => (book.cover_i ? book.cover_i : ""));
  },
});
