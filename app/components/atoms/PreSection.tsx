import ComponentLoader from "@/app/components/molecules/ComponentLoader";

/**
 * Props for the PreSection component
 * @interface PreSectionProps
 * @property {string} name - The name of the section
 * @property {boolean} isLoading - Indicates if the section is in a loading state
 * @property {() => void} onHandleClick - Callback function for button click event
 */
interface PreSectionProps {
  name: string;
  isLoading: boolean;
  onHandleClick: () => void;
}

/**
 * PreSection component displays either a loading state or a button to seek a section
 * @param {PreSectionProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const PreSection: React.FC<PreSectionProps> = ({
  name,
  isLoading,
  onHandleClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full h-64 bg-pine-cone-100 rounded-xl">
      {isLoading ? (
        <ComponentLoader name={name} />
      ) : (
        <button
          className="btn border-0 w-40 bg-asparagus-400 text-white font-bold"
          onClick={onHandleClick}
          disabled={isLoading}
        >
          Seek {name}
        </button>
      )}
    </div>
  );
};

export default PreSection;
