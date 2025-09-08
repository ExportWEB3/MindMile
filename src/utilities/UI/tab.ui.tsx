import { Tab } from "rizzui/tabs";
import type { customInputOnchangeDataAttributes } from "../types.declarationts";
import { IconUIComponent } from "./icon.ui";

export interface TabUIProps<T extends Record<string, any>> {
  data: T[] | string[];
  onClick?: (payload: customInputOnchangeDataAttributes) => void;
  selectedIndex?: number;
  itemClassName?: string;
  listClassName?: string;
  iconPosition?: "left" | "right";

  keys?: {
    label?: keyof T | string;
    slug?: keyof T | string;
    icon?: keyof T | string;
  };
}

export function TabUIComponent<T extends Record<string, any>>({
  data,
  onClick,
  selectedIndex,
  itemClassName,
  listClassName,
  iconPosition = "left",
  keys,
}: TabUIProps<T>) {
  const labelKey = keys?.label ?? "label";
  const slugKey = keys?.slug ?? "slug";
  const iconKey = keys?.icon ?? "icon";

  const handleOnClick = (item: string, index: number, slug: string) => {
    if (!onClick) return;
    onClick({
      name: slug,
      value: item,
      payload: index,
    });
  };

  return (
    <Tab selectedIndex={selectedIndex}>
      <Tab.List
        className={`inline-flex flex-wrap gap-2 ${
          listClassName ?? ""
        } border-b !pb-2 border-dark-light-38`}
      >
        {data?.map((rawItem, index) => {
          const isObject = typeof rawItem === "object" && rawItem !== null;
          const label = isObject
            ? (rawItem as any)[labelKey] ?? ""
            : (rawItem as string);
          const slug = isObject
            ? (rawItem as any)[slugKey] ?? label
            : (rawItem as string);
          const icon = isObject ? (rawItem as any)[iconKey] : undefined;

          return (
            <Tab.ListItem
              key={index}
              className={`!px-4 !py-1 rounded-lg ${
                selectedIndex === index && "bg-primary-30 "
              }  z-[6] cursor-pointer transition-colors duration-150 hover:bg-muted focus-visible:outline-none flex items-center gap-2 ${
                itemClassName ?? ""
              }`}
              onClick={() => handleOnClick(label, index, slug)}
              as="button"
            >
              {icon && iconPosition === "left" && (
                <IconUIComponent icon={icon} className="w-4 h-4" />
              )}
              {label}
              {icon && iconPosition === "right" && (
                <IconUIComponent icon={icon} className="w-4 h-4" />
              )}
            </Tab.ListItem>
          );
        })}
      </Tab.List>
    </Tab>
  );
}
