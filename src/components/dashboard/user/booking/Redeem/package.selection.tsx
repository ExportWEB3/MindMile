import { displayNumber } from "../../../../../utilities/helper.function";
import type {
  OrderLineItem,
  RedeemDraftState,
  tripSubPackages,
} from "../../../../../utilities/types.declarationts";
import { DropDownComponent } from "../../../../../utilities/UI/dropdown.ui";
import { ReadMoreComponent } from "../../../../../utilities/UI/readmore.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../../utilities/UI/texts.ui";

type PackageSelectionProps = {
  tripPackages: tripSubPackages[];
  redeemDraft: RedeemDraftState;
  upsertItem: (
    item: OrderLineItem,
    quantity: string,
    itemType: "package"
  ) => void;

  qtyOptions: string[];
};

export function PackageSelection({
  tripPackages,
  redeemDraft,
  upsertItem,
  qtyOptions,
}: PackageSelectionProps) {
  if (!Array.isArray(tripPackages) || tripPackages.length === 0) return null;

  return (
    <>
      <section className="!px-3 lg:!px-5 flex flex-col !mt-7">
        <TitleUIComponent
          type="h4"
          text="Select Package"
          className="font-semibold !mb-4"
        />
        <div className="flex flex-col gap-4">
          {tripPackages.map((pkg) => {
            const unitPrice = Number(pkg?.packageFullPrice ?? 0);
            const selectedQty =
              redeemDraft?.items?.find(
                (it) => it.itemType === "package" && it.itemId === pkg.packageId
              )?.quantity ?? 0;

            const isSpecial = pkg?.isSpecialOffer && pkg?.specialOfferValues;
            const oldPrice = isSpecial
              ? Number(pkg?.specialOfferValues?.oldPrice ?? 0)
              : null;
            const discounted = isSpecial
              ? Number(pkg?.specialOfferValues?.discounted ?? 0)
              : unitPrice;

            return (
              <div
                key={pkg.packageId}
                className="flex flex-col w-full border border-dark-light-38 rounded-lg"
              >
                <div className="flex items-center justify-between !p-4 bg-white shadow-sm">
                  <div className="flex flex-col">
                    <TitleUIComponent
                      type="h5"
                      text={pkg.packageName}
                      className="font-medium text-lg"
                    />
                    <div className="flex items-center gap-2 !mt-2">
                      {isSpecial && oldPrice ? (
                        <div className="w-full flex items-center">
                          <TextUIComponent
                            type="del"
                            text={`${displayNumber(oldPrice)} pts`}
                            className="!text-lg text-gray-400"
                          />
                          <TitleUIComponent
                            type="h5"
                            text={`${displayNumber(discounted)} pts`}
                            className="!text-lg text-gray-400"
                          />
                        </div>
                      ) : (
                        <span className="!bg-primary-23 !p-3 !mt-2 rounded-[15px] flex justify-center min-w-[50px]">
                          <TitleUIComponent
                            type="h5"
                            text={`Total: ${displayNumber(unitPrice)} pts`}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  <span>
                    <DropDownComponent
                      disabled={false}
                      value={selectedQty.toString()}
                      onChange={(data) =>
                        upsertItem(
                          {
                            itemId: pkg.packageId,
                            itemName: pkg.packageName,
                            unitPrice: String(discounted),
                            itemType: "package",
                            packageId: String(pkg?.packageId || "")?.trim(),
                            installmentFeePrice: String(
                              pkg?.installmentFeePrice || "0"
                            ),
                            isInstallmentFee: pkg?.isInstallmentFee as boolean,
                          },
                          String(data?.value),
                          "package"
                        )
                      }
                      options={qtyOptions}
                    />
                  </span>
                </div>

                <div className="!mt-6 !p-4">
                  <ReadMoreComponent
                    limit="300"
                    text={pkg?.packageDescription as string}
                    textDisplayer="richText"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
