import {
  displayCurrency,
  displayNumber,
} from "../../../../utilities/helper.function";
import type { tripAddOnAttributes } from "../../../../utilities/types.declarationts";
import { ReadMoreComponent } from "../../../../utilities/UI/readmore.ui";
import { TitleUIComponent } from "../../../../utilities/UI/texts.ui";

type TripAddOnsSectionProps = {
  addOns?: tripAddOnAttributes[];
  title?: string;
};

export const TripAddOnsSection = ({
  addOns = [],
  title = "Available Add-Ons",
}: TripAddOnsSectionProps) => {
  if (!Array.isArray(addOns) || addOns.length === 0) return null;

  return (
    <section className="w-full flex flex-col bg-white !pb-20 !mt-5 ">
      <div className=" w-full flex flex-col !py-5">
        {/* Section Title */}
        <div className="w-full justify-center flex lg:mt-5">
          <span className="text-primary-headerTextColor font-bold">
            <TitleUIComponent type="h3" className=" !mt-5 !px-5" text={title} />
          </span>
        </div>

        {/* Add-Ons List */}
        <div className="w-full flex flex-col items-center mt-0 lg:!mt-16">
          <div className="w-full flex flex-col items-center">
            {addOns.map((addOnItem, addOnIndex) => (
              <div
                key={addOnIndex}
                className="w-full !mt-5 border border-dark-light-38 rounded-md flex-col bg-white !py-5 !px-2 lg:!px-7"
              >
                {/* Header Row */}
                <div className="w-full flex justify-between !py-1">
                  <div className="flex w-full sm:items-center justify-between">
                    <TitleUIComponent
                      type="h4"
                      text={addOnItem?.addOnName}
                      className="!mt-4"
                    />

                    <span className="flex flex-col text-right">
                      <TitleUIComponent
                        type="h4"
                        text={`${displayNumber(
                          Number(addOnItem?.addOnPrice || 0)
                        )} pts`}
                        className="!mt-4"
                      />

                      <TitleUIComponent
                        type="h6"
                        text={`(${displayCurrency(
                          Number(addOnItem?.addOnPrice || 0)
                        )})`}
                        className="!mt-2 "
                      />

                      {addOnItem?.addOnDepositPrice !== undefined && (
                        <span className="flex items-center">
                          <TitleUIComponent
                            type="h6"
                            text={`Deposit: ${displayCurrency(
                              Number(addOnItem?.addOnDepositPrice || 0)
                            )}`}
                            className="!mt-1 font-medium hidden"
                          />
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {addOnItem?.addOnDescription && (
                  <div className="w-full lg:w-3/4 screen:hidden">
                    <ReadMoreComponent
                      limit="100"
                      textDisplayer="richText"
                      text={addOnItem?.addOnDescription as string}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
