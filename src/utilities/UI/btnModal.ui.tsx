import { TitleUIComponent } from "./texts.ui";
import { ButtonUIComponent } from "./button.ui";
import { useState } from "react";
import type { modalUiAttributes } from "../types.declarationts";
import { NonBTNModalUIComponent } from "./modal.ui";

export function ModalUIComponent(props: modalUiAttributes) {
  const [modalState, setModalState] = useState(false);
  const {
    btnText,
    children,

    modalTitletext,
    isBottonBorder,
    btnClassName,
  } = props;

  return (
    <>
      <ButtonUIComponent
        onClick={() => setModalState(true)}
        text={btnText ? btnText : "Open"}
        className={btnClassName}
        isBorder={isBottonBorder ? isBottonBorder : false}
      />
      <NonBTNModalUIComponent
        closeModalCustomFunc={() => setModalState(false)}
        disableOutSideBoxClose={false}
        modalText={modalTitletext as string}
        modalState={modalState}
      >
        <div className=" h-fullne">
          <div className="mb-7 flex items-center justify-between !p-3 overflow-y-scroll no-scrollbar">
            <TitleUIComponent
              type="h6"
              text={modalTitletext as string}
              className=""
            />
          </div>
          <div className="h-5/6 !pb-7 px-4 sm:!px-7">{children}</div>
        </div>
      </NonBTNModalUIComponent>
    </>
  );
}
