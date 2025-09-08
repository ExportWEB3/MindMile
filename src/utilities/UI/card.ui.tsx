import { Box } from "rizzui/box";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";
import { formatToTitleCase } from "../helper.function";
import { IconUIComponent } from "./icon.ui";

export function CardUIComponent(props: {
  className?: string;
  title?: string;
  value?: string;
  titleClassName?: string;
  valueClassName?: string;
  icon?: string;
  data?: Record<string, string | number>; // optional object
}) {
  const {
    className,
    title,
    value,
    titleClassName,
    valueClassName,
    data,
    icon,
  } = props;

  // If data is passed, pick the first entry
  let displayTitle = title;
  let displayValue = value;

  if (data) {
    const [key, val] = Object.entries(data)[0] || [];
    displayTitle = formatToTitleCase(key);
    displayValue = String(val ?? "");
  }

  return (
    <Box
      className={`!p-4 flex flex-col justify-center items-center rounded-[10px] min-h-[125px] bg-white border border-dark-light-38 shadow-md ${className}`}
    >
      <IconUIComponent
        icon={icon as string}
        className={`${!icon && "hidden"}`}
      />
      <TextUIComponent
        type="p"
        text={displayTitle as string}
        className={`text-base ${titleClassName}`}
      />

      <TitleUIComponent
        type="h3"
        text={displayValue as string}
        className={`!mt-2 ${valueClassName}`}
      />
    </Box>
  );
}
