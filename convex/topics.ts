import { query } from "./_generated/server";

/**
 * Retrieves a list of all topics.
 * @returns {Promise<Array>} An array of all topics.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("topics").collect();
  },
});
