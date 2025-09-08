import { displayNumber } from "../../../../../utilities/helper.function";
import type {
  OrderLineItem,
  RedeemDraftState,
  tripAddOnAttributes,
} from "../../../../../utilities/types.declarationts";
import { DropDownComponent } from "../../../../../utilities/UI/dropdown.ui";
import { TitleUIComponent } from "../../../../../utilities/UI/texts.ui";

type AddOnSelectionProps = {
  tripAddOns: tripAddOnAttributes[];
  redeemDraft: RedeemDraftState;
  upsertItem: (
    item: OrderLineItem,
    quantity: string,
    itemType: "add_on"
  ) => void;
  qtyOptions: string[];
};

export function AddOnSelection({
  tripAddOns,
  redeemDraft,
  upsertItem,
  qtyOptions,
}: AddOnSelectionProps) {
  if (!Array.isArray(tripAddOns) || tripAddOns.length === 0) return null;

  return (
    <section className="!mt-10 !px-3 lg:!px-5 flex flex-col">
      <TitleUIComponent
        type="h4"
        text="Select Add-Ons"
        className="font-semibold !mb-4"
      />
      <div className="flex flex-col gap-4">
        {tripAddOns.map((addon) => {
          const unitPrice = Number(addon.addOnPrice ?? 0);
          const selectedQty =
            redeemDraft.items.find(
              (it) => it.itemType === "add_on" && it.itemId === addon?.addOnId
            )?.quantity ?? 0;

          return (
            <div
              key={addon.addOnId}
              className="flex flex-col w-full border border-dark-light-38 rounded-sm"
            >
              <div className="flex items-center justify-between !p-4 bg-white shadow-sm">
                <div className="flex flex-col">
                  <TitleUIComponent
                    type="h5"
                    text={addon.addOnName}
                    className="font-medium text-lg"
                  />
                  <span className="!bg-primary-23 !p-3 !mt-2 rounded-[15px] flex justify-center min-w-[180px] w-full">
                    <TitleUIComponent
                      type="h5"
                      text={`${displayNumber(unitPrice)} pts`}
                      className="text-gray-500"
                    />
                  </span>
                </div>

                <span>
                  <DropDownComponent
                    disabled={false}
                    value={selectedQty.toString()}
                    onChange={(data) =>
                      upsertItem(
                        {
                          itemId: addon.addOnId,
                          itemName: addon.addOnName,
                          unitPrice: String(unitPrice || 0),
                          itemType: "add_on",
                        },
                        String(data?.value || 0),
                        "add_on"
                      )
                    }
                    options={qtyOptions}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
