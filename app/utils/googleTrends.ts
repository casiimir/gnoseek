import googleTrends from "google-trends-api";

/**
 * Represents a trending story with a title and timestamp.
 */
export interface TrendData {
  title: string;
  time: string;
}

/**
 * Fetches real-time Google Trends data for a specific category.
 *
 * @param {string} category - The category to fetch trends for.
 * @returns {Promise<TrendData[]>} A promise that resolves to an array of TrendData objects.
 */
export async function fetchGoogleTrends(
  category: string
): Promise<TrendData[]> {
  // Fetch real-time trends from Google Trends API
  const getGoogleTrends = await googleTrends.realTimeTrends(
    {
      geo: "US",
      hl: "en-US",
      category: category,
    },
    (err: string, results: string) =>
      err && typeof err === "string" ? console.log(err) : JSON.parse(results)
  );

  // Extract relevant data from the API response
  let selectedTrends = getGoogleTrends.storySummaries.trendingStories.map(
    (story: { title: string; articles: { time: string }[] }) => ({
      title: story.title,
      time: story.articles[0].time,
    })
  );

  // Limit the number of trends to 8 if more than 6 are returned
  if (selectedTrends.length > 6) {
    selectedTrends = selectedTrends.splice(0, 8);
  }

  return selectedTrends;
}
