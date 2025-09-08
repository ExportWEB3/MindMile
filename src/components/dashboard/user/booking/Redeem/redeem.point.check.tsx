import { useState } from "react";
import type {
  customInputOnchangeDataAttributes,
  OrderLineItem,
} from "../../../../../utilities/types.declarationts";
import { InputUIComponent } from "../../../../../utilities/UI/input.ui";

import { ButtonUIComponent } from "../../../../../utilities/UI/button.ui";
import { validateNumericString } from "../../../../../utilities/helper.function";
import { useNotificationHook } from "../../../../../hooks/custom.hook";
import { TitleUIComponent } from "../../../../../utilities/UI/texts.ui";

export function RedeemPointCheckOut(props: {
  items: OrderLineItem[];
  userTotalPoints: string;
  onConfirm: (committedPoints: string) => void;
}) {
  const { items, userTotalPoints, onConfirm } = props;
  const { notify } = useNotificationHook();

  const totalRequired = items.reduce((sum, it) => {
    const basePrice = Number(it.unitPrice || 0) * Number(it.quantity || 0);

    // Add installment fee if applicable
    const installment = it.isInstallmentFee
      ? Number(it?.installmentFeePrice || 0)
      : 0;

    return sum + basePrice + installment;
  }, 0);

  const [committedPoints, setCommittedPoints] = useState("");

  const handleInput = (data: customInputOnchangeDataAttributes) => {
    const { value } = data;

    if (value) {
      const validate = validateNumericString(String(value), {
        allowDecimal: false,
      });

      if (validate !== true) {
        return notify({
          notificationText:
            "Only valid numeric values are allowed as point value",
          notificationState: true,
        });
      }
    }

    setCommittedPoints(data?.value as string);
  };

  const handleConfirmation = () => {
    if (!onConfirm) return;
    onConfirm(committedPoints);
  };

  return (
    <div className="flex flex-col gap-6 !px-3 lg:!px-6 !py-4">
      {/* User Balance */}
      <div className="bg-primary-23 text-primary font-semibold text-center !py-3 rounded-lg">
        You have {userTotalPoints.toLocaleString()} pts available
      </div>
      <TitleUIComponent
        type="h6"
        text="Our smart point system automatically manages your points, ensuring those closest to expiration are used first."
        className="text-center"
      />
      {/* Selected Items List */}
      <div className="border border-dark-light-38 rounded-lg !p-4 h-72  overflow-y-auto ">
        {items?.map((it, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-sm !mb-2"
          >
            <span className="text-gray-700">
              {it.itemName} x{it.quantity}
            </span>
            <span className="font-medium">
              {(Number(it.unitPrice) * Number(it.quantity)).toLocaleString()}{" "}
              pts
            </span>
          </div>
        ))}

        <div className="border-t border-dark-light-38 !pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>{totalRequired.toLocaleString()} pts</span>
        </div>
      </div>

      {/* Point Input */}
      <div>
        <label className="block text-sm font-medium !mb-2">
          Enter Points to Commit
        </label>
        <InputUIComponent
          type="text"
          name="point"
          placeholder="Enter points..."
          value={committedPoints}
          onChange={(data: customInputOnchangeDataAttributes) =>
            handleInput(data)
          }
        />
      </div>

      {/* Confirm Button */}
      <ButtonUIComponent
        text="Confirm Checkout"
        className="bg-primary text-white py-2 rounded-lg"
        onClick={handleConfirmation}
      />
    </div>
  );
}
