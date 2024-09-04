import { KeywordsData } from "@/types/components/main";

interface KeywordsListProps {
  keywordsData: KeywordsData;
}

/**
 * KeywordsList component displays a list of keywords with modal descriptions
 * @param {KeywordsListProps} props - The component props
 * @returns {JSX.Element[]} An array of keyword elements
 */
const KeywordsList: React.FC<KeywordsListProps> = ({
  keywordsData,
}: KeywordsListProps): JSX.Element[] => {
  const { keywords } = keywordsData;

  /**
   * Handles the click event on a keyword
   * @param {number} index - The index of the clicked keyword
   */
  const onHandleClick = (index: number) => {
    const modal = document.getElementById(
      `modal_${index}`
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return keywords?.map(({ title, description }, index) => (
    <div
      className="flex justify-center items-center gap-2 mr-3 p-3 bg-pine-cone-800 text-white text-sm shadow-lg
      rounded-lg select-none cursor-crosshair"
      key={index}
      style={{
        animation: `loop 1.4s linear 0s infinite alternate`,
        animationDelay: `${Math.random() * 2}s`,
      }}
      onClick={() => onHandleClick(index)}
    >
      <span className="text-pine-cone-500 text-xl">#</span>
      <p>{title}</p>
      <dialog id={`modal_${index}`} className="modal text-pine-cone-700">
        <div className="modal-box">
          <h3 className="font-bold text-xl">{title.toUpperCase()}</h3>
          <p className="py-4 text-lg">{description}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  ));
};

export default KeywordsList;
