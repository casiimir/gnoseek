import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Retrieves user data for a specific user.
 * @param {Object} args - The arguments for the query.
 * @param {string} args.id - The user's token identifier.
 * @returns {Promise<Object|undefined>} The user data or undefined if not found.
 */
export const getOne = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the user with the given token identifier
    const getUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.id))
      .unique();

    // Check if user exists - logged in and has a token.
    if (!getUser) {
      return;
    }

    // Retrieve and return the user data
    return await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("user"), getUser?._id))
      .unique();
  },
});

/**
 * Retrieves a list of all user data.
 * @returns {Promise<Array>} An array of all user data.
 */
export const getList = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("userData").collect();
  },
});

/**
 * Adds an item to the user's library and updates the last read item.
 * @param {Object} args - The arguments for the mutation.
 * @param {Object} args.lastRead - The last read item.
 * @param {string} args.lastRead.title - The title of the last read item.
 * @param {string} args.lastRead.sectionName - The section name of the last read item.
 * @param {Array} args.library - The items to add to the library.
 * @param {string} args.id - The user's token identifier.
 */
export const addToLibrary = mutation({
  args: {
    lastRead: v.object({ title: v.string(), sectionName: v.string() }),
    library: v.array(v.object({ title: v.string(), sectionName: v.string() })),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the user with the given token identifier
    const getUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.id))
      .unique();

    if (!getUser) {
      throw new Error("User not found with the given tokenIdentifier");
    }

    // Get User Data
    const userData = await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("user"), getUser._id))
      .unique();

    if (userData) {
      // If data already exists, update it
      await ctx.db.patch(userData._id, {
        lastRead: args.lastRead,
        library: [...userData.library, ...args.library], // Add new books while keeping the old ones
      });
    } else {
      // If data doesn't exist, create a new one
      await ctx.db.insert("userData", {
        lastRead: args.lastRead,
        library: args.library,
        user: getUser._id,
      });
    }
  },
});

/**
 * Updates the last read item for a user.
 * @param {Object} args - The arguments for the mutation.
 * @param {Object} args.lastRead - The last read item.
 * @param {string} args.lastRead.title - The title of the last read item.
 * @param {string} args.lastRead.sectionName - The section name of the last read item.
 * @param {string} args.id - The user's token identifier.
 */
export const addToLastRead = mutation({
  args: {
    lastRead: v.object({ title: v.string(), sectionName: v.string() }),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the user with the given token identifier
    const getUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.id))
      .unique();

    if (!getUser) {
      throw new Error("User not found with the given tokenIdentifier");
    }

    // Get User Data
    const userData = await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("user"), getUser._id))
      .unique();

    if (userData) {
      // If data already exists, update just the lastRead field
      await ctx.db.patch(userData._id, {
        lastRead: args.lastRead,
      });
    } else {
      // If data doesn't exist, create a new one with lastRead
      await ctx.db.insert("userData", {
        lastRead: args.lastRead,
        library: [], // Initialize with an empty library if necessary
        user: getUser._id,
      });
    }
  },
});
