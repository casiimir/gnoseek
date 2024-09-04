"use client";

import { useQuery } from "convex/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import LibraryStatus from "@/app/components/atoms/LibraryStatus";
import LatestReadTopic from "@/app/components/atoms/LatestReadTopic";
import SuggestSections from "@/app/components/organisms/SuggestSections";

/**
 * DynamicUserSection component
 *
 * This component renders different content based on the user's authentication status.
 * It displays user-specific information when signed in and a login prompt when signed out.
 *
 * @param {Object} props - The component props
 * @param {string | undefined} props.userId - The ID of the current user, if authenticated
 * @returns {JSX.Element} The rendered component
 */
export default function DynamicUserSection({
  userId,
}: {
  userId: string | undefined;
}): JSX.Element {
  const userData = useQuery(
    api.userData.getOne,
    userId ? { id: userId } : "skip"
  );
  const { openSignIn } = useClerk();

  /**
   * Handles the sign-in process
   */
  const onHandleSignIn = (): void => {
    openSignIn();
  };

  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 50,
                height: 50,
              },
              userButtonPopoverFooter: {
                display: "none",
              },
            },
          }}
        />
        <LibraryStatus numElementsRead={userData?.library.length || 0} />
        <LatestReadTopic
          suggestSectionsData={
            userData?.lastRead || {
              title: "Programming",
              sectionName: "Learn Javascript",
            }
          }
        />
        <SuggestSections sectionName={userData?.lastRead.sectionName || ""} />
      </SignedIn>
      <SignedOut>
        <p className="text-pine-cone-400 text-sm">
          Sign in to unlock the full Gnoseek experience!
        </p>
        <button
          className="btn w-full bg-pine-cone-400 border-pine-cone-500 text-pine-cone-50 hover:bg-pine-cone-600 hover:border-pine-cone-700"
          onClick={onHandleSignIn}
        >
          Sign in
        </button>
      </SignedOut>
    </>
  );
}
