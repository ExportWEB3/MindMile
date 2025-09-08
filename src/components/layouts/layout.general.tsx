import type { LayoutComponentProps } from "../../utilities/types.declarationts";

export function LayoutComponent({
  children,
  className,
  parentDivClassName,
}: LayoutComponentProps) {
  return (
    <section
      className={`w-full  flex flex-col ${
        parentDivClassName ? parentDivClassName : "customContainerModified"
      } `}
    >
      <div className={`  ${className ?? "!mt-6 sm:!mt-10 lg:!mt-24"} `}>
        {children}
      </div>
    </section>
  );
}
