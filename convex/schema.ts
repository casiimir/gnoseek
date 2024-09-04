import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

/**
 * Defines the schema for the application's database tables.
 * @returns {Object} The schema definition including auth tables and custom tables.
 */
export default defineSchema({
  ...authTables,
  // Table for storing topics and their translations
  topics: defineTable({
    text: v.string(), // Original text of the topic
    translations: v.object({
      ar: v.string(), // Arabic translation
      bn: v.string(), // Bengali translation
      ca: v.string(), // Catalan translation
      cy: v.string(), // Welsh translation
      de: v.string(), // German translation
      en: v.string(), // English translation
      eo: v.string(), // Esperanto translation
      es: v.string(), // Spanish translation
      eu: v.string(), // Basque translation
      fr: v.string(), // French translation
      gl: v.string(), // Galician translation
      hi: v.string(), // Hindi translation
      id: v.string(), // Indonesian translation
      it: v.string(), // Italian translation
      ja: v.string(), // Japanese translation
      ko: v.string(), // Korean translation
      la: v.string(), // Latin translation
      ms: v.string(), // Malay translation
      pa: v.string(), // Punjabi translation
      pt: v.string(), // Portuguese translation
      ru: v.string(), // Russian translation
      ta: v.string(), // Tamil translation
      te: v.string(), // Telugu translation
      th: v.string(), // Thai translation
      tr: v.string(), // Turkish translation
      ur: v.string(), // Urdu translation
      vi: v.string(), // Vietnamese translation
      zh: v.string(), // Chinese translation
    }),
  }).index("by_text", ["text"]), // Index for efficient querying by text

  // Table for storing user information
  users: defineTable({
    firstName: v.string(), // User's first name
    secondName: v.string(), // User's second name
    imgUrl: v.string(), // URL of user's profile image
    tokenIdentifier: v.string(), // Unique token identifier for the user
  }).index("by_token", ["tokenIdentifier"]), // Index for efficient querying by token

  // Table for storing user-specific data
  userData: defineTable({
    library: v.array(
      v.object({
        title: v.string(), // Title of the item in the library
        sectionName: v.string(), // Section name of the item
      })
    ),
    lastRead: v.object({
      title: v.string(), // Title of the last read item
      sectionName: v.string(), // Section name of the last read item
    }),
    user: v.id("users"), // Reference to the user in the users table
  }),
});
