"use client";
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

interface AddToLibraryButtonProps {
  title: string;
  sectionName: string;
}

/**
 * AddToLibraryButton component allows users to add items to their library
 * @param {AddToLibraryButtonProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const AddToLibraryButton: React.FC<AddToLibraryButtonProps> = ({
  title,
  sectionName,
}) => {
  const user = useUser();
  const router = useRouter();
  const mutateUserDataLibrary = useMutation(api.userData.addToLibrary);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [addedToLibrary, setAddedToLibrary] = useState<boolean>(false);

  const onHandleAddToLibrary = () => {
    if (!user?.user?.id) return; // Early return if user is not authenticated

    mutateUserDataLibrary({
      lastRead: { title, sectionName },
      library: [{ title, sectionName }],
      id: user.user.id,
    });
    setShowButton(false);
    setAddedToLibrary(true);

    setTimeout(() => {
      setAddedToLibrary(false);
      router.push("/start/library");
    }, 2000);
  };

  return (
    <>
      {user?.user?.id && showButton && !addedToLibrary && (
        <button
          className="flex flex-col justify-center items-center gap-1 right-4 top-4"
          onClick={onHandleAddToLibrary}
          aria-label="Add to Library"
        >
          <Image src="/icons/add.svg" alt="Add icon" width={32} height={32} />
          <p className="text-xs">Add to Library</p>
        </button>
      )}
      {addedToLibrary && (
        <div className="toast toast-top" role="alert">
          <div className="alert alert-success bg-pine-cone-400 text-white text-sm">
            <span>Added!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToLibraryButton;
