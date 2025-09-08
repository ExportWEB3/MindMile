import { displayNumber } from "../../../../../utilities/helper.function";
import type { OrderLineItem } from "../../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../../utilities/UI/button.ui";

type CheckoutSummaryProps = {
  items: OrderLineItem[];
  onRedeemClick: () => void;
  btnText: string;
};

export function CheckoutSummary({
  items,
  onRedeemClick,
  btnText = "Next",
}: CheckoutSummaryProps) {
  const totalPoints = items.reduce((sum, it) => {
    const basePrice = Number(it.unitPrice || 0) * Number(it.quantity || 0);

    // check for installment fee
    const installment = it.isInstallmentFee
      ? Number(it?.installmentFeePrice || 0)
      : 0;

    return sum + basePrice + installment;
  }, 0);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex flex-col !p-4 lg:!px-6 z-50">
      <div className="max-h-32 overflow-y-auto !mb-3">
        {items.map((it) => (
          <div
            key={it.itemId}
            className="flex !py-1 border-b border-dark-light-38 justify-between text-sm text-gray-700 mb-1"
          >
            <span>
              {it.itemName} x{it.quantity}
            </span>
            <span>
              {displayNumber(
                Number(it.unitPrice || 0) * Number(it.quantity || 0)
              )}{" "}
              pts
            </span>
          </div>
        ))}
      </div>

      <div className={`flex justify-between items-center `}>
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">Total</span>
          <span className="text-lg font-semibold text-primary">
            {displayNumber(totalPoints)} pts
          </span>
        </div>

        <ButtonUIComponent
          text={btnText}
          className="bg-primary text-white !px-6 !py-3 !mt-3 rounded-lg w-28"
          onClick={onRedeemClick}
        />
      </div>
    </div>
  );
}
