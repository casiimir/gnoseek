import Github from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";

/**
 * Authentication configuration using Convex Auth.
 * @typedef {Object} AuthConfig
 * @property {Function} auth - The main authentication function.
 * @property {Function} signIn - Function to handle sign-in process.
 * @property {Function} signOut - Function to handle sign-out process.
 * @property {Function} store - Function to store authentication data.
 */

/**
 * Configures and exports authentication functions using Convex Auth.
 * @type {AuthConfig}
 */
export const { auth, signIn, signOut, store } = convexAuth({
  // Configure authentication providers
  providers: [Github],
  callbacks: {
    /**
     * Callback function to handle redirection after authentication.
     * @param {Object} params - The parameters for the redirect callback.
     * @param {string} params.redirectTo - The URL to redirect to.
     * @returns {Promise<string>} The validated URL to redirect to.
     */
    async redirect({ redirectTo }) {
      // Check that `redirectTo` is valid
      // and return the relative or absolute URL
      // to redirect to.
      return redirectTo;
    },
  },
});
