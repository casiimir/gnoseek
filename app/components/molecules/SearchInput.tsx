"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/app/utils";

/**
 * SearchInput component for handling search functionality
 * @returns {JSX.Element} The SearchInput component
 */
const SearchInput = (): JSX.Element => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  /**
   * Handles changes in the search input
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearch(e.target.value);

  /**
   * Handles form submission
   * @param {FormEvent<HTMLFormElement>} e - The form event
   */
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/start/search/${slugify(search)}`);
    setSearch("");
  };

  return (
    <form onSubmit={onHandleSubmit} className="w-full">
      <label className="relative input input-bordered flex items-center gap-2 p-6 shadow-gray-300 shadow-sm border border-gray-300">
        <input
          className="grow pl-6 p-8"
          value={search}
          onChange={onHandleChange}
          type="text"
          placeholder="Search..."
          minLength={3}
          required
          aria-label="Search input"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="absolute left-4 h-6 w-6 opacity-70"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <button
          type="submit"
          value="Seek"
          className="btn absolute right-0 w-24 bg-asparagus-400 text-pine-cone-50 rounded-none rounded-se-lg rounded-ee-lg hover:border-white"
        >
          Search
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
