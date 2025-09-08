import type { customInputOnchangeDataAttributes } from "../types.declarationts";
import { TextUIComponent } from "./texts.ui";

export function ToggleUIComponent(props: {
  isToggleState: boolean;
  onClick: (data: customInputOnchangeDataAttributes) => void;
  data?: unknown;
  disabled?: boolean;
}) {
  const { isToggleState, onClick, data, disabled = false } = props;

  const handleToggleFunc = (params: { isSelection: boolean }) => {
    const { isSelection } = params;
    if (!onClick || disabled) return;

    const dataResult: customInputOnchangeDataAttributes = {
      value: isSelection,
      name: "",
      payload: data,
    };
    onClick(dataResult);
  };

  return (
    <div className="flex w-full">
      <div className={`w-full flex mt-2`}>
        <div
          className={`${
            isToggleState
              ? "bg-primary h-8 flex items-center justify-center "
              : "cursor-pointer bg-gray-300  h-8 flex items-center justify-center "
          } w-16 rounded-l-md border border-dark-light`}
          onClick={() => handleToggleFunc({ isSelection: true })}
        >
          <TextUIComponent
            type="p"
            text="Yes"
            className={`${
              isToggleState ? " !text-white" : " text-white"
            }  !text-base`}
          />
        </div>

        <div
          className={`${
            !isToggleState
              ? " bg-primary  h-8 flex items-center justify-center  "
              : "cursor-pointer bg-gray-300 h-8 flex items-center justify-center "
          } w-16 rounded-r-md border border-dark-light-38 `}
          onClick={() => handleToggleFunc({ isSelection: false })}
        >
          <TextUIComponent
            type="p"
            text="No"
            className={` ${!isToggleState ? "!text-white" : ""} !text-base`}
          />
        </div>
      </div>
    </div>
  );
}
