import { ButtonUIComponent } from "./button.ui";

import type { PaginationProps } from "../types.declarationts";

export function PaginationUIComponent({
  pageNumber,
  setPageNumber,
  totalPages,
  className = "",
}: PaginationProps) {
  if (!totalPages || totalPages < 2) {
    return null;
  }
  const goNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goPrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div
      className={`flex items-center  !mt-5 border-t border-dark-light-38  gap-5 w-full space-x-4  ${className}`}
    >
      <div className="w-full !mt-10 justify-center md:justify-end flex items-center gap-5">
        <ButtonUIComponent
          onClick={goPrev}
          text="Previous"
          isDisable={pageNumber === 1}
          className="w-20 rounded-[10px] h-10"
          isBorder={Number(pageNumber) === Number(1) ? true : false}
        />

        <div className=" ">
          <ButtonUIComponent
            text={` ${pageNumber} of ${totalPages || 1}`}
            isBorder={true}
            className="w-24  h-10"
          />
        </div>

        <ButtonUIComponent
          onClick={goNext}
          text="Next"
          isDisable={pageNumber === totalPages}
          className={`${
            pageNumber === totalPages && "pointer-events-none"
          } w-24 rounded-[10px] h-10  `}
        />
      </div>
    </div>
  );
}
