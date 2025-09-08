import { Dropdown } from "rizzui/dropdown";

import type {
  DropDownComponentProps,
  OptionObject,
} from "../types.declarationts";
import { IconUIComponent } from "./icon.ui";

export function DropDownComponent({
  options,
  value,
  name,
  onChange,
  placeholder = "Select an option",
  labelRenderer,
  disabled = false,
}: DropDownComponentProps) {
  const normalizedOptions: OptionObject[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedLabel = value
    ? typeof value === "string"
      ? value
      : value.label
    : null;

  return (
    <Dropdown className="w-full">
      <Dropdown.Trigger
        disabled={disabled}
        className="border border-dark-light rounded !px-3 !py-1 outline-none w-full text-left bg-white shadow-sm hover:bg-gray-50 flex items-center justify-between"
      >
        {selectedLabel || placeholder}
        <IconUIComponent
          icon="ri-arrow-drop-down-line"
          className={`cursor-pointer !text-shadow-dark-light ${
            disabled && "hidden"
          }`}
        />
      </Dropdown.Trigger>

      <Dropdown.Menu
        className={` border z-[10] no-scrollbar overflow-scroll outline-none bg-gray-50 shadow-md border-dark-very-light-43  !py-2 min-w-[150px] w-auto max-w-max `}
      >
        {normalizedOptions?.map((opt) => (
          <Dropdown.Item
            key={opt.value}
            className="!mt-2 cursor-pointer !px-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-150 rounded"
            onClick={() =>
              onChange({
                value: opt.value,
                payload: opt,
                name,
              })
            }
          >
            {labelRenderer ? labelRenderer(opt) : opt.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
