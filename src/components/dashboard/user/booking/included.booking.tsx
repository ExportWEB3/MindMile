import type { IncludedNonIncludedAttributes } from "../../../../utilities/types.declarationts";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function InncludedNonIncluded(props: {
  data: IncludedNonIncludedAttributes[];
  icon?: string;
  title: string;
  iconClassName?: string;
}) {
  const { data, icon, title, iconClassName } = props;

  return (
    <section>
      {/* included section */}

      <section className="w-full flex flex-col ">
        <div className={`w-full flex flex-col  justify-between`}>
          {Array.isArray(data) && (data?.length as number) > Number(0) && (
            <div className="w-full !pb-5 bg-white">
              <span className="  font-bold">
                <TitleUIComponent type="h5" className="!p-5" text={title} />
              </span>

              <div className={`w-full flex flex-col !mt-3 !px-2 lg:!px-5`}>
                {data?.map((includeItem, includedIndex) => (
                  <div
                    className="w-full flex flex-col !py-2  border-b border-dark-light-38 lg:flex-row !mt-1"
                    key={includedIndex}
                  >
                    <div className="flex w-full items-center">
                      <IconUIComponent
                        icon={icon || ""}
                        className={`text-primary text-xl ${iconClassName}`}
                      />

                      <TitleUIComponent
                        type="h6"
                        text={includeItem?.title}
                        className="!ml-2  font-medium"
                      />
                    </div>

                    <div className="flex  w-full !mt-2 !pb-2 lg:!mt-0 ">
                      <TextUIComponent
                        type="p"
                        text={includeItem?.description}
                        className={`!text-[15px]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
