import type { nonBTNModalAttributes } from "../types.declarationts";
import { TitleUIComponent } from "./texts.ui";
import { ClosePopup } from "./close.btn.ui";
import { BackgroundBlur } from "./bg.ui";
import ReactDOM from "react-dom";
import { useEffect } from "react";

export function NonBTNModalUIComponent(props: nonBTNModalAttributes) {
  const {
    modalState,
    //setModalState,
    children,
    modalText,
    className,
    zIndex,
    disableOutSideBoxClose,
    closeModalCustomFunc,
    closeButtonClassName,
    headerDivClassName,
    hederTextClassName,
    isHideCloseBTN,
    containerClassName,
  } = props;

  const handleCloseModel = (params: { event?: "onClose" | "onClick" }) => {
    const { event } = params;

    if (!closeModalCustomFunc) return;
    if (event === "onClose") {
      if (!disableOutSideBoxClose) {
        return;
      }
    }
    closeModalCustomFunc();
  };
  return (
    <CustomModalWrapper
      isOpen={modalState}
      onClose={() => handleCloseModel({ event: "onClose" })}
      zIndex={zIndex}
      className="w-screen"
    >
      <div
        className={`w-screen  flex flex-col justify-center z-[6] items-center  `}
      >
        <div
          className={`w-11/12 sm:w-5/6 lg:w-8/12 2xl:w-5/12 !pb-10  flex   relative    bg-white rounded-md ${
            containerClassName ?? "!px-3"
          }  `}
        >
          <div
            className={`w-full h-screen rounded-md overflow-y-scroll no-scrollbar  ${
              className ?? "sm:!p-2  md:!p-6 !mt-3"
            }  `}
          >
            <div
              className={` flex items-center  relative justify-center  w-full ${
                headerDivClassName ?? "!mb-10"
              }`}
            >
              <div className="w-full flex justify-center">
                <TitleUIComponent
                  type="h3"
                  text={modalText}
                  className={` ${hederTextClassName} w-5/6 text-center`}
                />
              </div>
              <ClosePopup
                className={` ${closeButtonClassName} ${
                  isHideCloseBTN && "hidden"
                }  absolute right-0`}
                onClick={() => handleCloseModel({ event: "onClick" })}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </CustomModalWrapper>
  );
}

interface CustomModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  zIndex?: string;
  className?: string;
}

const CustomModalWrapper: React.FC<CustomModalWrapperProps> = ({
  isOpen,
  children,
  zIndex,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 flex justify-center items-start w-full z-[6] h-screen !pt-5 overflow-y-scroll overflow-x-hidden ${zIndex}`}
    >
      <div
        className={`relative w-full max-w-screen-md flex flex-col justify-center items-center !px-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <BackgroundBlur isBackground={isOpen} isVisible={isOpen} />
    </div>,
    document.body
  );
};

export default CustomModalWrapper;
