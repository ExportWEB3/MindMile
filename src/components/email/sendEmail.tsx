import type {
  customInputOnchangeDataAttributes,
  sendEmailTextEditorAttributes,
} from "../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { InputUIComponent } from "../../utilities/UI/input.ui";
import { NonBTNModalUIComponent } from "../../utilities/UI/modal.ui";
import { TiptapEditor } from "../TextEditor/texteditor";

export function SendEmailModalComponent(props: sendEmailTextEditorAttributes) {
  const {
    textValue,
    setTextValue,
    editable,
    editorToolType,
    className,
    headClassName,
    tools,
    modalState,
    closeModal,
    customFunction,
    onChange,
    subject,
  } = props;

  const handleCloseModal = () => {
    if (!closeModal) return;
    closeModal();
  };

  const handleSend = () => {
    if (!customFunction) return;
    customFunction();
  };

  const handleOnChange = (onChangeData: customInputOnchangeDataAttributes) => {
    if (!onChange) return;
    onChange(onChangeData);
  };

  return (
    <NonBTNModalUIComponent
      disableOutSideBoxClose={false}
      modalText="Send Email"
      modalState={modalState}
      closeModalCustomFunc={handleCloseModal}
      className="!h-[550px]"
    >
      <div className="w-full flex flex-col">
        <InputUIComponent
          name="subject"
          type="text"
          value={subject || ""}
          onChange={(data: customInputOnchangeDataAttributes) =>
            handleOnChange(data)
          }
        />
      </div>

      <div className="!mt-6">
        <TiptapEditor
          editable={editable}
          editorToolType={editorToolType}
          setTextValue={setTextValue}
          textValue={textValue}
          className={className}
          headClassName={headClassName}
          tools={tools}
        />
      </div>
      <div className="flex justify-center items-center !mt-6">
        <ButtonUIComponent
          onClick={handleSend}
          text="Send"
          className="!h-10 w-32"
        />
      </div>
    </NonBTNModalUIComponent>
  );
}
