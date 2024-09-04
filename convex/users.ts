import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Mutation to store or retrieve user information
 * @param {Object} args - The arguments for the mutation
 * @param {string} args.userId - The unique identifier for the user
 * @param {string} args.firstName - The first name of the user
 * @param {string} args.secondName - The second name of the user
 * @param {string} args.imgUrl - The URL of the user's profile image
 * @returns {Promise<string|undefined>} The ID of the user or undefined if not found
 */
export const store = mutation({
  // Define the expected arguments for the mutation
  args: {
    userId: v.string(),
    firstName: v.string(),
    secondName: v.string(),
    imgUrl: v.string(),
  },
  // Handler function for the mutation
  handler: async (ctx, args) => {
    // Check if user exists - logged in.
    if (!args.userId) return;

    // Query the database to find a user with matching tokenIdentifier
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.userId))
      .unique();

    // If user exists, return their ID
    if (user !== null) {
      return user._id;
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      firstName: args.firstName,
      secondName: args.secondName,
      imgUrl: args.imgUrl,
      tokenIdentifier: args.userId,
    });
  },
});
