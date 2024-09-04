import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Retrieves the current language setting from cookies.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response containing the current language.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the language cookie
    const lang = cookies().get("lang");

    // Return the language value, defaulting to "en" if not set
    return NextResponse.json({ lang: lang?.value || "en" });
  } catch (error) {
    console.error("Error in GET /api/setLanguage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Sets a new language preference in cookies.
 * @param {Request} request - The incoming request object containing the new language.
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Extract the language from the request body
    const { lang } = await request.json();

    // Validate the language input
    if (typeof lang !== "string" || lang.length === 0) {
      return NextResponse.json(
        { error: "Invalid language input" },
        { status: 400 }
      );
    }

    // Set the language cookie
    cookies().set("lang", lang);

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/setLanguage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
