import { useState } from "react";
import type { ButtonAttributes } from "../types.declarationts";
import { Button } from "rizzui/button";
import { IconUIComponent } from "./icon.ui";

export function ButtonUIComponent(props: ButtonAttributes) {
  const {
    text,
    className,
    onClick,
    type,
    isDisable,
    isBorder,
    icon,
    iconClassName,
  } = props;
  const [buttonState, setButtonState] = useState<{ isHover: boolean }>({
    isHover: false,
  });

  const handleOnclick = () => {
    if (!onClick) return;

    onClick();
  };
  return (
    <>
      <Button
        onMouseEnter={() => setButtonState({ ...buttonState, isHover: true })}
        onMouseLeave={() => setButtonState({ ...buttonState, isHover: false })}
        disabled={isDisable}
        type={type ? type : "button"}
        onClick={handleOnclick}
        className={`${
          buttonState?.isHover ? " bg-secondary-red" : "bg-primary"
        } cursor-pointer text-white w-auto transition duration-300 ease-in-out rounded-[5px] text-sm h-14  !px-4 ${
          isBorder && "border border-primary !bg-white text-primary-dark"
        } w-44 flex items-center text-xs sm:text-sm ${className}`}
      >
        <span>{text}</span>
        <span className={`${!icon && "hidden"}`}>
          <IconUIComponent
            className={`${iconClassName} text-sm md:text-base`}
            icon={icon || ""}
          />
        </span>
      </Button>
    </>
  );
}
