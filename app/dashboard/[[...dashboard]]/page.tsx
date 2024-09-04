import { convexClient } from "@/app/utils/convex";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

import LibraryStatus from "@/app/components/atoms/LibraryStatus";
import LatestReadTopic from "@/app/components/atoms/LatestReadTopic";
import SuggestSections from "@/app/components/organisms/SuggestSections";

interface DashboardProps {}

/**
 * Dashboard component that displays user-specific content
 * @param {DashboardProps} props - Component props (currently empty)
 * @returns {Promise<JSX.Element>} The rendered Dashboard component
 */
export default async function Dashboard({}: DashboardProps): Promise<JSX.Element> {
  const client = convexClient();
  const loggedUser = await currentUser();
  let userData = null;

  if (loggedUser) {
    userData = await client.query(api.userData.getOne, {
      id: loggedUser.id,
    });
  }

  const defaultLastRead = {
    title: "Programming",
    sectionName: "Learn Javascript",
  };

  return (
    <div className="flex flex-col gap-12 w-full min-h-[calc(100vh-8rem)] rounded-2xl bg-pine-cone-50 md:min-h-[calc(100vh-2rem)]">
      <section
        id="user"
        className="flex flex-col justify-start items-center gap-12 w-full py-8 px-4"
      >
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
          <LibraryStatus numElementsRead={userData?.library?.length || 0} />
          <LatestReadTopic
            suggestSectionsData={userData?.lastRead || defaultLastRead}
          />
          <div className="divider m-0 h-0"></div>
          <SuggestSections
            sectionName={userData?.lastRead?.sectionName || ""}
          />
        </SignedIn>
        <SignedOut>
          <SignIn
            appearance={{
              elements: {
                cardBox: {},
                footer: {
                  display: "none",
                },
              },
            }}
          />
        </SignedOut>
      </section>
    </div>
  );
}
