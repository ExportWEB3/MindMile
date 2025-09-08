import { useState } from "react";
import type { customInputOnchangeDataAttributes } from "../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import OptimizedImage from "../../utilities/UI/image.ui";
import { InputUIComponent } from "../../utilities/UI/input.ui";
import { NonBTNModalUIComponent } from "../../utilities/UI/modal.ui";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { TiptapEditor } from "../TextEditor/texteditor";
import { convertDate } from "../../utilities/helper.function";

export type contractPayloadAttributes = {
  contractTitle: string;
  contractBody: string;
  contractLogo?: string;
};

export function EsignatureComponent(prop: {
  signatureState: boolean;
  closeSignatureState: () => void;
  onSign: (value: boolean) => void;
  contractPayload: contractPayloadAttributes;
  signeeeName: string;
}) {
  const {
    signatureState,
    closeSignatureState,
    onSign,
    contractPayload,
    signeeeName,
  } = prop;
  const [accepted, setAccepted] = useState(false);

  const handleClose = () => {
    if (typeof closeSignatureState === "function") closeSignatureState();
  };

  const handleSign = () => {
    if (!accepted) return;
    if (typeof onSign === "function") {
      onSign(accepted);
    }
    handleClose();
  };

  return (
    <NonBTNModalUIComponent
      disableOutSideBoxClose={false}
      modalText="Contract"
      modalState={signatureState}
      closeModalCustomFunc={handleClose}
      isHideCloseBTN={true}
    >
      <div className="w-full flex flex-col gap-6 max-h-[75vh] overflow-y-auto !p-2">
        {/* Logo + Title */}
        {contractPayload?.contractLogo && (
          <div className="w-full flex justify-center">
            <div className="flex justify-center h-20 w-20 !mb-4">
              <OptimizedImage
                alt=""
                className={`h-16 object-contain`}
                imageData={contractPayload.contractLogo || ""}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        )}
        <TitleUIComponent
          text={contractPayload.contractTitle}
          type="h4"
          className=" text-center"
        />

        {/* Contract Body */}
        <div className="border border-dark-light-38 rounded-lg !p-4 bg-gray-50 whitespace-pre-line text-sm leading-relaxed">
          <TiptapEditor
            editable={false}
            editorToolType="no_heading"
            textValue={contractPayload.contractBody}
          />
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-white  !pt-4 flex flex-col !pb-10 gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <InputUIComponent
            name=""
            type="checkbox"
            isCheckedState={true}
            checked={accepted}
            onChange={(data: customInputOnchangeDataAttributes) =>
              setAccepted(data?.value as boolean)
            }
            className="border-none outline-none shadow-none"
          />
          <TextUIComponent
            type="p"
            text="I have read and agree to the terms of this contract."
            className="text-sm"
          />
        </label>

        <div className="w-full flex flex-col ">
          <span className="flex flex-col">
            <TitleUIComponent
              className="!mt-1 italic !pb-1 border-b w-[30%] border-dark-light-38 font-[cursive]"
              type="h4"
              text={`${signeeeName && accepted ? signeeeName : ""}`}
            />
            <TextUIComponent type="p" text={`Name`} className="!mt-2" />
          </span>

          <span className="flex flex-col !mt-2 !py-4">
            <TitleUIComponent
              className="!mt-1 italic !pb-1 border-b w-[30%] border-dark-light-38 font-[cursive]"
              type="h4"
              text={`${
                accepted
                  ? convertDate({ date: new Date(), isFortmat: true })
                  : ""
              } `}
            />
            <TextUIComponent type="p" text={`Date`} className="!mt-2" />
          </span>

          <span className="!mt-4">
            <ButtonUIComponent
              text=" Sign Contract"
              isDisable={!accepted}
              onClick={handleSign}
              className="w-full"
            />
          </span>
        </div>
      </div>
    </NonBTNModalUIComponent>
  );
}
